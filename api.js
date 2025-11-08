#!/usr/bin/env node

import http from "http";
import url from "url";

const routes = {};
function addRoute(method, path, handler) {
  const key = `${method.toUpperCase()} ${path}`;
  routes[key] = handler;
}

import testHandler from "./api/test.js";
addRoute("POST", "/api/test", testHandler);

// import deleteUser from "./api/user/delete.js";
// addRoute("POST", "/api/user/delete", deleteUser);

// import createBucket from "./api/storage/create.js";
// addRoute("POST", "/api/storage/create", createBucket);

// import requestUpsert from "./api/request/upsert.js";
// addRoute("POST", "/api/request/upsert", requestUpsert);

// import requestResponse from "./api/request/response.js";
// addRoute("POST", "/api/request/response", requestResponse);

// import requestStatus from "./api/request/status.js";
// addRoute("POST", "/api/request/status", requestStatus);

// import listRequests from "./api/request/list.js";
// addRoute("GET", "/api/request/list", listRequests);

// import signedUrl from "./api/storage/signed_url.js";
// addRoute("GET", "/api/storage/signed_url", signedUrl);

function enhanceRes(res) {
  res.status = function (code) {
    this.statusCode = code;
    return this;
  };

  res.json = function (data) {
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify(data));
    return this;
  };

  res.send = function (data) {
    this.setHeader("Content-Type", "text/plain");
    this.end(data);
    return this;
  };

  return res;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const key = `${req.method.toUpperCase()} ${parsedUrl.pathname}`;
  const handler = routes[key];

  enhanceRes(res);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (!handler) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Not Found" }));
  }

  try {
    handler(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ error: "Internal Server Error", details: err.message })
    );
  }
});

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
