<template>
  <div class="flex-col gap-1">
    <TextMute>
      You can update the email associated with your Investor Portal account. Any
      investments made under the other email will be added to your current
      account, making this feature useful for consolidating multiple accounts.
      To complete the change, you’ll need to confirm the request via
      {{
        SECURE_EMAIL_CHANGE
          ? "links sent to both your old and new email addresses."
          : "a link sent to your new email address."
      }}
    </TextMute>
    <NForm
      ref="formRef"
      :model="modelRef"
      :rules="rules"
      @submit.prevent="handleSubmit"
      :disabled="!enabledRef"
    >
      <NFormItem
        path="email"
        :label="messages.field_label.new_email"
        :show-label="false"
      >
        <NInput
          required
          type="email"
          v-model:value="modelRef.email"
          :placeholder="messages.field_hint.new_email"
        />
      </NFormItem>
      <FormButtons
        :submit="{
          content: SECURE_EMAIL_CHANGE
            ? messages.action.email_confirmations
            : messages.action.email_confirmation,
          disabled: !enabledRef || modelRef.email === '',
        }"
      />
      <FeedBack :success="successRef" :error="errorRef" />
    </NForm>
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput } from "naive-ui";
import { pick } from "rambda";
import { ref, watch } from "vue";
import {
  useChangeEmail,
  useAfter_changeEmail,
  SECURE_EMAIL_CHANGE,
} from "../actions/account";
import FormButtons from "../components/Button/FormButtons";
import FeedBack from "../components/FeedBack.vue";
import TextMute from "../components/TextMute.vue";
import messages from "../messages.json";
import { sessionRef } from "../state/session";
import { lock } from "../state/ui";

const picker = pick(["email"]);
const createModel = () => picker(sessionRef.value?.profile || {});
watch(sessionRef, (session) => {
  modelRef.value = createModel();
});

const rules = {
  email: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error(messages.feedback.email_required);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return new Error(messages.feedback.email_invalid);
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const formRef = ref(null);
const modelRef = ref(createModel());

const enabledRef = ref(true);

const successRef = ref("");
const errorRef = ref("");

function handleSubmit() {
  formRef.value
    ?.validate((errors) => {
      if (errors) {
        console.log("Validation errors:", errors);
        successRef.value = "";
        errorRef.value = `Validation errors: ${JSON.stringify(errors)}`;
      } else {
        successRef.value = "Validation passed";
        errorRef.value = "";
        return _submit(modelRef.value);
      }
    })
    .catch((err) => {
      console.error("Validation errors:", err);
    });
}

const changeEmail = useChangeEmail();
const after_changeEmail = useAfter_changeEmail();

async function _submit(values) {
  lock(messages.progress.emailing);
  enabledRef.value = false;
  const { data, error } = await changeEmail(values.email);
  if (error) {
    console.error("Error changing email:", error.message);
    enabledRef.value = true; // allow resubmit
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    successRef.value = SECURE_EMAIL_CHANGE
      ? messages.feedback.email_change.email_confirm_old_and_new
      : messages.feedback.email_change.email_confirm_new_only;
    errorRef.value = "";
  }
  lock();
  return after_changeEmail({ data, error });
}
</script>
