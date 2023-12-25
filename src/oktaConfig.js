const oktaConfig = {
  clientId: "0oadru54zlAMBE58n5d7",
  issuer: "https://dev-36035985.okta.com",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

export default oktaConfig;
