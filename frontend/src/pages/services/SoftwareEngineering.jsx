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
          Software Design and Development
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-4xl text-center mx-auto">
         At Global Solutions Tech, innovation and precision come together in every software solution we deliver. Our team of expert engineers uses cutting-edge technology to create scalable, robust applications that bring your vision to life
        </p>
      </div>

      {/* FULL WIDTH RESPONSIVE HERO IMAGE */}
      <div className="w-full overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px]">
          <img
            src="https://www.tanishasystems.com/assets/img/software-engineering.jpg"
            alt="Software Engineering"
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
              Our Software Engineering Services
            </h2>

            <div className="space-y-8 mb-12">
              {/* Custom Software Development */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                Custom Software Solutions
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Our custom software development services are designed to meet your unique business requirements, covering the full development lifecycle. We create scalable, secure solutions that enhance efficiency and provide a competitive advantage.{" "}
                </p>
              </div>

              {/* Enterprise Application Development */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                  Enterprise Application Solutions
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Optimize your operations and maximize productivity through our enterprise application development. Our solutions are powerful, user-friendly, and seamlessly integrate with your current systems.
                </p>
              </div>

              {/* Web and Mobile App Development */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                  Web and Mobile App Development
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Connect with your audience anytime, anywhere through our web and mobile application development services. From responsive websites to native and cross-platform mobile apps, we deliver seamless and engaging user experiences.
                </p>
              </div>

              {/* Cloud Solutions */}
              <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-r-lg">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">
                  Cloud Solutions
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Unlock the full potential of cloud computing with our end-to-end cloud solutions. We help you harness cloud technologies to boost scalability, strengthen security, and optimize costs, whether migrating existing applications or building new cloud-native systems.
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
                    title: "Technical Competence",
                    desc: "With extensive experience and advanced technical skills, our software engineers ensure every project is executed with excellence and optimized performance.",
                  },
                  {
                    title: "Progressive Solutions",
                    desc: "At the cutting edge of technology, we continuously explore emerging tools and techniques to deliver innovative solutions.",
                  },
                  {
                    title: "Collaboration",
                    desc: "By working hand-in-hand with you, we gain a deep understanding of your business needs and craft solutions that are fully aligned with your objectives.",
                  },
                  {
                    title: "Reliability and Dependability",
                    desc: "With a dedication to excellence, we deliver dependable, scalable, and secure software solutions that empower your business to succeed.",
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
