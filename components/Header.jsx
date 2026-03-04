import React from "react";
import "../src/assets/styles/layout.css"
const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src="/hit_logo.png"
          alt="HIT Logo"
          className="header__logo"
        />

        <h3 className="header__title">
          Portfolio Project Search
        </h3>
      </div>
    </header>
  );
};

export default Header;