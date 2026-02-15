import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-blue-900 flex items-center justify-center gap-4">
          <span className="w-12 h-0.5 bg-gray-300"></span>
          Contact
          <span className="w-12 h-0.5 bg-gray-300"></span>
        </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg">
            Give us a call or send us an email and we will get back to you.
          </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="group relative rounded-2xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="text-blue-900 w-7 h-7" />
            </div>
            
            <h3 className="font-bold text-gray-900 text-lg mb-3">Address</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              PO Box 902, South Windsor <br />
              CT 06074
            </p>
          </div>

          <div className="group relative rounded-2xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="text-blue-900 w-7 h-7" />
            </div>
            
            <h3 className="font-bold text-gray-900 text-lg mb-3">Call Us</h3>
            <p className="text-gray-600 text-sm">
              +1 860-337-2116
            </p>
          </div>

          <div className="group relative rounded-2xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="text-blue-900 w-7 h-7" />
            </div>
            
            <h3 className="font-bold text-gray-900 text-lg mb-3">Email Us</h3>
            <p className="text-gray-600 text-sm">
              info@gstechsystems.com
            </p>
          </div>

          <div className="group relative rounded-2xl p-8 bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="text-blue-900 w-7 h-7" />
            </div>
            
            <h3 className="font-bold text-gray-900 text-lg mb-3">Open Hours</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Monday - Friday<br />
              9:00AM - 05:00PM
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Saturday<br />
              10:00AM - 04:00PM
            </p>            
          </div>

        </div>
      </div>
    </section>
  );
}