import {
  BarChart3,
  Briefcase,
  CalendarCheck,
  CheckCircle,
  ClipboardList,
  Sun,
} from "lucide-react";

const items = [
  {
    title: "Competence",
    desc: "We leverage the latest advancements in cloud computing, AI, and automation to deliver forward-thinking solutions that create measurable business value.",
    icon: Briefcase,
  },
  {
    title: "Client-Focused",
    desc: "We place our clients' needs and goals at the forefront, working closely with them to create solutions that align with their business objectives and deliver tangible results.",
    icon: ClipboardList,
  },
  {
    title: "Leadership in Innovation through Technology",
    desc: "We are dedicated to staying ahead of technological trends and consistently innovating our services to empower our clients to navigate evolving challenges and seize new opportunities in the digital space.",
    icon: BarChart3,
  },
  {
    title: "Quality and Dependability",
    desc: "We deliver high-quality, dependable IT services, maintaining excellence and ensuring our clients' satisfaction at every step.",
    icon: CheckCircle,
  },
  {
    title: "Client Training and Coaching",
    desc: "Our services offer personalized training sessions that help your team master new technologies, improve their workflow, and align with industry best practices. Empower your team with the knowledge and skills necessary to maximize the use of your technology and business solutions.",
    icon: Sun,
  },
  {
    title: "Demonstrated Success",
    desc: "Our demonstrated success is built on a foundation of delivering impactful results for our clients. Through a combination of innovative solutions, strategic execution, and dedicated support, we've consistently met and surpassed objectives, enabling businesses to achieve their goals and grow sustainably.",
    icon: CalendarCheck,
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-900"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Why Choose Global Solutions Tech
            </h2>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-blue-900"></div>
          </div>

          {/* Sub Heading */}
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed mt-6">
          From IT consulting and IT Solutions to software development and cloud services, we offer a comprehensive range of solutions that cover all aspects of your technology needs.
          <br />
          We leverage the latest technologies to help you stay ahead of the competition, fostering growth
          </p>
        </div>

        {/* Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
