
const AboutServicesSection = () => {
  const services = [
    {
      title: "Enterprise IT Solutions",
      desc: "provide comprehensive, scalable, and secure technology frameworks that empower organizations to streamline operations, enhance collaboration, and drive digital transformation.",
      icon: "🏢",
    },
    {
      title: "Mobile Application Solutions",
      desc: "Ready to extend your market presence and improve customer interaction? We provide customized mobile application development solutions designed to address your specific business requirements and drive growth.",
      icon: "📱",
    },
    {
      title: "Custom Application Solutions",
      desc: "Seeking to enhance your technology and simplify business workflows? Our custom application development solutions are crafted to meet your business's unique requirements.",
      icon: "🛠️",
    },
    {
      title: "Marketing-Friendly Solutions",
      desc: "Streamline your processes, improve efficiency, and scale your operations through advanced technology. Our solutions are designed to support your business with the tools you need to succeed in the digital age.",
      icon: "📈",
    },
  ];

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* LEFT SECTION */}
        <div className="flex flex-col space-y-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-[2px] bg-blue-900"></div>
            <span className="text-lg font-semibold text-blue-900 tracking-wide">About Us</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            We are a trusted provider of custom applications and full-cycle IT solutions.
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
          Global Solutions Tech is at the forefront of IT services, offering cutting-edge, customized solutions that enable businesses to thrive in a fast-evolving digital era. With our extensive knowledge and client-first approach, we empower organizations to streamline operations, optimize IT infrastructure, and achieve their key objectives.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 bg-blue-900 rounded-full"></div>
              <span className="text-xl font-bold text-gray-900">Our Mission</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
            Our mission is to empower businesses by harnessing the power of advanced technology, driving innovation, and delivering unmatched value through our full suite of IT services. We are committed to helping our clients stay competitive, improve operational efficiency, and sustain growth in the evolving digital landscape.
            </p>
          </div>

          <button className="group w-fit bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2">
            Read More
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* RIGHT SECTION – CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-blue-200 group-hover:border-blue-500 transition-colors duration-300 rounded-br-lg"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutServicesSection;