import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbarStyles.css";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const location = useLocation();
  const [changeNav, setChangeNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const changeNavColors = () => {
    window.scrollY >= 1 ? setChangeNav(true) : setChangeNav(false);
  };
  window.addEventListener("scroll", changeNavColors);
  return (
    <div
      className={
        changeNav ? "nav white-bg light-shadow black-txt" : "nav white-txt"
      }
    >
      <div className="content nav-group semi-bold">
        <Link className="nav-title nav-group" to="/">
          <img className="nav-logo" src="/RSnip_Logo.svg" alt="RSnip Logo" />
          Snip
        </Link>
        <div className={menuOpen ? "nav-links" : "nav-links nav-hidden"}>
          {/* <div>{location.pathname}</div> */}
          <Link className="m-r-1 text-shadow nav-link" to="/register">
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
