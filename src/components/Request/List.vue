<script setup>
defineOptions({ name: "CompRequestList" });

import { NCheckbox, NCheckboxGroup, NEmpty, NTag } from "naive-ui";
import MyTable from "../../components/Table.vue";
import { Fragment, h, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import Heading from "../../components/Heading.vue";
import FileOpener from "../../components/File/FileOpener.vue";
import RequestListActions from "../../components/Request/ListActions.vue";
import Loader from "../../components/Loader.vue";
import TableCells from "../../components/TableCells.vue";
import TableLabels from "../../components/TableLabels.vue";
import ButtonLink from "../../components/Button/ButtonLink.vue";
import RequestStatus from "../../components/Request/Status.vue";
import { renderCopyButton } from "../../components/Button/copyButton.js";
import { renderEllipsis } from "../../components/ellipsis.js";
import messages from "../../messages.json";
import { ROUTE_REQUEST_EDIT } from "../../routing/index.js";
import {
  requestsRef,
  requestsLoadingRef,
  requestsLoad,
} from "../../state/requests";
import $table from "../../styles/table.module.scss";
import { formatDateDefault } from "../../utils";
import { renderInvestmentName } from "../render.js";

const labels = [
  // "",
  "Request ID",
  "Created At",
  "Updated At",
  "Status",
  "Investments",
  "Documents",
  "",
];

const pickers = [
  // (request) => h(NCheckbox, { value: request.id }),
  (request) =>
    h(Fragment, [
      h(
        RouterLink,
        {
          class: "inline",
          to: { name: ROUTE_REQUEST_EDIT, params: { request_id: request.id } },
        },
        () => renderEllipsis(request.id)
      ),
      renderCopyButton(request.id, { class: "inline" }),
    ]),
  (request) => formatDateDefault(request.created_at),
  (request) => formatDateDefault(request.updated_at),
  (request) => h(RequestStatus, { status: request.res_status }),
  (request) =>
    h(
      Fragment,
      // Fragment MUST receive an Array
      (request.investments || []).map((invt) =>
        h(NTag, { key: invt.id, size: "small" }, () =>
          renderInvestmentName(invt)
        )
      )
    ),
  (request) =>
    h(
      Fragment,
      // Fragment MUST receive an Array
      (request.files || []).map((file) =>
        h(NTag, { key: file.id, size: "small" }, () =>
          h(FileOpener, {
            filePath: file.name,
            mimetype: file.mimetype,
          })
        )
      )
    ),
  (request) =>
    h(Fragment, [
      h(
        ButtonLink,
        {
          to: {
            name: ROUTE_REQUEST_EDIT,
            params: { request_id: request.id },
          },
        },
        () => "Edit"
      ),
    ]),
];

const checkedIdsRef = ref([]);

const handleCheckboxChange = (value) => {
  checkedIdsRef.value = value;
};

const handleRequestsDelete = async () => {};

onMounted(() => {
  requestsLoad();
});
</script>

<template>
  <div v-if="requestsLoadingRef" class="flex-line">
    {{ messages.progress.loading }} <Loader type="pulse" />
  </div>
  <NEmpty
    v-else-if="!requestsRef.length"
    :description="messages.empty.requests"
    class="empty"
  />
  <div v-else>
    <RequestListActions
      v-if="checkedIdsRef.length"
      :handleRequestsDelete="handleRequestsDelete"
      class="flex-end"
      style="width: 100%; margin-top: -1rem; margin-bottom: 1rem"
    />
    <NCheckboxGroup
      @update:value="handleCheckboxChange"
      :class="$table.table_container"
    >
      <MyTable>
        <thead>
          <tr>
            <TableLabels :labels="labels" />
          </tr>
        </thead>
        <tbody>
          <template v-for="request in requestsRef" :key="request.id">
            <tr>
              <TableCells
                :contents="request"
                :labels="labels"
                :pickers="pickers"
              />
            </tr>
            <tr>
              <td :colspan="labels.length">
                <Heading as="h6">
                  {{ request.req_summary }}
                </Heading>
                <div style="white-space: pre-wrap">
                  {{ request.req_details }}
                </div>
              </td>
            </tr>
            <tr v-if="request.res_note">
              <td :colspan="labels.length">
                <div style="white-space: pre-wrap">
                  {{ request.res_note }}
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </MyTable>
    </NCheckboxGroup>
  </div>
</template>
