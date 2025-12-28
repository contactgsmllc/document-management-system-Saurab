import { Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-200 to-gray text-gray-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Global Solutions Tech
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Where Technology Meets Business Excellence..
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="#" 
                className="group bg-blue-50 border border-blue-100 rounded-full p-3 hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
              >
                <Linkedin className="text-blue-900 group-hover:text-white transition-colors" size={20} />
              </a>
              <a 
                href="#" 
                className="group bg-blue-50 border border-blue-100 rounded-full p-3 hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
              >
                <Twitter className="text-blue-900 group-hover:text-white transition-colors" size={20} />
              </a>
              <a 
                href="#" 
                className="group bg-blue-50 border border-blue-100 rounded-full p-3 hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
              >
                <Facebook className="text-blue-900 group-hover:text-white transition-colors" size={20} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Useful Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-900"></div>
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="/about/overview" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/signup" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  Join Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  Our Locations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-900 group-hover:w-4 transition-all duration-300"></span>
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Our Services
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-900"></div>
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-blue-900 transition-colors duration-300 cursor-pointer">Cloud Solution</li>
              <li className="hover:text-blue-900 transition-colors duration-300 cursor-pointer">Consulting</li>
              <li className="hover:text-blue-900 transition-colors duration-300 cursor-pointer">Mobile Applications</li>
              <li className="hover:text-blue-900 transition-colors duration-300 cursor-pointer">Software Engineering</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Contact Us
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-900"></div>
            </h3>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                PO Box 902, South Windsor<br />
                CT 06074 <br />
              </p>

              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="text-blue-900 font-semibold">Phone:</span> +1 212-729-6543
                </p>
                <p className="text-gray-600">
                  <span className="text-blue-900 font-semibold">Email:</span> info@gstechsystems.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-600 text-sm">
          © Copyright 2024
          <span className="font-semibold text-gray-900"> Global Solutions Tech.</span> All Rights Reserved
        </div>
      </div>
    </footer>
  );
}