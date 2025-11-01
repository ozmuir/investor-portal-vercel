<script setup>
defineOptions({ name: "C_Actions" });

import { NCard, NGrid, NGridItem, NIcon } from "naive-ui";
import {
  IconDocument,
  IconEdit,
  IconInvestment,
  IconRequest,
} from "../components/icons";
import {
  ROUTE_REQUEST_LIST,
  ROUTE_FILE_LIST,
  ROUTE_INVESTMENT_LIST,
  ROUTE_SETTINGS,
} from "../routing";

const onerem = parseFloat(getComputedStyle(document.documentElement).fontSize);

const items = [
  {
    title: "Investments",
    body: "Take a moment to review your investments with us. Make sure everything is in order.",
    routerLink: { name: ROUTE_INVESTMENT_LIST },
    Icon: IconInvestment,
    span: 2,
  },
  {
    title: "Documents",
    body: "Upload documents confirming your investments. We will use it to process your requests.",
    routerLink: { name: ROUTE_FILE_LIST },
    Icon: IconDocument,
  },
  {
    title: "Requests",
    body: "Request support if investments are missing or have incorrect data.",
    routerLink: { name: ROUTE_REQUEST_LIST },
    Icon: IconRequest,
  },
  {
    title: "Account Information",
    body: "Update your email, name, and address here.",
    routerLink: { name: ROUTE_SETTINGS },
    Icon: IconEdit,
    span: 2,
  },
];
</script>

<template>
  <NGrid :x-gap="onerem" :y-gap="onerem" :cols="2">
    <NGridItem
      v-for="item in items"
      class="grid-item"
      :key="item.title"
      :span="item.span || 1"
    >
      <RouterLink
        :to="item.routerLink"
        class="link flex-row items-stretch fx_zoom_in"
      >
        <NCard :title="item.title" class="card">
          <NIcon class="icon" size="4rem" depth="5">
            <component :is="item.Icon" />
          </NIcon>
          {{ item.body }}
        </NCard>
      </RouterLink>
    </NGridItem>
  </NGrid>
</template>

<style scoped>
.grid-item {
  display: flex;
}
.link {
  flex-basis: 100%;
}
.card {
  padding: 4rem 0 0;
}
.icon {
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100%;
  /* height: 100%; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* transform: translate(-50%, -50%) */
}
</style>
