import React from "react";
import "../src/assets/styles/layout.css"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">
        © {currentYear} Portfolio Project Search. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;