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

const ScrollToTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  });

  return children || null;
};


const NoAuthRoute = ({user, component}) => {
  if(user === {} || user === undefined || user === null) return component;
  return <Navigate to="/" replace />;
}

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getUser = async () => {
    let user = null;
    try {
      user = await Auth.currentAuthenticatedUser();
      if (user) {
        fetch(`${process.env.REACT_APP_BASE_URL}user/${user.attributes.sub}`)
          .then((res) => res.json())
          .then((data) => setUser(data.Item));
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
          <Route path="/" element={<ScrollToTop><Home /></ScrollToTop>} />
          <Route path="login" element={<ScrollToTop><NoAuthRoute user={user} component={<Login />}/> </ScrollToTop>} />
          <Route path="register" element={<ScrollToTop><NoAuthRoute user={user} component={<SignUp />}/></ScrollToTop>} />
          <Route path="snippet/edit/:snippetId" element={<ScrollToTop><SnippetEditor /></ScrollToTop>} />
          <Route path="snippet/:snippetId" element={<ScrollToTop><ViewSnippet /></ScrollToTop>} />
          <Route path="user/:userId" element={<ScrollToTop><Profile /></ScrollToTop>} />
          <Route path="confirmation" element={<ScrollToTop><Confirmation /></ScrollToTop>} />
          <Route path="search" element={<ScrollToTop><Search /></ScrollToTop>} />
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
