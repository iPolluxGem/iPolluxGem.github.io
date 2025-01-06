---
title: 自用 Rime 配色方案
published: 2024-08-10
tags: ['输入法', '工具', Rime]
category: '瞎折腾'
draft: false
---

转到雾凇方案后自组自用的两个配色方案，正好一早一晚。

### **方案 1：晨光始/Morning Twilight**

```yaml
  morning_twilight:
    name: "晨光始／Morning Twilight"
    author: 半分星
    back_color: 0xE4EAEFF8
    shadow_color: 0x000000
    border_color: 0x435F66
    comment_text_color: 0x788786
    hilited_text_color: 0x026E6D
    hilited_back_color: 0x1A1A3D76
    hilited_shadow_color: 0x00F4F4FF
    hilited_mark_color: 0x00FFFFFF
    hilited_label_color: 0xFFFFFF
    hilited_candidate_text_color: 0xFFFFFF
    hilited_comment_text_color: 0x68D3ED
    candidate_back_color: 0xD5D1E2F8
    hilited_candidate_back_color: 0x5B3F1B
    hilited_candidate_border_color: 0x00000000
    hilited_candidate_shadow_color: 0x3F0A6091
    label_color: 0x000000
    shadow_color: 0x000000
    text_color: 0x000000
```

效果：![晨光始][1]

### **方案 2：江浸月/Moon River**

```yaml
moon_river:
    name: "江浸月／Moon River"
    author: 半分星
    back_color: 0xE62F0504
    shadow_color: 0x00000000
    border_color: 0x000000
    text_color: 0xA6F2FF
    hilited_text_color: 0x000000
    hilited_back_color: 0x8BFFFC
    hilited_shadow_color: 0x00000000
    hilited_mark_color: 0x1BECFF
    hilited_label_color: 0xFFFFFF
    hilited_candidate_text_color: 0xA6F2FF
    hilited_comment_text_color: 0xFFE3E0
    hilited_candidate_back_color: 0xA4BD908A
    hilited_candidate_border_color: 0x00000000
    hilited_candidate_shadow_color: 0x00000000
    label_color: 0xFFFFFF
    candidate_text_color: 0xFFFFFF
    comment_text_color: 0xFFFFFF
    candidate_back_color: 0x3F000000
    candidate_border_color: 0x00000000
    candidate_shadow_color: 0x00000000
    prevpage_color: 0x00000000
    nextpage_color: 0x00000000
```

效果：![江浸月][2]

可以用[这个](https://fxliang.github.io/RimeSeeMe/)工具来设计配色，然后直接导出方案，我是贴到了 weasel.yaml 底下（虽然正常是应该加到 weasel.custom.yaml 里的）：

横排候选和高亮选中是用的[其他作者的方案](https://blog.csdn.net/qq_43108090/article/details/122759647)，实际用起来效果还是不错的。

[1]: https://s2.loli.net/2024/09/21/k3pJ6UjNqmS8ZIW.png
[2]: https://s2.loli.net/2024/09/21/FSzfYXRJKvelDdT.png