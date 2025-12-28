/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function UserDashboardNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  


  

  return (
    <nav className="fixed w-full z-50 bg-blue-900 text-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* Logo *
      <Link to="/user/dashboard" className="flex items-center"> 
      <img src={logo} alt="Global Solutions" className="h-18 w-auto -mr-1" /> 
      <h1 className="-m-6 p-0 text-white text-xl sm:text-2xl font-semibold font-serif "> Global Solutions </h1>
       </Link>

        {/* Desktop Menu *
        <ul className="hidden md:flex gap-6 items-center font-medium relative">
  <li className="relative">
    <button
      onClick={() => setDashboardOpen(!dashboardOpen)}
      className="flex items-center gap-1 hover:text-gray-300 transition"
    >
      Dashboard
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </button>

    {dashboardOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Link
          to="/user/dashboard"
          onClick={() => setDashboardOpen(false)}
          className="block px-4 py-2 hover:bg-gray-100"
        >
          User Dashboard
        </Link>
        <Link
          to="/admin/dashboard"
          onClick={() => setDashboardOpen(false)}
          className="block px-4 py-2 hover:bg-gray-100"
        >
          Admin Dashboard
        </Link>
      </div>
    )}
  </li>
</ul>


        {/* Mobile Menu Button *
        <div className="md:hidden">
          <button
            className="p-2 rounded hover:bg-blue-800 transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu *
    {mobileOpen && (
  <div className="md:hidden bg-blue-900 text-white px-4 py-4 space-y-2">
    <p className="text-sm font-semibold text-gray-300">Dashboard</p>

    <Link
      to="/user/dashboard"
      className="block py-2 px-3 rounded-lg hover:bg-blue-800"
      onClick={() => setMobileOpen(false)}
    >
      User Dashboard
    </Link>

    <Link
      to="/admin/dashboard"
      className="block py-2 px-3 rounded-lg hover:bg-blue-800"
      onClick={() => setMobileOpen(false)}
    >
      Admin Dashboard
    </Link>
  </div>
)}

    </nav>
  );
}*/


import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function UserDashboardNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-blue-900 text-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Global Solutions" className="h-18 w-auto -mr-1" />
          <h1 className="-m-6 p-0 text-white text-xl sm:text-2xl font-semibold font-serif">
            Global Solutions
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-14 items-center font-medium">

          <li>
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <button
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              className="flex items-center gap-1 hover:text-gray-300 transition"
            >
              Services
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {servicesOpen && (
              <ul
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute top-full left-0 bg-blue-900 text-white rounded-lg shadow-lg w-56"
              >
                <li><Link to="/services/consulting" className="block px-4 py-2 hover:bg-blue-700">Consulting</Link></li>
                <li><Link to="/services/software-engineering" className="block px-4 py-2 hover:bg-blue-700">Software Engineering</Link></li>
                <li><Link to="/services/cloud-solution" className="block px-4 py-2 hover:bg-blue-700">Cloud Solution</Link></li>
                <li><Link to="/services/mobile-applications" className="block px-4 py-2 hover:bg-blue-700">Mobile Applications</Link></li>
              </ul>
            )}
          </li>

          {/* About Dropdown */}
          <li className="relative">
            <button
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
              className="flex items-center gap-1 hover:text-gray-300 transition"
            >
              About
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </button>

            {aboutOpen && (
              <ul
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
                className="absolute top-full left-0  bg-blue-900 text-white rounded-lg shadow-lg w-56"
              >
                <li><Link to="/about/overview" className="block px-4 py-2 hover:bg-blue-700">Overview</Link></li>
                <li><Link to="/about/why-us" className="block px-4 py-2 hover:bg-blue-700">Why Us?</Link></li>
                <li><Link to="/about/quality-policy" className="block px-4 py-2 hover:bg-blue-700">Quality Policy</Link></li>
                <li><Link to="/about/how-can-we-help" className="block px-4 py-2 hover:bg-blue-700">How Can We Help?</Link></li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/contact-us" className="hover:text-gray-300 transition">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        {/*<div className="md:hidden">
          <button
            className="p-2 rounded hover:bg-blue-800 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>*/}
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
  <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-blue-900 text-white overflow-y-auto z-40">
    <div className="px-4 py-4 space-y-2">

      {/* Home */}
      <Link
        to="/"
        onClick={() => setMobileOpen(false)}
        className="block py-3 text-lg font-semibold rounded-lg hover:bg-blue-800 px-3"
      >
        Home
      </Link>

      {/* Services */}
      <button
        onClick={() => setServicesOpen(!servicesOpen)}
        className="w-full flex justify-between items-center py-3 text-lg font-semibold rounded-lg hover:bg-blue-800 px-3"
      >
        Services
        <span className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {servicesOpen && (
        <div className="pl-4 space-y-1">
          <Link to="/services/consulting" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Consulting
          </Link>
          <Link to="/services/software-engineering" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Software Engineering
          </Link>
          <Link to="/services/cloud-solution" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Cloud Solution
          </Link>
          <Link to="/services/mobile-applications" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Mobile Applications
          </Link>
        </div>
      )}

      {/* About */}
      <button
        onClick={() => setAboutOpen(!aboutOpen)}
        className="w-full flex justify-between items-center py-3 text-lg font-semibold rounded-lg hover:bg-blue-800 px-3"
      >
        About
        <span className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {aboutOpen && (
        <div className="pl-4 space-y-1">
          <Link to="/about/overview" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Overview
          </Link>
          <Link to="/about/why-us" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Why Us?
          </Link>
          <Link to="/about/quality-policy" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            Quality Policy
          </Link>
          <Link to="/about/how-can-we-help" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded hover:bg-blue-700">
            How Can We Help?
          </Link>
        </div>
      )}

      {/* Contact */}
      <Link
        to="/contact-us"
        onClick={() => setMobileOpen(false)}
        className="block py-3 text-lg font-semibold rounded-lg hover:bg-blue-800 px-3"
      >
        Contact Us
      </Link>

    </div>
  </div>
)}

    </nav>
  );
}
