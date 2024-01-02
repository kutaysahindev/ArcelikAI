import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { LoginCallback } from "@okta/okta-react";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";
import TestRedux from "./pages/TestRedux";
import Anteroom from "./pages/Anteroom";

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
        path: "test",
        element: <TestRedux />,
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
  issuer: "https://dev-16420108.okta.com/oauth2/default",
  clientId: "0oadroi27bvehMs8M5d7",
  redirectUri: window.location.origin + "/login/callback",
});

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  window.location.replace(originalUri || window.location.origin);
};

function App() {
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <RouterProvider router={router} />
    </Security>
  );
}

export default App;
