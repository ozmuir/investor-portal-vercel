<template>
  <div class="view-30rem view-align-left">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">{{ messages.heading.account }}</Heading>
    <div class="flex-col gap-2">
      <Loader v-if="sessionRef === undefined" type="bounce" />
      <template v-else-if="sessionRef === null">
        {{ $router.push({ name: ROUTE_INVESTOR }) }}
      </template>
      <div v-else class="flex-col gap-1 align-start">
        <NCard title="Profile Update">
          <b>Note:</b> the information you provide here will override the
          details recorded on your investment.
          <ProfileForm />
        </NCard>
        <NCard title="Profile ID">
          <div class="flex-line">
            <NTag
              style="font-family: monospace; font-weight: bold; cursor: inherit"
            >
              {{ sessionRef.profile.id }}
            </NTag>
            <CopyButton
              :text="sessionRef.profile.id"
              message="Profile ID Copied!"
            />
            <div class="flex-grow"></div>
            <NTag v-if="sessionRef.profile.is_admin" type="info">Admin</NTag>
          </div>
        </NCard>
        <NCard title="Email Change">
          <EmailChangeForm />
        </NCard>
        <NCard title="Account Deletion">
          <AccountDeleteForm />
        </NCard>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "V_Account" });

import { NCard, NTag } from "naive-ui";
import EmailChangeForm from "../components/EmailChangeForm.vue";
import Loader from "../components/Loader";
import ProfileForm from "../components/ProfileForm.vue";
import AccountDeleteForm from "../components/AccountDeleteForm.vue";
import Heading from "../components/Heading";
import messages from "../messages.json";
import { sessionRef } from "../state/session";
import { ROUTE_INVESTOR } from "../routing";
import CopyButton from "../components/Button/CopyButton.vue";
</script>
