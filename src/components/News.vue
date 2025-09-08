<template>
  <NList>
    <template #header>
      <Heading as="h2">{{ messages.heading.news }}</Heading>
    </template>
    <!--
    <template #footer>
      <RouterLink :to="{ name: ROUTE_NEWS }">More</RouterLink>
    </template>
    -->
    <NListItem v-for="item in news" :key="item.title" style="padding: 1rem">
      <NThing :title="item.title" class="text-small text-left">
        <template #header>
          <div class="flex-col text-small">
            <b>{{ formatDateShort(item.date) }}</b>
            <div>{{ item.title }}</div>
          </div>
        </template>
        <!-- <Collapse :lines="2"> -->
        <component v-if="isVNode(item.body)" :is="item.body" />
        <div v-else v-html="item.body"></div>
        <!-- </Collapse> -->
      </NThing>
    </NListItem>
  </NList>
</template>

<script setup>
defineOptions({ name: "CNews" });

import { NList, NListItem, NThing } from "naive-ui";
import { isVNode } from "vue";
// import Collapse from "../components/Collapse";
import Heading from "../components/Heading.vue";
import news from "../news.js";
import messages from "../messages.json";
import { formatDateShort } from "../utils";

const onerem = parseFloat(getComputedStyle(document.documentElement).fontSize);
</script>
