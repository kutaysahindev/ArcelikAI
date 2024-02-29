// import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";

import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";

import { DropNotification } from "./components/DropNotification/DropNotification";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification, setNotificationDirection } from "./redux/userSlice";
import { adminRouter, clientRouter } from "./pages/Routes";
import ReduxPanel from "./components/DevTools/ReduxPanel";

const oktaAuth = new OktaAuth({
  issuer: "https://dev-36035985.okta.com/oauth2/default",
  clientId: "0oadru54zlAMBE58n5d7",
  redirectUri: window.location.origin + "/login/callback",
  // redirectUri: window.location.origin + "/home/login/callback",
});

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  window.location.replace(originalUri || window.location.origin);
};

function App() {
  const [selectedRoute, setSelectedRoute] = useState(clientRouter);
  const { notificationType, notificationText, notificationTime, userRole } = useSelector(
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

  useEffect(() => {
    if (userRole === "admin") setSelectedRoute(adminRouter)
  }, [userRole])

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <ReduxPanel />
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
      <RouterProvider router={selectedRoute} />
    </Security>
  );
}

export default App;
