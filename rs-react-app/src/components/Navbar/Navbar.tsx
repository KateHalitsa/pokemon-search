import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext";

function  Navbar() {
  const { theme, toggleTheme } =useTheme();
  return (
    <nav className="navbar">
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/about">About</NavLink>
      <button onClick={toggleTheme}>
        {theme}
      </button>
    </nav>
  );
}
export default Navbar;