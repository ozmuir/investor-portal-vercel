<template>
  <button
    style="all: revert; width: fit-content; margin: auto"
    @click="trigger"
  >
    Trigger
  </button>
  <pre>{{ dataRef }}</pre>
</template>

<script setup>
defineOptions({ name: "CTest" });
import { ref } from "vue";

const dataRef = ref(null);

const method = "POST";
const uri = "/api/test";
const headers = {};
const values = {};

function trigger() {
  const options = { headers };
  options.method = method;
  const API_HOSTNAME =
    "development" === process.env.NODE_ENV ? "http://localhost:8888" : "";
  const API_BASE_URL =
    "development" === process.env.NODE_ENV ? "" : process.env.BASE_URL;
  let url = `${API_HOSTNAME}${API_BASE_URL}${uri}`;
  if (values) {
    if (method === "GET") {
      url += "?" + new URLSearchParams(values); // non-primitive values will be stringified!
    } else if (method === "POST") {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(values);
    }
  }
  fetch(url, options)
    .then((res) => {
      // console.log(res.statusText, res.text());
      return res.json();
    })
    .then((data) => {
      console.log(data);
      dataRef.value = data;
    })
    .catch((err) => {
      dataRef.value = err.message;
    });
}
</script>
