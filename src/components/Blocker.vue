<script setup>
defineOptions({ name: "C_Blocker" });
import Loader from "../components/Loader.vue";
import { lockRef } from "../state/ui";
</script>

<template>
  <div
    v-if="typeof lockRef !== 'undefined'"
    class="-root blurrer flex-col gap-1"
  >
    <Loader type="bounce" />
    <div v-if="typeof lockRef === 'string'" class="text-size-lg-1">
      {{ lockRef }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.-root {
  position: fixed;
  z-index: 2003; // higher than naive-ui modal

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  color: #ffffff;
}
</style>
