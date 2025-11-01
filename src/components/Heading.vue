<script setup>
defineOptions({ name: "CHeading", inheritAttrs: false });

defineProps({
  as: { type: String, default: "h1" },
});

import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    :class="[
      'heading',
      typeof as === 'string' ? as : '',
      ['h1', 'h2'].indexOf(as) !== -1 && 'text-line-1',
      ['h3', 'h4', 'h5', 'h6'].indexOf(as) !== -1 && 'text-line-lg',
    ]"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
.heading {
  margin: 0;
  font-weight: normal;
}
.h1 {
  font-size: 3rem;
}
.h2 {
  font-size: 2rem;
}
.h3 {
  font-size: 1.5rem;
}
.h4,
.h5,
.h6 {
  font-size: 1rem;
}
</style>
