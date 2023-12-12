import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const LoginCallback = () => {
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    oktaAuth.handleLoginRedirect();
  }, [oktaAuth]);

  return <div>Loading...</div>;
};

export default LoginCallback;
