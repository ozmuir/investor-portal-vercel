<template>
  <NModal v-bind="$attrs" :on-mask-click="() => $emit('close')">
    <NCard closable @close="$emit('close')" class="-card width-60rem">
      <template v-for="(_, name) in $slots" #[name]="scope">
        <slot :name="name" v-bind="scope || {}"></slot>
      </template>
    </NCard>
  </NModal>
</template>

<style scoped lang="scss">
.-card {
  margin: 2rem auto;
}
</style>

<script setup>
defineOptions({ name: "CModalCard" });

import { NCard, NModal } from "naive-ui";
</script>
