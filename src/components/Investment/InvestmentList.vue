<script setup>
defineOptions({ name: "C_Investments" });

import { IconRequest } from "../../components/icons.js";
import { NEmpty } from "naive-ui";
import { h, onMounted } from "vue";
import ButtonLink2 from "../../components/Button/ButtonLink2.vue";
import CopyButton from "../../components/Button/CopyButton.vue";
import Ellipsis from "../../components/Ellipsis.vue";
import InfoPopover from "../../components/InfoPopover.vue";
import MyTable from "../../components/Table.vue";
// import InvestmentMeta from "../../components/Investment/InvestmentMeta.vue";
import Loader from "../../components/Loader.vue";
import TableCells from "../../components/TableCells.vue";
import TableLabels from "../../components/TableLabels.vue";
import TableRowSeparator from "../../components/TableRowSeparator.vue";
import messages from "../../messages.json";
import { ROUTE_SETTINGS, ROUTE_REQUEST_NEW } from "../../routing";
import {
  investmentsRef,
  investmentsLoadingRef,
  investmentsLoad,
} from "../../state/investments";
import $table from "../../styles/table.module.scss";
import {
  ENTITY_OT,
  ENTITY_EI,
  SHARE_PRICE_EI_VENTURES,
  SHARE_PRICE_ORTHOGONAL,
} from "../../variables.js";
import { renderDealmaker, renderInvestmentName } from "../render.js";

const labels = [
  "",
  messages.investment.holder_name,
  messages.investment.holder_address,
  messages.investment.amount_paid,
  messages.investment.amount_purchased,
  // "",
];

const pickers = [
  () => "",
  (invt) => invt.holder_name,
  (invt) => invt.holder_address,
  (invt) =>
    invt.invt_shares
      ? (
          (invt.entity_name === ENTITY_OT
            ? SHARE_PRICE_ORTHOGONAL
            : invt.entity_name === ENTITY_EI
            ? SHARE_PRICE_EI_VENTURES
            : 0) * invt.invt_shares
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : null,
  (invt) => invt.invt_shares?.toLocaleString("en-US"),
];

const pickers_dm = [
  () => renderDealmaker(),
  (invt) => invt.holder_name_dm,
  (invt) => invt.holder_address_dm,
  (invt) =>
    invt.invt_shares_dm
      ? (
          (invt.entity_name === ENTITY_OT
            ? SHARE_PRICE_ORTHOGONAL
            : invt.entity_name === ENTITY_EI
            ? SHARE_PRICE_EI_VENTURES
            : 0) * invt.invt_shares_dm
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : null,
  (invt) => invt.invt_shares_dm?.toLocaleString("en-US"),
];

onMounted(() => {
  investmentsLoad();
});
</script>

<template>
  <div v-if="investmentsLoadingRef" class="flex-line">
    {{ messages.progress.loading }} <Loader type="pulse" />
  </div>
  <div v-else>
    <div
      v-if="investmentsRef.length"
      :class="[$table.table_container, 'flex-col', 'gap-1']"
    >
      <MyTable>
        <thead>
          <tr>
            <TableLabels :labels="labels" />
          </tr>
        </thead>
        <tbody>
          <template v-for="investment in investmentsRef" :key="investment.id">
            <tr>
              <td></td>
              <td :colspan="-1 + labels.length">
                <div style="display: flex; justify-content: space-between">
                  <div class="flex-col">
                    <component :is="renderInvestmentName(investment)" />
                  </div>
                  <div class="text-size-sm-1 muted">
                    <span class="inline valign-middle">ID: </span>
                    <b class="inline valign-middle">
                      <Ellipsis class="inline valign-middle">
                        {{ investment.id }}
                      </Ellipsis>
                    </b>
                    <CopyButton
                      class="inline valign-middle"
                      :text="investment.id"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="investment.invt_shares">
              <TableCells
                :contents="investment"
                :labels="labels"
                :pickers="pickers"
              />
            </tr>
            <!-- TODO Gradually removing Dialmaker records from the database -->
            <tr v-else-if="investment.invt_shares_dm">
              <TableCells
                :contents="investment"
                :labels="labels"
                :pickers="pickers_dm"
              />
            </tr>
            <TableRowSeparator :colspan="labels.length" />
          </template>
        </tbody>
      </MyTable>
      <div class="text-size-sm-1 muted">
        <b>Note:</b> The address and phone number on the investments cannot be
        changed at this time. However, you can provide a new address and phone
        number in
        <RouterLink :to="{ name: ROUTE_SETTINGS }" class="fx_underline"
          >Account Settings</RouterLink
        >, and we will use that if needed.
      </div>
    </div>
    <template v-else>
      <NEmpty :description="messages.empty.investments" class="empty" />
      <ButtonLink2
        :to="{ name: ROUTE_REQUEST_NEW }"
        :Icon="IconRequest"
        :content="messages.action.request_a_new"
      />
    </template>
  </div>
</template>
