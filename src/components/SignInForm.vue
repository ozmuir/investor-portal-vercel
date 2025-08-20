<script setup>
import { NForm, NFormItem, NInput } from "naive-ui";
import { ref } from "vue";
import {
  use_sendSignInEmail,
  useAfter_sentSignInEmail,
} from "../actions/session";
import { supabase } from "../actions/supabase";
import FormButtons from "../components/Button/FormButtons.vue";
import FeedBack from "../components/FeedBack.vue";
import OtpModal from "../components/OtpModal.vue";
import messages from "../messages.json";
import { lock } from "../state/ui";

const formRef = ref(null);
const modelRef = ref({ email: "" });

const successRef = ref("");
const errorRef = ref("");

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
      trigger: ["blur"], // "input"
    },
  ],
};

function handleSubmit() {
  formRef.value
    ?.validate((errors) => {
      if (errors) {
        console.log("Validation errors:", errors);
        successRef.value = "";
        errorRef.value = `Validation errors: ${JSON.stringify(errors)}`;
      } else {
        successRef.value = "";
        errorRef.value = "";

        sendEmail().then(() => {
          showOtpModalRef.value = true;
        });
      }
    })
    .catch((err) => {
      console.error("Error during validation:", err);
      successRef.value = "";
      errorRef.value = `Error during validation: ${err.message}`;
    });
}

const sendSignInEmail = use_sendSignInEmail();
const after_sentSignInEmail = useAfter_sentSignInEmail();

async function sendEmail() {
  lock(messages.progress.emailing);
  const email = modelRef.value.email;
  const { error } = await sendSignInEmail(email);
  lock();

  if (error) {
    console.error("Error sending sign in email:", error.message);
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    successRef.value = messages.feedback.log_in.email_sent;
    errorRef.value = "";
  }

  return after_sentSignInEmail({ error });
}

const showOtpModalRef = ref(false);
const otpSuccessRef = ref("");
const otpErrorRef = ref("");

async function handleOtpSubmit(otp) {
  lock(messages.progress.verifying);
  const { email } = modelRef.value;
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });
  lock();

  if (error) {
    console.error("Error verifying OTP:", error.message);
    otpSuccessRef.value = "";
    otpErrorRef.value = error.message;
  } else {
    console.log("Success verifying OTP:", data.session);
    otpSuccessRef.value = "";
    otpErrorRef.value = "";
    showOtpModalRef.value = false;
  }
}
</script>

<template>
  <NForm
    class="root flex-col gap-1"
    ref="formRef"
    :model="modelRef"
    :rules="rules"
    @submit.prevent="handleSubmit"
  >
    <div>Please enter the email you used to invest.</div>
    <NFormItem
      path="email"
      :label="messages.field_label.email"
      :show-label="false"
    >
      <NInput
        required
        type="email"
        v-model:value="modelRef.email"
        :placeholder="messages.field_hint.email"
      />
    </NFormItem>
    <FormButtons
      :submit="{ content: 'Send OTP Code' }"
      style="justify-content: center"
    />
    <FeedBack :success="successRef" :error="errorRef" />
  </NForm>
  <OtpModal
    :show="showOtpModalRef"
    @submit="handleOtpSubmit"
    @close="showOtpModalRef = false"
  >
    Please enter the OTP code we just sent you.
    <template #success v-if="otpSuccessRef">{{ otpSuccessRef }}</template>
    <template #error v-if="otpErrorRef">{{ otpErrorRef }}</template>
  </OtpModal>
</template>
