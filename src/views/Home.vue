<script setup>
defineOptions({ name: "ViewHome" });

import { computed } from "vue";
import ArticlesBase from "../components/Articles/Base.vue";
import ButtonLink from "../components/Button/ButtonLink.vue";
import Loader from "../components/Loader.vue";
import QuickActions from "../components/QuickActions.vue";
import { ROUTE_INVESTOR_SIGN_IN } from "../routing";
import { sessionRef } from "../state/session";

const isAuthChecking = computed(() => sessionRef.value === undefined);
const isNotAuthenticated = computed(() => sessionRef.value === null);
const isAuthenticated = computed(() => !!sessionRef.value);
</script>

<template>
  <div class="view-60rem flex-col gap-4" style="align-items: center">
    <QuickActions v-if="isAuthenticated" />

    <ArticlesBase style="text-align: start" />

    <Loader v-if="isAuthChecking" type="bounce" />

    <template v-if="isNotAuthenticated">
      <div class="flex-col gap-1">
        <div>You are not authenticated.</div>
        <ButtonLink :to="{ name: ROUTE_INVESTOR_SIGN_IN }">Log in</ButtonLink>
      </div>
    </template>
  </div>
</template>
