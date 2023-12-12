const oktaConfig = {
  clientId: "0oadr4g28pCAmDGSS5d7",
  issuer: "https://dev-69297377.okta.com",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export default oktaConfig;
