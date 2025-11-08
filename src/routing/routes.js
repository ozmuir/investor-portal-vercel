const PATH_HOME = "";
const PATH_INVESTOR = PATH_HOME;
const PATH_INVESTOR_SIGN_IN = `${PATH_INVESTOR}/login`;
const PATH_INVESTOR_ACCOUNT = `${PATH_INVESTOR}/account`;
const PATH_INVESTMENT_LIST = `${PATH_INVESTOR}/investments`;
const PATH_FILE_LIST = `${PATH_INVESTOR}/documents`;
const PATH_FILE_NEW = `${PATH_FILE_LIST}/new`;
const PATH_REQUEST_LIST = `${PATH_INVESTOR}/requests`;
const PATH_REQUEST_NEW = `${PATH_REQUEST_LIST}/new`;
const PATH_REQUEST_EDIT = `${PATH_REQUEST_LIST}/:request_id`;
const PATH_ADMIN = `${PATH_INVESTOR}/admin`;
const PATH_ADMIN_REQUESTS = `${PATH_ADMIN}/requests`;
const PATH_TEST = `${PATH_INVESTOR}/test`;

export const ROUTE_NOT_FOUND = "Not Found";
export const ROUTE_HOME = "Home";
export const ROUTE_NEWS = "News";
export const ROUTE_INVESTOR = "Investor Portal";
export const ROUTE_INVESTOR_SIGN_IN = "Log In";
export const ROUTE_SETTINGS = "Account";
export const ROUTE_INVESTMENT_LIST = "Investments";
export const ROUTE_FILE_LIST = "Documents";
export const ROUTE_FILE_NEW = "Upload Documents";
export const ROUTE_REQUEST_LIST = "Requests";
export const ROUTE_REQUEST_NEW = "Create request";
export const ROUTE_REQUEST_EDIT = "Edit request";
export const ROUTE_TEST = "Test";

export const ROUTE_ADMIN_REQUESTS = "Admin | Requests";

// import LayoutHomePage from "../layouts/HomePage";
import { isOT, isEI } from "../state/environment.js";
import ViewSettings from "../views/Settings.vue";
import ViewAdminRequests from "../views/Admin/Requests.vue";
import ViewHome from "../views/Home.vue";
import ViewInvestmentList from "../views/InvestmentList.vue";
import ViewFileList from "../views/File/List.vue";
import ViewFileNew from "../views/File/New.vue";
import ViewNotFound from "../views/NotFound.vue";
import ViewRequestEdit from "../views/Request/Edit.vue";
import ViewRequestList from "../views/Request/List.vue";
import ViewRequestNew from "../views/Request/New.vue";
import ViewSignIn from "../views/SignIn.vue";
import ViewTest from "../views/Test.vue";
import messages from "../messages.json";
import { truthy } from "../utils/index.js";
import { ENTITY_EI, ENTITY_OT } from "../variables.js";

const withSuffix = (text) =>
  [text, isOT ? ENTITY_OT : isEI ? ENTITY_EI : ""].filter(truthy).join(" - ");

export default [
  {
    path: PATH_HOME,
    name: ROUTE_HOME,
    component: ViewHome,
    meta: {
      // title: messages.meta.title.home,
      title: withSuffix(messages.meta.title.investors_portal),
      // Layout: LayoutHomePage,
      redirectOnSession: null,
      redirectOnNoSession: null,
    },
  },
  {
    path: PATH_INVESTOR,
    name: ROUTE_INVESTOR,
    component: ViewHome,
    meta: {
      title: withSuffix(messages.meta.title.investors_portal),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_INVESTOR_SIGN_IN,
    name: ROUTE_INVESTOR_SIGN_IN,
    component: ViewSignIn,
    meta: {
      title: withSuffix(messages.meta.title.investor_login),
      redirectOnSession: ROUTE_INVESTOR,
      redirectOnNoSession: null,
    },
  },
  {
    path: PATH_INVESTOR_ACCOUNT,
    name: ROUTE_SETTINGS,
    component: ViewSettings,
    meta: {
      title: withSuffix(messages.meta.title.investor_account),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_INVESTMENT_LIST,
    name: ROUTE_INVESTMENT_LIST,
    component: ViewInvestmentList,
    meta: {
      title: withSuffix(messages.meta.title.investor_investments),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_FILE_LIST,
    name: ROUTE_FILE_LIST,
    component: ViewFileList,
    meta: {
      title: withSuffix(messages.meta.title.investor_documents),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_FILE_NEW,
    name: ROUTE_FILE_NEW,
    component: ViewFileNew,
    meta: {
      title: withSuffix(messages.meta.title.investor_documents_upload),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_REQUEST_LIST,
    name: ROUTE_REQUEST_LIST,
    component: ViewRequestList,
    meta: {
      title: withSuffix(messages.meta.title.investor_requests),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_REQUEST_NEW,
    name: ROUTE_REQUEST_NEW,
    component: ViewRequestNew,
    meta: {
      title: withSuffix(messages.meta.title.investor_requests_new),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_REQUEST_EDIT,
    name: ROUTE_REQUEST_EDIT,
    component: ViewRequestEdit,
    meta: {
      title: withSuffix(messages.meta.title.investor_requests_edit),
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    },
  },
  {
    path: PATH_ADMIN_REQUESTS,
    name: ROUTE_ADMIN_REQUESTS,
    component: ViewAdminRequests,
    meta: {
      redirectOnSession: null,
      redirectOnNoSession: ROUTE_INVESTOR_SIGN_IN,
    }
  },
  {
    path: PATH_TEST,
    name: ROUTE_TEST,
    component: ViewTest,
    meta: {
      redirectOnSession: null,
      redirectOnNoSession: null,
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NOT_FOUND,
    component: ViewNotFound,
    meta: {
      title: messages.meta.title.not_found,
    },
  },
];
