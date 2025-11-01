<script setup>
import { NConfigProvider, NMessageProvider, darkTheme } from "naive-ui";
import { onMounted, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import Blocker from "./components/Blocker.vue";
import UrlMessage from "./components/UrlMessage";
import AnyPageLayout from "./layouts/AnyPage";
import themeOverrides from "./styles/theme.js";
import "./window.js";

const Layout = shallowRef(AnyPageLayout);
const route = useRoute();
watch(
  () => route.meta.Layout,
  // eslint-disable-next-line no-unused-vars
  (NewLayout, OldLayout) => {
    Layout.value = NewLayout || AnyPageLayout;
  }
);

/*
onMounted(() => {
  // if (typeof window !== "undefined") {
  //   // https://d3vhysnltdkzu.cloudfront.net/ortho.gg/symbols-1.0.0.svg
  //   window.fetchAndInsertHTML("/symbols-1.0.0.svg");
  // }

  window.createScript({
    src: "https://tally.so/widgets/embed.js",
    id: "contact-us",
    defer: true, // to not slow down SVG animation
  });
});
*/
</script>

<template>
  <NConfigProvider
    v-bind="{
      theme: darkTheme,
      themeOverrides,
    }"
  >
    <NMessageProvider :duration="5000" :keep-alive-on-hover="true">
      <UrlMessage />
      <div style="position: relative">
        <Blocker />
        <Layout
          class="rainbow"
          style="background-attachment: fixed !important; color: #ffffff"
        />
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style src="modern-normalize/modern-normalize.css"></style>
<style lang="scss" src="./styles/text.scss"></style>
<style lang="scss" src="./styles/layout.scss"></style>
<style lang="scss" src="./styles/alignment.scss"></style>
<style lang="scss" src="./styles/buttons.scss"></style>
<style lang="scss" src="./styles/naive-ui.scss"></style>
<style lang="scss" src="./styles/fx.scss"></style>
<style lang="scss" src="./styles/other.scss"></style>
<style lang="scss" src="./styles/document.scss"></style>
