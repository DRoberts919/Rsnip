import { UserContext } from "./hooks/useContext";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "aws-amplify";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Navbar from "./components/navbar/navbar";
import SignUp from "./pages/signup/signup";
import ViewSnippet from "./pages/viewSnippet/viewSnippet";
import SnippetEditor from "./pages/snippetEditor/snippetEditor";
import Profile from "./pages/profile/profile";
import Confirmation from "./pages/confirmation/Confirmation";
import Search from "./pages/search/search";

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let user = null;
    try {
      user = await Auth.currentAuthenticatedUser();
      if (user) {
        setUser(user.attributes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={`user/${user.sub}`} /> : <Home />}
          />
          <Route
            path="login"
            element={user ? <Navigate to={`user/${user.sub}`} /> : <Login />}
          />
          <Route
            path="register"
            element={user ? <Navigate to={`user/${user.sub}`} /> : <SignUp />}
          />
          <Route path="snippet/edit/:snippetId" element={<SnippetEditor />} />
          <Route path="snippet/:snippetId" element={<ViewSnippet />} />
          <Route
            path="user/:userId"
            element={user ? <Profile /> : <Navigate to="login" />}
          />
          <Route path="confirmation" element={<Confirmation />}></Route>
          <Route path="search" element={<Search />} />
          <Route
            path="snippet/edit/worker-javascript.js"
            element={<SnippetEditor />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
