import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Navbar from "./components/navbar/navbar";
import SignUp from "./pages/signup/signup";
import SnippetEditor from "./pages/snippetEditor/snippetEditor";
import Confirmation from "./pages/confirmation/Confirmation";
import { Amplify } from "aws-amplify";

Amplify.configure({
  aws_cognito_region:
    "arn:aws:cognito-idp:us-west-1:948779363073:userpool/us-west-1_MVVnX14ZP",
  aws_user_pools_id: "us-west-1_MVVnX14ZP",
  aws_user_pools_web_client_id: "1fcur2odnfngog3rs3f215veua",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<SignUp />} />
      <Route path='/confirmation' element={<Confirmation />}></Route>
       <Route path="snippet/edit/worker-javascript.js" element={<SnippetEditor />} />
      <Route path='snippet/edit/:snippetId' element={<SnippetEditor />} />
    </Routes>
  </BrowserRouter>
);
