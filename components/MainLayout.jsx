import React from "react";
import "../src/assets/styles/layout.css"

const MainLayout = ({ children }) => {
  return (
    <main className="main">
      <div className="main__container">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;