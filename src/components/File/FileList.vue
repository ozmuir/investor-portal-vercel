<template>
  <div v-if="filesLoadingRef" class="flex-line">
    {{ messages.progress.loading }} <Loader type="pulse" />
  </div>
  <NEmpty
    v-else-if="!filesRef.length"
    :description="messages.empty.documents"
    class="empty"
  />
  <template v-else>
    <FileListActions
      v-if="checkedIdsRef.length"
      :handleFilesDelete="handleFilesDelete"
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
          <template v-for="file in filesRef" :key="file.id">
            <tr>
              <TableCells
                :contents="file"
                :labels="labels"
                :pickers="pickers"
              />
            </tr>
          </template>
        </tbody>
      </MyTable>
    </NCheckboxGroup>
    <FeedBack :success="successRef" :error="errorRef" />
  </template>
</template>

<script setup>
import {
  NCheckboxGroup,
  NCheckbox,
  NEmpty,
  NTable,
  NTag,
  NText,
} from "naive-ui";
import { Fragment, h, onMounted, ref } from "vue";
import { filesDelete } from "../../actions/storage";
// import FileDates from "../../components/File/FileDates";
import FileListActions from "../../components/File/FileListActions";
// import FileMeta from "../../components/File/FileMeta";
import MyTable from "../../components/Table.vue";
import FileOpener from "../../components/File/FileOpener";
import TableCells from "../../components/TableCells.vue";
import TableLabels from "../../components/TableLabels.vue";
import Loader from "../../components/Loader";
import messages from "../../messages.json";
import { filesRef, filesLoadingRef, filesLoad } from "../../state/files";
import { lock } from "../../state/ui";
import $table from "../../styles/table.module.scss";
import { formatBytes, formatDateDefault } from "../../utils";
import FeedBack from "../FeedBack.vue";
import { renderInvestmentName } from "../render";

const labels = ["", "Name", "Size", "Added", "Related Investments", "Comment"];

const pickers = [
  (file) => h(NCheckbox, { value: file.id }),
  (file) => h(FileOpener, { filePath: file.name, mimetype: file.mimetype }),
  (file) =>
    h(
      "span",
      { title: file.size.toLocaleString("en-US") + " bytes" },
      formatBytes(file.size)
    ),
  (file) =>
    h(Fragment, [
      formatDateDefault(file.created_at),
      // " ",
      // h(FileDates, { file }),
    ]),
  (file) =>
    h(
      Fragment,
      // Fragment MUST receive an Array
      (file.investments || []).map((invt) =>
        h(NTag, { key: invt.id, size: "small" }, () =>
          renderInvestmentName(invt)
        )
      )
    ),
  (file) => h(NText, { depth: 3, class: "text-size-sm" }, () => file.comment),
];

onMounted(() => {
  filesLoad();
});

const checkedIdsRef = ref([]);

const handleCheckboxChange = (value) => {
  checkedIdsRef.value = value;
};

const successRef = ref("");
const errorRef = ref("");

const handleFilesDelete = async () => {
  lock("Deleting the documents…");
  const checkedIds = checkedIdsRef.value;
  let files = filesRef.value;
  files = files.filter((file) => checkedIds.indexOf(file.id) !== -1);
  const { data, error } = await filesDelete(files);
  if (error) {
    console.error("Error deleting files:", error.message);
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    const deletedIds = data.map((file) => file.id);
    let files = filesRef.value;
    files = files.filter((file) => deletedIds.indexOf(file.id) === -1);
    filesRef.value = files;
    checkedIdsRef.value = [];
    successRef.value = "Deleted the documents";
    errorRef.value = "";
  }
  lock();
};
</script>
