import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbarStyles.css";

const Navbar = () => {
  const location = useLocation();
  const [changeNav, setChangeNav] = useState(false);
  const changeNavColors = () => {
    window.scrollY >= 1 ? setChangeNav(true) : setChangeNav(false);
  };
  window.addEventListener("scroll", changeNavColors);
  return (
    <div className={changeNav ? "nav white-bg light-shadow" : "nav white-txt"}>
      <div className="content row-space-between semi-bold">
        <Link className="nav-title nav-group" to="/">
          <img class="nav-logo" src="/RSnip_Logo.svg" alt="RSnip Logo" />
          Snip
        </Link>
        <div>
          {/* <div>{location.pathname}</div> */}
          <Link className="m-r-1" to="/register">
            Sign Up
          </Link>
          <Link className="btn green-btn light-shadow m-r-1" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
