import { supabase } from "../actions/supabase";
import { ROUTE_HOME, ROUTE_INVESTOR, ROUTE_INVESTOR_SIGN_IN } from "../routing";

export default function setupRedirects(router) {
  let _session;

  const newRoute = (route) => {
    if (typeof _session === "undefined") {
      // console.log("No redirect until the session is resolved");
      return;
    }
    const {
      name,
      meta: { redirectOnSession, redirectOnNoSession },
    } = route;
    if (!_session) {
      if (redirectOnNoSession) {
        return { name: redirectOnNoSession };
      }
    } else {
      if (redirectOnSession) {
        return { name: redirectOnSession };
      }
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    // console.log("onAuthStateChange");
    _session = session;
    router.replace(newRoute(router.currentRoute.value));
  });

  router.beforeEach((to, from) => {
    // console.log("beforeEach", { to, from });
    return newRoute(to);
  });
}
