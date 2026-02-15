import { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    // { label: "Clients", value: 232, suffix: "+" },
    // { label: "Projects", value: 1057, suffix: "+" },
    // { label: "Hours Of Support", value: 14357, suffix: "+" },
    // { label: "Workers", value: 1181, suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const CountUpAnimation = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <>{count}</>;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-200 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Stats Grid */}
      <div className="relative max-w-6xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${idx * 0.1}s both` : 'none'
              }}
            >
              {/* Card */}
              <div className="relative bg-white border border-blue-100 rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-500 hover:scale-105">
                
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* Number */}
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold text-blue-900 mb-2">
                    {isVisible ? <CountUpAnimation end={stat.value} /> : "0"}
                    <span className="text-cyan-500">{stat.suffix}</span>
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-700 text-lg font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-200 group-hover:border-blue-500 transition-colors duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;