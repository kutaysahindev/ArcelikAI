import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const LoginCallback = () => {
  const { oktaAuth } = useOktaAuth();

  // Handles the authentication callback
  React.useEffect(() => {
    oktaAuth.handleLoginRedirect();
  }, [oktaAuth]);

  return <div>Loading...</div>;
};

export default LoginCallback;
