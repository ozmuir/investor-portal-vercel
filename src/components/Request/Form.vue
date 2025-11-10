<template>
  <NForm
    class="flex-col gap-1"
    style="width: 100%"
    ref="formRef"
    :model="modelRef"
    :rules="rules"
    @submit.prevent="handleSubmit"
    :disabled="!enabledRef"
    v-if="visibleRef"
  >
    <NFormItem path="req_summary" label="Request Summary:">
      <NInput
        type="text"
        placeholder="Briefly summarize your request here"
        required
        v-model:value="modelRef.req_summary"
        :minlength="LENGTH_MIN_REQUEST_SUMMARY"
        :maxlength="LENGTH_MAX_REQUEST_SUMMARY"
      />
    </NFormItem>
    <NFormItem path="req_details" label="Request Details:">
      <NInput
        type="textarea"
        placeholder="Include relevant information, context, or steps to reproduce the issue."
        v-model:value="modelRef.req_details"
        required
        :minlength="LENGTH_MIN_REQUEST_DETAILS"
        :maxlength="LENGTH_MAX_REQUEST_DETAILS"
        :rows="10"
        :disabled-autosize="{
          // sometimes throws 'ResizeObserver loop completed with undelivered notifications.'
          minRows: 5,
          maxRows: 15,
        }"
      />
    </NFormItem>
    <NFormItem path="invt_id_" label="Related Investments:">
      <InvestmentPicker
        multiple
        placeholder="Select investments this request is related to"
        v-model:value="modelRef.invt_id_"
      />
      <!-- TODO InvestmentPicker value not reset on submit -->
    </NFormItem>
    <NFormItem path="file_id_" label="Related Documents:">
      <FilePicker
        multiple
        placeholder="Select documents this request is related to"
        v-model:value="modelRef.file_id_"
      />
      <!-- TODO FilePicker value not reset on submit -->
    </NFormItem>
    <FormButtons
      :submit="{
        content: request_id
          ? messages.action.request_update
          : messages.action.request_the_new,
        disabled: !enabledRef,
      }"
    />
    <FeedBack :success="successRef" :error="errorRef" />
  </NForm>
</template>

<script setup>
defineOptions({ name: "CompRequestEdit" });
const { request_id } = defineProps({ request_id: String });

import { NForm, NFormItem, NInput } from "naive-ui";
import { onMounted, ref } from "vue";
import { requestUpdateOrCreate } from "../../actions/data.js";
import { supabase } from "../../actions/supabase.js";
import FilePicker from "../../components/File/FilePicker.vue";
import FeedBack from "../../components/FeedBack.vue";
import InvestmentPicker from "../../components/Investment/InvestmentPicker.vue";
import FormButtons from "../../components/Button/FormButtons.vue";
import messages from "../../messages.json";
import { lock } from "../../state/ui.js";
import {
  LENGTH_MIN_REQUEST_SUMMARY,
  LENGTH_MAX_REQUEST_SUMMARY,
  LENGTH_MIN_REQUEST_DETAILS,
  LENGTH_MAX_REQUEST_DETAILS,
} from "../../variables.js";
// import type { RequestPlusRow } from "../../../api-lib/base.js";
// import { PostgrestError } from "@supabase/supabase-js";

const successRef = ref("");
const errorRef = ref("");

const enabledRef = ref(true);
const visibleRef = ref(true);

// import type { FormInst } from "naive-ui";
// const formRef = ref<FormInst | null>(null);
const formRef = ref(null);

// const createModel = (params?: RequestPlusRow) => ({
const createModel = (params) => ({
  id: params?.id,
  req_summary: params?.req_summary || "",
  req_details: params?.req_details || "",
  invt_id_: params?.investments.map((it) => it.id) || [],
  file_id_: params?.files.map((it) => it.id) || [],
});

const modelRef = ref(createModel());

onMounted(async () => {
  if (request_id) {
    lock("Loading…");
    const { data, error } = await supabase
      .from("view_requests_v2")
      .select("*")
      .eq("id", request_id)
      .limit(1)
      .single(); // as { data: RequestPlusRow; error: PostgrestError | null };
    if (error) {
      console.error("Error loading the request:", error.message);
      successRef.value = "";
      errorRef.value = `Error loading the request: ${error.message}`;
    } else {
      modelRef.value = createModel(data);
    }
    lock();
  }
});

const rules = {
  req_summary: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("Request summary is required.");
        } else if (value.length < LENGTH_MIN_REQUEST_SUMMARY) {
          return new Error("Request summary is too short.");
        } else if (value.length > LENGTH_MAX_REQUEST_SUMMARY) {
          return new Error("Request summary is too long.");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  req_details: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("Request details are required.");
        } else if (value.length < LENGTH_MIN_REQUEST_DETAILS) {
          return new Error("Request details are too short.");
        } else if (value.length > LENGTH_MAX_REQUEST_DETAILS) {
          return new Error("Request details are too long.");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

function handleSubmit() {
  formRef.value
    ?.validate((errors) => {
      if (errors) {
        console.log("Validation errors:", errors);
        errorRef.value = JSON.stringify(errors);
        successRef.value = "";
      } else {
        errorRef.value = "";
        successRef.value = "Validation passed. Submitting your request…";
        _submit(modelRef.value);
      }
    })
    .catch((err) => {
      console.error("Validation errors:", err);
    });
}

async function _submit(values) {
  lock(values.id ? "Updating the request…" : "Creating the request…");
  const { data, error } = await requestUpdateOrCreate(values);
  if (error) {
    console.error("Error updating/creating request:", error.message);
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    successRef.value = `
Your request has been received. We're reviewing it and will get back to you soon.
A confirmation email has been sent. All further communication will happen via email.
Please keep the email subject unchanged when replying.
`;
    errorRef.value = "";
    modelRef.value = createModel(values.id ? values : {});
  }
  lock();
}
</script>
