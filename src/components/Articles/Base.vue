<script setup>
defineOptions({ name: "ArticlesBase" });

import { NCard, NEmpty, NModal, NPagination } from "naive-ui";
import { onMounted, ref } from "vue";
import { getArticles } from "../../actions/articles.js";
import Heading from "../../components/Heading.vue";
import ArticlesCard from "../../components/Articles/Card.vue";
import Loader from "../../components/Loader.vue";
import messages from "../../messages.json";

const perPageRef = ref(10);
const pageRef = ref(1);
const dataRef = ref([]);
const countRef = ref(0);
const loadingRef = ref(true);
const articlesLoad = async () => {
  loadingRef.value = true;
  const { data, count } = await getArticles(pageRef.value, perPageRef.value);
  dataRef.value = data;
  countRef.value = count;
  loadingRef.value = false;
};
onMounted(articlesLoad);

const modalShowingRef = ref(false);
const modalContentRef = ref(null);
</script>

<template>
  <div v-bind="$attrs" class="-root">
    <Loader v-if="loadingRef" type="bounce" />
    <div v-else class="-head_body flex-col gap-1">
      <Heading as="h2" class="-header">
        {{ messages.heading.articles }}
        <!--  -->
      </Heading>
      <NEmpty
        v-if="!dataRef.length"
        :description="messages.empty.articles"
        class="empty"
      />
      <template v-else>
        <ul class="-list flex-col gap-1">
          <li
            class="-item"
            v-for="item in dataRef"
            :key="item.title"
            :data-id="item.id"
          >
            <ArticlesCard
              brief
              :content="item"
              :more="
                () => {
                  modalContentRef = item;
                  modalShowingRef = true;
                }
              "
            />
          </li>
        </ul>
        <NPagination
          class="-pagination"
          v-if="countRef > perPageRef"
          :page-slot="5"
          :page="pageRef"
          :page-size="perPageRef"
          :page-count="Math.ceil(countRef / perPageRef)"
          :show-size-picker="false"
          :page-sizes="[10, 100, 1000]"
          @update:page="
            $emit('update:page', $event);
            pageRef = $event;
            articlesLoad();
          "
          @update:page-size="
            $emit('update:page-size', $event)
            // Not implemented
          "
        >
          <template #prev></template>
          <template #next></template>
        </NPagination>
      </template>
    </div>

    <NModal
      :show="modalShowingRef"
      :on-mask-click="
        () => {
          modalShowingRef = false;
        }
      "
      :on-after-leave="
        () => {
          modalContentRef.value = null;
        }
      "
    >
      <div class="-modal-wrap">
        <NCard class="width-60rem" closable @close="modalShowingRef = false">
          <ArticlesCard :content="modalContentRef" />
        </NCard>
      </div>
    </NModal>
  </div>
</template>

<style scoped lang="scss">
.-root {
}
.-head_body {
}
.-list {
  margin: 0;
  padding: 0;
}
.-item {
  padding: 0;
  display: block;

  padding: var(--bordered-padding);
  // border: 1px solid rgba(255, 255, 255, 0.2);

  background: rgba(255, 255, 255, 0.05);
}
.-pagination {
  margin: auto;
}

.-modal-wrap {
  padding: 0.5rem;
}
.-modal-wrap :deep(.n-card-header__close) {
  position: absolute;
  top: 0;
  right: 0;
  // top: -0.75rem;
  // right: -0.75rem;
  // padding: 1.5rem;
}
</style>
