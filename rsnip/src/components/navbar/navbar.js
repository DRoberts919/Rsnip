import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbarStyles.css";
import Hamburger from "hamburger-react";
import { BsSearch } from "react-icons/bs";
import DarkModeToggle from "./darkModeToggle";
import { UserContext } from "../../hooks/useContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [changeNav, setChangeNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useContext("");

  // const [saveMessage, setSaveMessage] = useState("Autosaved at 5:00 PM");
  const changeNavColors = () => {
    window.scrollY >= 1 ? setChangeNav(true) : setChangeNav(false);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?name=${searchInput}`);
    }
  };

  useEffect(() => {
    console.log("USER: ", user);
  }, [user]);

  window.addEventListener("scroll", changeNavColors);
  if (!location.pathname.includes("/snippet/edit/")) {
    return (
      <div
        className={
          location.pathname !== "/"
            ? "nav white-bg light-shadow black-txt"
            : changeNav
            ? "nav white-bg light-shadow black-txt"
            : "nav white-txt"
        }
      >
        <div className="content nav-group semi-bold">
          <Link className="nav-title nav-group" to="/">
            <img className="nav-logo" src="/RSnip_Logo.svg" alt="RSnip Logo" />
            Snip
          </Link>
          <div className={menuOpen ? "nav-links" : "nav-links nav-hidden"}>
            {/* <div>{location.pathname}</div> */}
            {!location.pathname.includes("/search") ? (
              <div className="relative m-r-1">
                <input
                  className="nav-search-snippet light-shadow m-1"
                  type="text"
                  placeholder="Search Snippet"
                  onKeyDown={handleEnterKey}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Link
                  className="nav-search-icon"
                  to={`/search?name=${searchInput}`}
                >
                  <div className="row">
                    <div className="search-line"></div>
                    <BsSearch color="#999" size={18} />
                  </div>
                </Link>
              </div>
            ) : null}
            {user ? (
              <>
                <div className="btn sign-out light-shadow">Sign Out</div>
                <img
                  className="nav-profile-img"
                  src={user.profilePic}
                  alt="Profile Img"
                />
              </>
            ) : (
              <>
                <Link className="m-r-1 nav-link" to="/register">
                  Sign Up
                </Link>
                <Link className="btn green-btn light-shadow m-r-1" to="/login">
                  Login
                </Link>
              </>
            )}

            <DarkModeToggle />
          </div>
          <div className="nav-burger">
            <Hamburger toggled={menuOpen} toggle={setMenuOpen} />
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
