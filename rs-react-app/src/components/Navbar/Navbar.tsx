import { Link, NavLink } from "react-router";
import "./Navbar.css";

function  Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}
export default Navbar;