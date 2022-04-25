import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Navbar from "./components/navbar/navbar";
import SignUp from "./pages/signup/signup";
import SnippetEditor from "./pages/snippetEditor/snippetEditor";
import Profile from "./pages/profile/profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      {/* <Route path="snippet/edit/worker-javascript.js" element={<SnippetEditor />} /> */}
      <Route path="snippet/edit/:snippetId" element={<SnippetEditor />} />
      <Route path="user/:userId" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
