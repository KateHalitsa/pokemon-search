"use client";

import Link from 'next/link';
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext";

function  Navbar() {
  const { theme, toggleTheme } =useTheme();
  return (
    <nav className="navbar">
      <Link href="/pokemon-search/search">Search</Link>
      <Link href="/pokemon-search/about">About</Link>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme}
      </button>
    </nav>
  );
}
export default Navbar;