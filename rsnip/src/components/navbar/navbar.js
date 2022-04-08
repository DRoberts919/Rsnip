import { Link } from "react-router-dom";
import "./navbarStyles.css";

const Navbar = () => {
  return (
    <div className="content row-space-between">
      <Link to="/">
        <img class="nav-logo" src="/RSnip_Logo.svg" alt="RSnip Logo" />
      </Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
