const oktaConfig = {
  clientId: "0oadr4g28pCAmDGSS5d7",
  issuer: "https://dev-16420108.okta.com",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export default oktaConfig;
