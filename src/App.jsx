// import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";

import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";

import { DropNotification } from "./components/DropNotification/DropNotification";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotification, setNotificationDirection } from "./redux/userSlice";
import { router } from "./pages/Routes";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-36035985.okta.com/oauth2/default",
  clientId: "0oadru54zlAMBE58n5d7",
  redirectUri: window.location.origin + "/login/callback",
});

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  window.location.replace(originalUri || window.location.origin);
};

function App() {
  const { notificationType, notificationText, notificationTime } = useSelector(
    (slices) => slices.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (notificationText) {
      setTimeout(
        () => dispatch(setNotificationDirection()),
        notificationTime - 1000
      );
      setTimeout(
        () => dispatch(setNotification({ type: "", text: "", time: 0 })),
        notificationTime
      );
    }
  }, [notificationText]);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {/* {notificationText && (
        <DropNotification
          type={notificationType}
          txt={notificationText}
          time={notificationTime}
        />
      )} */}
      <DropNotification
        type={notificationType}
        txt={notificationText}
        time={notificationTime}
      />
      <RouterProvider router={router} />
    </Security>
  );
}

export default App;
