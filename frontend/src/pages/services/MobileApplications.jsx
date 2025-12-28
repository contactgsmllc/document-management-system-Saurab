import { Link, useLocation } from "react-router-dom";
import ContactBar from "../../components/ContactBar";

export default function Consulting() {
  const location = useLocation();

  const services = [
    { name: "Cloud Solution", path: "/services/cloud-solution" },
    { name: "Software Engineering", path: "/services/software-engineering" },
    { name: "Consulting", path: "/services/consulting" },
    { name: "Mobile Applications", path: "/services/mobile-applications" },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8 sm:pt-28">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 text-center mb-4">
          Mobile Applications
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-4xl text-center mx-auto">
        At Global Solutions Tech, we create more than mobile apps—we deliver engaging digital experiences that inspire and transform. Combining creativity and technology, we turn your ideas into reality.
        </p>
      </div>

      {/* FULL WIDTH RESPONSIVE HERO IMAGE */}
      <div className="w-full overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px]">
          <img
            src="https://www.tanishasystems.com/assets/img/mobile-applications.jpg"
            alt="Mobile Applications"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* MAIN CONTENT WITH SIDEBAR */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 xl:gap-16">
          {/* LEFT SIDE - MAIN CONTENT */}
          <div className="order-2 lg:order-1">
            {/* Our Solutions */}
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8">
              Elevate Your Potential with Global Solutions Tech
            </h2>

            <div className="space-y-8 mb-12">
              {/* Imagine */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                 Envision
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                 Picture the possibilities. Imagine a mobile app that seamlessly connects you with customers, empowers your team, and elevates your brand. At Global Solutions, we transform your vision into cutting-edge digital solutions.
                </p>
              </div>

              {/*Innovate*/}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Modernize
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                In today’s fast-paced digital world, we are your trusted partner in mobile app development. Our team of experienced designers, developers, and strategists continuously explores new technologies and approaches to transform your ideas into reality.
                </p>
              </div>

              {/* Inspire */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Empower
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Your mobile app is more than software—it embodies your brand’s identity and values. That’s why we adopt a human-centered design approach, creating experiences that engage and delight users at every interaction. From elegant visuals to intuitive interfaces, we ensure your app makes a lasting impact.
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8">
              Take Your Business to the Next Level with Mobile Solutions
              </h2>

              {/* Immersive Experiences */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Competitive Advantage
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Having a mobile presence differentiates a business from competitors. Supports innovation and strengthens market positioning.
                </p>
              </div>

              {/* Increased Revenue Opportunities */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Increased Revenue Opportunities
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Mobile commerce, in-app purchases, and subscription models open new revenue streams. Targeted marketing and promotions can boost sales.
                </p>
              </div>

              {/* Increased Customer Engagement */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Increased Customer Engagement
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Mobile apps allow businesses to connect with customers directly through push notifications, in-app messages, and personalized content. Enhances loyalty and brand awareness.
                </p>
              </div>
            </div>

            {/* Why Choose Global Solutions */}
            <div className="mb-12 bg-gray-100 p-6 sm:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-8 border-b-2 border-blue-900 pb-3">
                Why Choose Global Solutions?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Visionary Leadership",
                    desc: "Our leadership team brings decades of combined experience in mobile app development and digital innovation, guiding our team to new heights of creativity and excellence.",
                  },
                  {
                    title: "Creative Collaboration",
                    desc: "We believe in the power of collaboration, working closely with our clients to turn their visions into reality and bring their ideas to life in ways they never thought possible.",
                  },
                  {
                    title: "Lasting Impact",
                    desc: "At Global Solutions, we don't just build mobile apps; we build legacies. We measure our success not by the number of downloads or five-star reviews but by the lasting impact our solutions have on our clients and their customers..",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-6 h-6 text-blue-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SIDEBAR */}
          <aside className="order-1 lg:order-2 space-y-8">
            {/* Services List - Always visible */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-900 text-white px-5 py-4">
                <h3 className="font-semibold text-lg">Our Services</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {services.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`block px-5 py-4 hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base ${
                        location.pathname === item.path
                          ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-900"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Have a Question? Box - Hidden on mobile & tablet, visible only on lg+ */}
            <div className="hidden lg:block bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3">Have a Question?</h3>
              <p className="text-blue-100 text-sm mb-5">
                Feel free to reach out to us
              </p>

              <div className="space-y-5">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Call Us</p>
                  <a
                    href="tel:+15617642272"
                    className="text-lg sm:text-xl font-bold block hover:text-blue-200 transition"
                  >
                    +1 (860)-337-2116
                  </a>
                </div>
                <div>
                  <p className="text-blue-100 text-sm mb-2">Email Us</p>
                  <a
                    href="mailto:info@ gstechsystems.com"
                    className="text-sm sm:text-base hover:underline break-all"
                  >
                    info@gstechsystems.com
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom Contact Bar - Always visible (especially on mobile) */}
      <ContactBar />
    </div>
  );
}
