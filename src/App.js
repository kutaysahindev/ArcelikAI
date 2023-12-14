import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./App.css";

import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { LoginCallback } from "@okta/okta-react"; // Add this line

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Form from "./pages/Form";
// import Navbar from "./components/Navbar/Navbar";
// import Main from "./components/Main/Main";
// import Footer from "./components/Footer/Footer";
// import Profile from "./Profile";
import NotFound from "./pages/NotFound";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // loader: <ArcelikLoader />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'form',
        element: <Form />,
      },
      // {
      //   path: 'about',
      //   element: <About />,
      // },
      // {
      //   path: 'redirect',
      //   element: <Redirect />,
      //   // children: [
      //   //   {
      //   //     path: ":id",
      //   //     element: <About />,
      //   //   }
      //   // ]
      // },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // {
  //   path: '/',
  //   element: <RootLayout />,
  // },
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
  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const handleNavbarItemClick = (index) => {
  //   setSelectedIndex(index);
  // };

  return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <RouterProvider router={router} />
      </Security>
  );
  // return (
  //   <Router>
  //     <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
  //       <div className="App">
  //         <Navbar
  //           onItemClick={handleNavbarItemClick}
  //           selectedIndex={selectedIndex}
  //         />
  //         <Main selectedIndex={selectedIndex} />
  //         <Footer />
  //         <Routes>
  //           <Route path="/login/callback" element={<LoginCallback />} />
  //           <Route path="/profile" element={<Profile />} />
  //         </Routes>
  //       </div>
  //     </Security>
  //   </Router>
  // );
}

export default App;
