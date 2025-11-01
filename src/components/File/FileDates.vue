<template>
  <NPopover trigger="click" style="padding: 0">
    <template #trigger>
      <NButton text>
        <NIcon><IconInfo /></NIcon>
      </NButton>
    </template>
    <MyTable>
      <tbody>
        <template
          v-for="item in [
            ['Created At', formatDateDefault(file.created_at)],
            ['Updated At', formatDateDefault(file.updated_at)],
            ['Last Accessed At', formatDateDefault(file.last_accessed_at)],
          ]"
          :key="item[0]"
        >
          <tr>
            <th>{{ item[0] }}</th>
            <td>{{ item[1] }}</td>
          </tr>
        </template>
      </tbody>
    </MyTable>
  </NPopover>
</template>

<script setup>
defineProps({ file: Object });

import { NButton, NIcon, NPopover } from "naive-ui";
import MyTable from "../../components/Table.vue";
import { IconInfo } from "../../components/icons.js";
import { formatDateDefault } from "../../utils";
</script>
