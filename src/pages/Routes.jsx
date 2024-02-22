import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "./Home";
import Form from "./Form";
import NotFound from "./NotFound";
import Anteroom from "./Anteroom";

import { LoginCallback } from "@okta/okta-react";

export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Navigate replace to="home" />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    // children
  },
  {
    path: "/home",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
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
    ],
  },
  {
    path: "login/callback",
    redirectUri: "/home",
    element: <LoginCallback />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
  ]);
  