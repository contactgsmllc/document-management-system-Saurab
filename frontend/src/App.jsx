import React from "react";
import "./App.css";
import ScrollToTop from "./ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";



// Pages
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// About Pages
import Overview from "./pages/About/Overview";
import WhyUS from "./pages/About/WhyUs";
import QualityPolicy from "./pages/About/QualityPolicy";
import HowCanWeHelp from "./pages/About/HowCanWeHelp";

// Services Pages
import Consulting from "./pages/services/Consulting";
import CloudSolution from "./pages/services/CloudSolutions";
import SoftwareEngineering from "./pages/services/SoftwareEngineering";
import MobileApplications from "./pages/services/MobileApplications";

// Dashboards
import UserDashboard from "./dashboards/User/UserDashboard";
import AdminDashboard from "./dashboards/Admin/AdminDashboard";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
     <ScrollToTop />
      <Routes>
        {/* Public pages with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignupPage />
            </Layout>
          }
        />

        {/* About pages */}
        <Route
          path="/about/overview"
          element={
            <Layout>
              <Overview />
            </Layout>
          }
        />
        <Route
          path="/about/why-us"
          element={
            <Layout>
              <WhyUS />
            </Layout>
          }
        />
        <Route
          path="/about/quality-policy"
          element={
            <Layout>
              <QualityPolicy />
            </Layout>
          }
        />
        <Route
          path="/about/how-can-we-help"
          element={
            <Layout>
              <HowCanWeHelp />
            </Layout>
          }
        />

        {/* Services pages */}
        <Route
          path="/services/consulting"
          element={
            <Layout>
              <Consulting />
            </Layout>
          }
        />
        <Route
          path="/services/cloud-solution"
          element={
            <Layout>
              <CloudSolution />
            </Layout>
          }
        />
        <Route
          path="/services/software-engineering"
          element={
            <Layout>
              <SoftwareEngineering />
            </Layout>
          }
        />
        <Route
          path="/services/mobile-applications"
          element={
            <Layout>
              <MobileApplications />
            </Layout>
          }
        />

        {/* Dashboards - Protected */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard/:tab"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}

export default App;
