<script setup>
defineOptions({ name: "ArticlesCard" });
const { brief, content } = defineProps({
  brief: { type: Boolean },
  content: { type: Object },
  more: { type: Function },
});

import { NIcon } from "naive-ui";
import Heading from "../../components/Heading.vue";
import { IconArrowRight, IconArrowUpRight } from "../../components/icons.js";
import { formatDateOnly } from "../../utils";
import { computed } from "vue";

const body = computed(() => (brief ? content.summary : content.body));
</script>

<template>
  <div class="-root flex-col gap-1">
    <div class="-header flex-col">
      <div class="-date-source flex-row">
        <span>{{ formatDateOnly(content.date) }}</span>
        <a
          v-if="!brief && content.url"
          class="-source-link flex-row text-upper"
          :href="content.url"
          target="_blank"
        >
          Source&nbsp;<NIcon size="1em"><IconArrowUpRight /></NIcon>
        </a>
      </div>
      <Heading as="h1">
        <component
          :is="more ? 'button' : 'div'"
          @click="more"
          class="-more-button"
        >
          {{ content.title }}
          <NIcon v-if="more" size="1em" class="-more-icon">
            <IconArrowRight />
          </NIcon>
        </component>
      </Heading>
    </div>
    <div v-if="body" class="-body flex-col" v-html="body"></div>
  </div>
</template>

<style scoped lang="scss">
.-root {
}
.-date-source {
  align-items: center;
  justify-content: space-between;
}
.-header {
  gap: 0.5rem;
}
.-body {
  gap: 0.75rem;
  // white-space: pre-line;
  > * {
    margin: 0;
  }
}

.-more-button {
  text-align: inherit;
}
.-more-button:hover,
.-more-button:focus {
  .-more-icon {
    opacity: 1;
  }
}
.-more-icon {
  vertical-align: middle;
  opacity: 0;
  transition: opacity var(--fx_duration);
}
.-source-link {
  align-items: center;
  justify-content: end;
  white-space: nowrap;
}
</style>
