import { ref } from "vue";
import { server } from "../actions/api.js";
import { supabase } from "../actions/supabase";
import { sessionRef } from "../state/session";
import { TABLE_INVESTMENTS } from "../variables";

export const useInvestmentsRef = () => {
  const iRef = ref([]);
  const iLoadingRef = ref(false);
  const iLoad = async () => {
    iLoadingRef.value = true;
    const { data, error } = await supabase.from(TABLE_INVESTMENTS).select("*");
    iRef.value = data || [];
    if (error) {
      console.error(`Error fetching investments:`, error.message);
    } else {
      console.log(`Fetched investments:`, data);
    }
    iLoadingRef.value = false;
  };
  return [iRef, iLoadingRef, iLoad];
};

export const useRequestsRef = () => {
  const iRef = ref([]);
  const iLoadingRef = ref(false);
  const iLoad = async () => {
    iLoadingRef.value = true;
    const { data, error } = await supabase.from("view_requests_v2").select("*");
    iRef.value = data || [];
    if (error) {
      console.error(`Error fetching requests:`, error.message);
    } else {
      console.log(`Fetched requests:`, data);
    }
    iLoadingRef.value = false;
  };
  return [iRef, iLoadingRef, iLoad];
};

export const requestUpdateOrCreate = async (values) => {
  const { data, error } = await server("POST", "/api/request/upsert", values);
  if (error) {
    console.error(
      values.id ? "Error updating the request:" : "Error creating the request:",
      error.message
    );
  } else {
    console.log(
      values.id ? "Request updated:" : "Request created:",
      data
    );
  }
  return { data, error };
};
