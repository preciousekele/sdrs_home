import React from "react";
import logo from './images/logo.png';
import "boxicons";
import "boxicons/css/boxicons.min.css";
import "./Home.css";
import Hero from './hero/Hero';

const Header = () => {
  return (
    <div className="home-container">
      {/* Background elements */}
      <div className="bg-wrapper">
        <div className="gradient-overlay" />
        <div className="blur-overlay" />
      </div>

      {/* Your existing content */}
      <header className="header" id="header">
        <nav className="nav container">
          <a href="#" className="nav__logo">
            <span className="nav__logo-circle">
              <img src={logo} alt="logo" />
            </span>
            <span className="nav__logo-name">
              MCPHERSON UNIVERSITY DISCIPLINARY RECORD SYSTEM
            </span>
          </a>
        </nav>
      </header>
      <Hero/>
    </div>
  );
};

export default Header;