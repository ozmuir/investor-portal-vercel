<template>
  <NButtonGroup>
    <!--
    <NPopconfirm v-model:show="showDeleteConfirmRef" :show-icon="false">
      <template #icon>
        <NIcon><IconDelete /></NIcon>
      </template>
      <template #trigger>
        <ButtonButton>
          <div class="flex-line">
            <NIcon><IconDelete /></NIcon> Delete Files
          </div>
        </ButtonButton>
      </template>
      <template #action>
        <ButtonButton
          text
          @click="
            showDeleteConfirmRef = false;
            handleFilesDelete();
          "
        >
          <div class="flex-line">
            <NIcon><IconDelete /></NIcon> Confirm
          </div>
        </ButtonButton>
      </template>
    </NPopconfirm>
    -->
  </NButtonGroup>
</template>

<script setup>
// defineProps({
//   handleFilesDelete: Function,
// });
// import { IconDelete } from "../../components/icons";
import { NButtonGroup } from "naive-ui";
// import { ref } from "vue";
// import ButtonButton from "../components/Button/ButtonButton";

// const showDeleteConfirmRef = ref(false);
</script>
