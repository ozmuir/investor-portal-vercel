<template>
  <div v-if="typeof lockRef !== 'undefined'" class="blurrer blocker">
    <Loader type="bounce" />
    <div v-if="typeof lockRef === 'string'" class="text-large">
      {{ lockRef }}
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "C_Blocker" });
import Loader from "../components/Loader.vue";
import { lockRef } from "../state/ui";
</script>

<style scoped lang="scss">
.blocker {
  position: fixed;
  z-index: 2003; // higher than naive-ui modal
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #ffffff;
}
</style>
