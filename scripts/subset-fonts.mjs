/**
 * 字体子集化：只抽取博客源码中实际用到的字符，生成临时 woff2 子集字体，
 * 并输出带 unicode-range 的 @font-face（public/fonts/subset-fonts.css）。
 *
 * 每次构建（含 CI）与 pnpm dev 都会自动运行，子集始终与最新内容一致。
 * 用法：pnpm subset-fonts
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const fontsDir = path.join(root, 'src', 'assets', 'fonts')
const srcDir = path.join(root, 'src')
const outDir = path.join(root, 'public', 'fonts')

/** 兜底字符：基础 ASCII + 常见标点/CJK 符号，避免源文件里出现不了的字符缺失 */
const BASELINE_RANGES = [
  [0x0020, 0x007e], // 可打印 ASCII
  [0x00a0, 0x00ff], // Latin-1 补充（× ÷ · 等）
  [0x2013, 0x2026], // 破折号、引号、省略号
  [0x2190, 0x2193], // 箭头
  [0x3000, 0x303f], // CJK 标点
  [0xff00, 0xffef], // 全角字符
]

const SOURCE_EXTENSIONS = new Set([
  '.md',
  '.mdx',
  '.astro',
  '.svelte',
  '.ts',
  '.js',
  '.mjs',
  '.json',
])

const FONT_EXTENSIONS = ['.ttf', '.otf']

/** 字体元信息：文件名（不含扩展名）→ 家族名与字重 */
const FONT_META = [
  { file: 'LXGWWenKai-Regular', family: 'LXGW WenKai', weight: 400 },
  { file: 'LXGW975YuanSC-400W', family: 'LXGW 975 Yuan SC', weight: 400 },
  { file: 'WenJinMinchoP0-Regular', family: 'WenJin Mincho', weight: 400 },
]

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

function collectChars() {
  const chars = new Set()
  for (const [start, end] of BASELINE_RANGES) {
    for (let cp = start; cp <= end; cp++) chars.add(String.fromCodePoint(cp))
  }

  let fileCount = 0
  for (const file of walk(srcDir)) {
    if (!SOURCE_EXTENSIONS.has(path.extname(file).toLowerCase())) continue
    const text = fs.readFileSync(file, 'utf8')
    for (const ch of text) chars.add(ch)
    fileCount++
  }

  return { text: [...chars].join(''), fileCount, glyphCount: chars.size }
}

/* ---------- sfnt 表解析：读取 cmap 覆盖，用于生成 unicode-range ---------- */

function findTable(buffer, tag) {
  const numTables = buffer.readUInt16BE(4)
  for (let i = 0; i < numTables; i++) {
    const off = 12 + i * 16
    if (buffer.toString('ascii', off, off + 4) === tag) {
      return {
        offset: buffer.readUInt32BE(off + 8),
        length: buffer.readUInt32BE(off + 12),
      }
    }
  }
  return null
}

/** 返回字体 cmap 中包含的全部码点（支持 format 4 与 format 12） */
function readCmap(buffer) {
  const cmap = findTable(buffer, 'cmap')
  if (!cmap) return new Set()
  const base = cmap.offset
  const numSubtables = buffer.readUInt16BE(base + 2)
  const result = new Set()

  for (let i = 0; i < numSubtables; i++) {
    const rec = base + 4 + i * 8
    const subOffset = buffer.readUInt32BE(rec + 4)
    const st = base + subOffset
    if (st + 2 > buffer.length) continue
    const format = buffer.readUInt16BE(st)
    try {
      if (format === 4) {
        const segCountX2 = buffer.readUInt16BE(st + 6)
        const segCount = segCountX2 / 2
        const endCodes = st + 14
        const startCodes = endCodes + segCountX2 + 2
        const idDelta = startCodes + segCountX2
        const idRangeOffset = idDelta + segCountX2
        for (let s = 0; s < segCount; s++) {
          const end = buffer.readUInt16BE(endCodes + s * 2)
          const start = buffer.readUInt16BE(startCodes + s * 2)
          if (start > end) continue
          if (start === 0xffff && end === 0xffff) break
          for (let c = start; c <= end; c++) {
            const ro = idRangeOffset + s * 2
            const delta = buffer.readInt16BE(idDelta + s * 2)
            let gid
            if (buffer.readUInt16BE(ro) === 0) {
              gid = (c + delta) & 0xffff
            } else {
              const addr = ro + buffer.readUInt16BE(ro) + (c - start) * 2
              gid = buffer.readUInt16BE(addr)
              if (gid !== 0) gid = (gid + delta) & 0xffff
            }
            if (gid !== 0) result.add(c)
          }
        }
      } else if (format === 12) {
        const nGroups = buffer.readUInt32BE(st + 12)
        for (let g = 0; g < nGroups; g++) {
          const rec = st + 16 + g * 12
          const start = buffer.readUInt32BE(rec)
          const end = buffer.readUInt32BE(rec + 4)
          for (let c = start; c <= end; c++) result.add(c)
        }
      }
    } catch {
      // 忽略无法解析的子表
    }
  }
  return result
}

/** 把码点集合压缩为 CSS unicode-range 字符串 */
function toUnicodeRange(codepoints) {
  const sorted = [...codepoints].sort((a, b) => a - b)
  if (sorted.length === 0) return ''
  const ranges = []
  let start = sorted[0]
  let prev = sorted[0]
  for (let i = 1; i <= sorted.length; i++) {
    const cp = sorted[i]
    if (cp === prev + 1) {
      prev = cp
      continue
    }
    const hex = n => `U+${n.toString(16).toUpperCase()}`
    ranges.push(start === prev ? hex(start) : `${hex(start)}-${hex(prev)}`)
    start = prev = cp
  }
  return ranges.join(', ')
}

/* ------------------------------- 主流程 ------------------------------- */

const kb = n => `${(n / 1024).toFixed(1)} KB`

const { text: subsetText, fileCount, glyphCount } = collectChars()
console.log(
  `[subset-fonts] 扫描 ${fileCount} 个源文件，收集 ${glyphCount} 个字符`,
)

const fontFiles = walk(fontsDir).filter(f =>
  FONT_EXTENSIONS.includes(path.extname(f).toLowerCase()),
)

if (fontFiles.length === 0) {
  console.warn(`[subset-fonts] ${fontsDir} 中没有 .ttf/.otf 字体，跳过`)
  process.exit(0)
}

// 清空输出目录，避免删掉的源字体残留旧产物
fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

const cssBlocks = []

for (const file of fontFiles) {
  const baseName = path.basename(file, path.extname(file))
  const meta =
    FONT_META.find(m => m.file === baseName) || { family: baseName, weight: 400 }
  const buffer = fs.readFileSync(file)

  // 该字体覆盖到、且博客用到的码点
  const coverage = readCmap(buffer)
  const used = [...subsetText]
    .filter(ch => coverage.has(ch.codePointAt(0)))
    .map(ch => ch.codePointAt(0))

  if (used.length === 0) {
    console.log(`[subset-fonts] ${path.basename(file)}: 博客未用到其字形，跳过`)
    continue
  }

  const subset = await subsetFont(buffer, subsetText, {
    targetFormat: 'woff2',
    preserveNameIds: [1, 2, 4, 6], // 保留字体家族名，便于调试
  })
  const outName = `${baseName}.subset.woff2`
  fs.writeFileSync(path.join(outDir, outName), subset)
  console.log(
    `[subset-fonts] ${path.basename(file)}: ${kb(buffer.length)} -> ${outName} ${kb(
      subset.length,
    )}（${used.length} 字形）`,
  )

  cssBlocks.push(`@font-face {
  font-family: '${meta.family}';
  font-style: normal;
  font-weight: ${meta.weight};
  font-display: swap;
  unicode-range: ${toUnicodeRange(used)};
  src: url('/fonts/${outName}') format('woff2');
}`)
}

const css = `/* 由 scripts/subset-fonts.mjs 自动生成，勿手改 */
${cssBlocks.join('\n')}
`
fs.writeFileSync(path.join(outDir, 'subset-fonts.css'), css)
console.log(
  `[subset-fonts] 已生成 ${outDir}\\subset-fonts.css（${cssBlocks.length} 个 @font-face）`,
)
