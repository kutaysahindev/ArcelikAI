// import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { LoginCallback } from "@okta/okta-react";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";
import Anteroom from "./pages/Anteroom";
import { DropNotification } from "./components/DropNotification/DropNotification";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login/callback",
        redirectUri: "/anteroom",
        element: <LoginCallback />,
      },
      {
        path: "form",
        element: <Form />,
      },
      {
        path: "anteroom",
        element: <Anteroom />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

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
      console.log('notificationTime: ', notificationTime)
      setTimeout(() => {
        dispatch(setNotification({ type: "", text: "", time: 3 }));
      }, notificationTime);
    }
  }, [notificationText]);

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {notificationText && (
        <DropNotification
          type={notificationType}
          txt={notificationText}
          time={notificationTime}
        />
      )}
      <RouterProvider router={router} />
    </Security>
  );
}

export default App;
