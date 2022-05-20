import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles.css";
import { Amplify } from "aws-amplify";
import App from "./app";

Amplify.configure({
  aws_cognito_region:
    "arn:aws:cognito-idp:us-west-1:948779363073:userpool/us-west-1_MVVnX14ZP",
  aws_user_pools_id: "us-west-1_MVVnX14ZP",
  aws_user_pools_web_client_id: "1fcur2odnfngog3rs3f215veua",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App/>
);
