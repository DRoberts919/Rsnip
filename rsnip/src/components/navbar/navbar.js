import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbarStyles.css";
import Hamburger from "hamburger-react";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [changeNav, setChangeNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const changeNavColors = () => {
    window.scrollY >= 1 ? setChangeNav(true) : setChangeNav(false);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?name=${searchInput}`);
    }
  };
  window.addEventListener("scroll", changeNavColors);
  return (
    <div
      className={
        location.pathname !== "/"
          ? "nav white-bg black-txt"
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
          <div className="relative">
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
                <BsSearch color="#999" size={20} />
              </div>
            </Link>
          </div>
          <Link className="m-r-1 nav-link" to="/register">
            Sign Up
          </Link>
          <Link className="btn green-btn light-shadow m-r-1" to="/login">
            Login
          </Link>
        </div>
        <div className="nav-burger">
          <Hamburger toggled={menuOpen} toggle={setMenuOpen} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
