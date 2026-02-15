
const services = [
  {
    title: "AI",
    img: "https://www.tanishasystems.com/assets/img/ai-generated-8531013_1280.jpg",
    link: "/services",
  },
  {
    title: "Consulting",
    img: "https://www.tanishasystems.com/assets/img/businessman-4661727_1280.jpg",
    link: "/services/consulting",
  },
  {
    title: "SaaS",
    img: "https://www.tanishasystems.com/assets/img/saas.jpeg",
    link: "/services/software-engineering",
  },
  {
    title: "E-commerce Solutions",
    img: "https://www.tanishasystems.com/assets/img/internet-of-things-7107054_1280.jpg",
    link: "/services",
  },
  {
    title: "Custom Software",
    img: "https://www.tanishasystems.com/assets/img/cyber-security-1805632_1280.png",
    link: "/services",
  },
  {
    title: "Cloud Solutions",
    img: "https://www.tanishasystems.com/assets/img/cloud-computing-2001090_1280.jpg",
    link: "/services/cloud-solution",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-900"></div>
            <h2 className="text-5xl font-bold text-gray-900">Services</h2>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-blue-900"></div>
          </div>

          {/* Description */}
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Global Solutions Tech strives to transform businesses by applying cutting-edge technology, sparking innovation, and offering unparalleled value with our diverse IT services. Our focus is on helping clients stay competitive, boost efficiency, and achieve growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>

              {/* Title Overlay - Always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                  {service.title}
                </h3>
                
                {/* Explore text - slides up on hover */}
                <div className="flex items-center gap-2 text-blue-400 font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span>Explore Service</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;