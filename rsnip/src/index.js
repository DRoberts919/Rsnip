import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Navbar from "./components/navbar/navbar";
import SignUp from "./pages/signup/signup";
import SnippetEditor from "./pages/snippetEditor/snippetEditor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="snippet/edit/:snippetId" element={<SnippetEditor />} />
    </Routes>
  </BrowserRouter>
);
