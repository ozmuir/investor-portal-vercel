<script setup>
defineOptions({ name: "C_Navigation" });

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_HOME, ROUTE_INVESTOR, ROUTE_INVESTOR_SIGN_IN } from "../routing";
import messages from "../messages.json";

const route = useRoute();
const router = useRouter();
const navLinkShow = computed(() => [ROUTE_HOME].includes(route.name));
const navLinkRef = computed(() => {
  const [name, label] =
    route.name === ROUTE_HOME
      ? [ROUTE_INVESTOR, messages.navigation.investors]
      : [ROUTE_HOME, messages.navigation.home];
  return [router.resolve({ name }), label];
});
</script>

<template>
  <nav class="navigation flex-gow gap-2">
    <RouterLink v-if="navLinkShow" :to="navLinkRef[0]" class="fx_outline">
      {{ navLinkRef[1] }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.navigation {
  align-items: center;
  justify-content: center;
}
</style>
