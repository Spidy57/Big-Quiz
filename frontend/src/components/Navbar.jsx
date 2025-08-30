import React from 'react';
import { NavLink } from 'react-router-dom';

import GooeyNav from './GooeyNav';

import './Navbar.css';

const Navbar = () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Quizzes", href: "/quiz" },
    { label: "About", href: "/about" },
  ];
  return (
    <nav className="navbar">
      <div className="brand">Big Quiz</div>
      <div className=".nav-links">
        <GooeyNav
          items={items}
          particleCount={13}
          particleDistances={[90, 10]}
          particleR={1}
          initialActiveIndex={0}
          animationTime={500}
          timeVariance={200}
        />
      </div>
    </nav>
  );
};

export default Navbar;
