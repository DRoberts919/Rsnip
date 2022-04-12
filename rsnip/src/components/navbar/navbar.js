import { Link } from "react-router-dom";
import "./navbarStyles.css";

const Navbar = () => {
  return (
    <div className=" nav">
      <div className="content row-space-between">
        <Link className="nav-title nav-group semi-bold" to="/">
          <img class="nav-logo" src="/RSnip_Logo.svg" alt="RSnip Logo" />
          Snip
        </Link>
        <div>
          <Link className="m-r-1" to="/">
            Home
          </Link>
          <Link className="m-r-1" to="/register">
            Sign Up
          </Link>
          <Link className="btn green-btn m-r-1" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
