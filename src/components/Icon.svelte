<script lang="ts">
import { icons } from './icon-data'

const { icon, class: klass = '' }: { icon: string; class?: string } = $props()

const data = $derived(icons[icon])
</script>

{#if data}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 {data.w} {data.h}"
    width="1em"
    height="{data.h / data.w}em"
    class={klass}
    aria-hidden="true"
    role="img"
  >
    {@html data.body}
  </svg>
{/if}
