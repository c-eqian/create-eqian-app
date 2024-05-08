<template>
  <i style="color: currentColor">
    <svg
      :height="height"
      :width="width"
      aria-hidden="true"
      class="svg-icon"
    >
      <use
        :xlink:href="symbolId"
      />
    </svg>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'CzSvg',
  inheritAttrs: true
});
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  width: {
    type: String,
    default: '1rem'
  },
  height: {
    type: String,
    default: '1rem'
  }
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style lang="scss" scoped>
.svg-icon {
  vertical-align: center;
  fill: currentColor;
  overflow: hidden;
}
</style>
