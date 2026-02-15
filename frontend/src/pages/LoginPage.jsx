import React, { useState , useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import api from "../api/axios.js";



function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    remember: false,
  });

       useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const { data } = await api.get("/users/companies/list");
      setCompanies(data);
    } catch (err) {
      console.error("Failed to load companies", err);
    }
  };
  fetchCompanies();
}, []);
  


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name] || errors.general)
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    if (successMessage) setSuccessMessage("");
  };

  /*const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
*/

const validateForm = () => {
  const newErrors = {};
  if (!formData.email.trim()) newErrors.email = "Email is required";
  if (!formData.password) newErrors.password = "Password is required";

  // only non-admin users need company
  if (!formData.companyName.trim()) {
    newErrors.companyName = "Company name is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  setLoading(true);

  try {
    const resp = await api.post("/users/login", {
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
    });

   /* const data = resp.data;
    console.log("LOGIN RESPONSE RAW:", resp, data);

    // Extract token from any possible backend key
    const token = data.token || data.authToken || data.accessToken;
    const role = data.role ?? data.userRole ?? data.roleName;

    console.log("Parsed token, role:", { token, role, fullData: data });

    if (!token) {
      console.warn("No token found in login response - check backend keys");
    }

    // Save credentials
    if (token) localStorage.setItem("authToken", token);
    if (role) localStorage.setItem("userRole", role);
    localStorage.setItem("userData", JSON.stringify(data));*/
const data = resp.data;

// 🔥 clear OLD user/admin session
localStorage.clear();

// Extract token safely
const token = data.token || data.authToken || data.accessToken;
const role = data.role ?? data.userRole ?? data.roleName;

// Save fresh session
if (token) localStorage.setItem("authToken", token);
if (role) localStorage.setItem("role", role);

// Store ONLY user object, not full response
localStorage.setItem("userData", JSON.stringify(data.user || data));


    

    console.log("LocalStorage after set:", {
      authToken: localStorage.getItem("authToken"),
      userRole: localStorage.getItem("userRole"),
      userData: JSON.parse(localStorage.getItem("userData") || "null"),
    });

    setSuccessMessage("Login successful — redirecting...");

    // Redirect by role
    if (role === "SUPER_ADMIN") {
      window.location.href = "/admin/dashboard";
    } else if (role === "USER") {
      window.location.href = "/user/dashboard";
    } else {
      window.location.href = "/user/dashboard"; // fallback
    }

  } catch (err) {
    console.error("Login error:", err);
    setErrors({ general: err.response?.data?.message || "Invalid credentials" });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Please sign in to your account
            </p>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
              {successMessage}
            </div>
          )}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {errors.general}
            </div>
          )}

          <div className="space-y-4">
          
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1.5">
    Select Company
  </label>

  <div className="relative">
    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

    <select
      name="companyName"
      value={formData.companyName}
      onChange={handleChange}
      className={`w-full pl-10 pr-4 py-2.5 border ${
        errors.companyName ? "border-red-300" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <option value="">Choose a company</option>

      {companies.map((company) => (
        <option key={company.id} value={company.name}>
          {company.name}
        </option>
      ))}
    </select>
  </div>

  {errors.companyName && (
    <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
  )}
</div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-10 pr-4 py-2.5 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2.5 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-md transition-colors duration-200"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;