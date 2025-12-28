import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    services: false,
    about: false,
  });
  const [mobileDropdowns, setMobileDropdowns] = useState({  // ← ADD THIS BACK
    services: false,
    about: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerWidth >= 768) {
      setScrolled(window.scrollY > 10);
    } else {
      setScrolled(true);
    }
  }, []);

  // Optimized scroll effect
  useEffect(() => {
    if (!isLandingPage) {
      setScrolled(true);
      return;
    }

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isLandingPage, handleScroll]);

  // Close dropdowns when route changes
  useEffect(() => {
    setDropdownOpen({ services: false, about: false });
    setMobileOpen(false);
    setMobileDropdowns({ services: false, about: false });  // ← RESET THIS TOO
  }, [location]);

  // Consistent menu structure
  const navItems = {
    services: {
      title: "Services",
      items: [
        { name: "Consulting", path: "/services/consulting" },
        { name: "Software Engineering", path: "/services/software-engineering" },
        { name: "Cloud Solution", path: "/services/cloud-solution" },
        { name: "Mobile Applications", path: "/services/mobile-applications" },
      ],
    },
    about: {
      title: "About",
      items: [
        { name: "Overview", path: "/about/overview" },
        { name: "Why Us?", path: "/about/why-us" },
        { name: "Quality Policy", path: "/about/quality-policy" },
        { name: "How Can We Help?", path: "/about/how-can-we-help" },
      ],
    },
  };

  // Background styles
  const getNavbarBackground = () => {
    if (!isLandingPage) return "bg-blue-900 text-white shadow-lg";
    return scrolled
      ? "bg-blue-900 text-white shadow-lg"
      : "bg-transparent text-white";
  };

  // Event handlers
  const handleMouseEnter = (name) => {
    if (window.innerWidth >= 768) {
      setDropdownOpen((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleMouseLeave = (name) => {
    if (window.innerWidth >= 768) {
      setDropdownOpen((prev) => ({ ...prev, [name]: false }));
    }
  };

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const closeAllMenus = () => {
    setMobileOpen(false);
    setDropdownOpen({ services: false, about: false });
    setMobileDropdowns({ services: false, about: false });  // ← RESET THIS TOO
  };

  // Keyboard navigation handler
  const handleKeyDown = (e, menuKey) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (window.innerWidth < 768) {
        toggleMobileDropdown(menuKey);
      } else {
        setDropdownOpen(prev => ({ ...prev, [menuKey]: !prev[menuKey] }));
      }
    } else if (e.key === "Escape") {
      closeAllMenus();
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${getNavbarBackground()}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* Logo *
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-bold z-50 font-sans hover:opacity-80 transition-opacity duration-200"
          onClick={closeAllMenus}
        >
          Global Solutions Tech
        </Link>*/}
        {/*logo*/}
 


   
<Link
  to="/"
  className="flex items-center leading-none z-50 hover:opacity-80 transition"
  onClick={closeAllMenus}
>
  <img
    src={logo}
    alt="Global Solutions Logo"
    className="h-18 w-auto -mr-1"
  />

  <h1 className="-m-6 p-0 text-white text-xl sm:text-2xl font-semibold font-serif">
    Global Solutions
  </h1>
</Link>



        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-wrap gap-8 lg:gap-14 items-center font-sans">
            <li>
    <Link
      to="/"
      className={`px-3 py-2 transition-colors duration-200 font-medium rounded ${
        scrolled ? "hover:text-gray-300" : "hover:text-blue-200"
      }`}
      onClick={closeAllMenus}
    >
      Home
    </Link>
  </li>
          {Object.entries(navItems).map(([key, { title, items }]) => (
            <li key={key} className="relative">
              <div
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={() => handleMouseLeave(key)}
              >
                <button
                  className={`flex items-center px-3 py-2 transition-colors duration-200 font-medium rounded ${
                    scrolled ? "hover:text-gray-300" : "hover:text-blue-200"
                  }`}
                  aria-expanded={dropdownOpen[key]}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDown(e, key)}
                >
                  {title}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      dropdownOpen[key] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen[key] && (
                  <ul 
                    className="absolute top-full left-0 bg-blue-900 rounded shadow-lg min-w-[200px] z-50 font-sans border border-blue-700"
                    role="menu"
                  >
                    {items.map((item, idx) => (
                      <li key={idx} role="none">
                        <Link
                          to={item.path}
                          className="block px-4 py-2 hover:bg-blue-700 whitespace-nowrap transition-colors duration-200"
                          role="menuitem"
                          onClick={() => setDropdownOpen({ services: false, about: false })}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}

          <li>
            <Link
              to="/contact-us"
              className={`px-3 py-2 transition-colors duration-200 font-medium rounded ${
                scrolled ? "hover:text-gray-300" : "hover:text-blue-200"
              }`}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`px-4 py-2 ml-2 rounded-2xl font-semibold transition-colors duration-200 ${
                !isLandingPage || scrolled
                  ? "bg-white text-blue-900 hover:bg-gray-200"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-50">
          <button
            className="p-2 rounded hover:bg-blue-800 transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-blue-900 overflow-y-auto z-40 font-sans"
        >
          <div className="px-4 py-4 space-y-2">
              <div className="border-b border-blue-700">
    <Link
      to="/"
      className="block py-3 text-lg font-semibold text-white hover:bg-blue-800 rounded-lg px-2 transition-colors duration-200"
      onClick={closeAllMenus}
    >
      Home
    </Link>
  </div>

            {Object.entries(navItems).map(([key, { title, items }]) => (
              <div key={key} className="border-b border-blue-700">
                <button
                  className="w-full flex justify-between items-center py-3 text-lg font-semibold text-white hover:bg-blue-800 rounded-lg px-2 transition-colors duration-200"
                  onClick={() => toggleMobileDropdown(key)}
                  aria-expanded={mobileDropdowns[key]}
                  aria-haspopup="true"
                  onKeyDown={(e) => handleKeyDown(e, key)}
                >
                  {title}
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileDropdowns[key] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileDropdowns[key] && (
                  <div className="pl-4 pb-2 space-y-1" role="menu">
                    {items.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="block py-2 px-3 rounded-lg hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                        role="menuitem"
                        onClick={closeAllMenus}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}


            <div className="border-b border-blue-700">
              <Link
                to="/contact-us"
                className="block py-3 text-lg font-semibold text-white hover:bg-blue-800 rounded-lg px-2 transition-colors duration-200"
                onClick={closeAllMenus}
              >
                Contact Us
              </Link>
            </div>
            <div className="border-b border-blue-700">
              <Link
                to="/login"
                className="block py-3 text-lg font-semibold text-white hover:bg-blue-800 rounded-lg px-2 transition-colors duration-200"
                onClick={closeAllMenus}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;