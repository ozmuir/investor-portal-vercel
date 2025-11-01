<script setup>
import { NCard, NForm, NFormItem, NInputOtp, NModal, NText } from "naive-ui";
import { ref } from "vue";
import ButtonSubmit from "../../components/Button/ButtonSubmit.vue";

const props = defineProps({
  show: { type: Boolean, required: true },
  otpLength: { type: Number, default: 6 },
});
const emit = defineEmits(["submit", "close"]);

// Checks if the value conforms to the OTP format.
function otpIsValid(value) {
  const v = value.filter((it) => !!it);
  return v.length === props.otpLength;
}

// Checks if the field should be marked invalid.
function otpFieldValidator(rule, value) {
  const v = value.filter((it) => !!it);
  if (v.length && v.length < props.otpLength) {
    return new Error("OTP too short.");
  }
  return true;
}

const formRef = ref(null);

const modelRef = ref({
  otp: Array(props.otpLength).fill(""),
});

const rules = {
  otp: [
    {
      required: true,
      validator: otpFieldValidator,
      trigger: ["blur"],
    },
  ],
};

async function handleSubmit() {
  formRef.value.validate((errors) => {
    if (!errors) {
      document.activeElement?.blur();
      emit("submit", modelRef.value.otp.join("")); // Emitting plain value!
    }
  });
}
</script>

<template>
  <NModal
    :show="show"
    :auto-focus="false"
    :trap-focus="false"
    :block-scroll="false"
  >
    <NForm
      ref="formRef"
      :model="modelRef"
      :rules="rules"
      @submit.prevent="handleSubmit"
    >
      <NCard closable @close="$emit('close')">
        <template #header>
          <slot v-if="$slots.default"></slot>
          <span v-else>Enter OTP</span>
        </template>
        <template #footer v-if="$slots.success || $slots.error">
          <NText v-if="$slots.success" type="success">
            <slot name="success"></slot>
          </NText>
          <NText v-if="$slots.error" type="error">
            <slot name="error"></slot>
          </NText>
        </template>
        <div class="flex-row gap-1" style="align-items: flex-start">
          <NFormItem
            path="otp"
            label="OTP"
            :show-label="false"
            :show-feedback="false"
            :style="{ width: '100%' }"
          >
            <NInputOtp
              v-model:value="modelRef.otp"
              :length="otpLength"
              @finish="handleSubmit"
            />
          </NFormItem>
          <ButtonSubmit v-if="false" :disabled="!otpIsValid(modelRef.otp)">
            Verify
          </ButtonSubmit>
        </div>
      </NCard>
    </NForm>
  </NModal>
</template>

<style>
.n-input-otp {
  width: 100%;
}
.n-input-otp .n-input {
  flex-grow: 1;
  aspect-ratio: 0.75;
}
.n-input-otp .n-input__input-el {
  height: 100%;
  font-size: 2em;
}
</style>
