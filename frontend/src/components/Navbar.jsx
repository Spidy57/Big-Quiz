import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import GooeyNav from "./GooeyNav";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { label: "Home", href: "/" },
    { label: "Quizzes", href: "/quiz" },
    { label: "About", href: "/about" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  // Find active index based on current path
  const activeIndex = items.findIndex(item => item.href === location.pathname);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="brand">Big Quiz</div>

      {/* Desktop GooeyNav */}
      <div className="nav-links desktop-only">
        <GooeyNav
          items={items}
          particleCount={13}
          particleDistances={[90, 10]}
          particleR={1}
          initialActiveIndex={activeIndex === -1 ? 0 : activeIndex}
          animationTime={500}
          timeVariance={200}
        />
      </div>

      {/* Burger — hidden when sidebar is open */}
      {!isOpen && (
        <button
          className="burger mobile-only"
          aria-label="Open menu"
          onClick={() => setIsOpen(true)}
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      )}

      {/* Mobile sidebar */}
      {isOpen && (
        <aside
          id="mobile-sidebar"
          className="mobile-sidebar open"
          aria-hidden={!isOpen}
        >
          <div className="sidebar-header">
            <span className="brand small">Big Quiz</span>
            <button
              className="close-btn"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="mobile-gooey-wrapper">
            <GooeyNav
              items={items}
              particleCount={9}
              particleDistances={[60, 8]}
              particleR={1}
              animationTime={380}
              timeVariance={120}
              initialActiveIndex={activeIndex === -1 ? 0 : activeIndex}
              onItemClick={(item) => {
                setIsOpen(false);
                if (item && item.href) navigate(item.href);
              }}
            />
          </div>
        </aside>
      )}

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </nav>
  );
};

export default Navbar;
