import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles.css";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Amplify } from "aws-amplify";
import Search from "./pages/search/search";
import Edituser from "./components/edituser/edituser"
import Home from "./pages/home/home.js"
import Login from "./pages/login/login"
import Profile from "./pages/profile/profile"
import SignUp from "./pages/signup/signup"
import Navbar from "./components/navbar/navbar"
import SnippetEditor from "./pages/snippetEditor/snippetEditor"
import Confirmation from "./pages/confirmation/Confirmation"
import ViewSnippet from "./pages/viewSnippet/viewSnippet"

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
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="snippet/edit/:snippetId" element={<SnippetEditor />} />
      <Route path="snippet/:snippetId" element={<ViewSnippet />} />
      <Route path="user/:userId" element={<Profile />} />
      <Route path="confirmation" element={<Confirmation />}></Route>
      <Route path="search" element={<Search />} />
      <Route
        path="snippet/edit/worker-javascript.js"
        element={<SnippetEditor />}
      />
      <Route path="test" element={<Edituser />}/>
    </Routes>
  </BrowserRouter>
);
