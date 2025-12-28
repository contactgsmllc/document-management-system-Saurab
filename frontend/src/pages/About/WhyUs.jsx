
import deliveryImg from "../../assets/delivery.jpg";
import eliteworkImg from "../../assets/elite-workforce.jpg";
import deliveryIcon from "../../assets/fastdelivery.png";
import highqualityImg from "../../assets/high-quality-solutions.jpg";
import leadershipImg from "../../assets/leaderships.jpg";
import outstandingImg from "../../assets/outstanding-service.jpg";
import rankingIcon from "../../assets/ranking.png";
import serviceIcon from "../../assets/service.png";
import teamleaderIcon from "../../assets/teamleader.png";
import whyusImg from "../../assets/whyus.jpg";
import workforceIcon from "../../assets/workforce.png";
import ContactBar from "../../components/ContactBar";

function WhyUs() { 
  return (
    <div className="w-full">

      {/*section1 */}
      <section className="bg-white text-blue-900 pt-20 px-0 pb-0"> 
  <div className="text-center">
    <h1 className="text-4xl font-bold mt-8 mb-4">Why Us?</h1>
    <p className="text-lg text-gray-800 leading-relaxed mb-6 max-w-5xl mx-auto"> 
    Global Solutions Tech provides excellent Custom Application solutions, Outsourcing & Co-Sourcing, IT Services, and Business Process Outsourcing (BPO) solutions. By combining cutting-edge technology, and a skilled workforce, we deliver maximum value for your IT investments. Our approach emphasizes streamlined development processes, optimal tool selection, and high-quality talent to ensure efficiency, innovation, and measurable results.
    </p>
  </div>

  <img 
    src={whyusImg} 
    alt="Why Us Hero" 
    className="w-full h-96 object-cover" 
  />
</section>

{/* section 2 */} 
<section className="bg-gray-200 text-blue-900 px-0">
  <div className="text-center pt-8"> 
    <h1 className="text-3xl font-bold mb-4">
    What Sets Global Solutions Tech Apart
    </h1>
    <p className="text-xl text-gray-800 leading-relaxed max-w-5xl mx-auto pb-8">
    We stand by our commitments, ensuring that every promise we make is fulfilled with excellence.
    </p>
  </div>
</section>

      {/* section 3 */}
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
        
          <div className="p-6">
              <img 
            src={rankingIcon} 
            alt="Ranking" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Exemplary Service</h2>
            <p className="text-gray-800 leading-relaxed ">
            Our competitive advantage is rooted in our flexible, client-centric Global Engagement Model. By prioritizing collaboration, communication, and adherence to IT best practices, we deliver performance-driven solutions that align with our clients’ specific needs.
            </p>
</div>
         

          <img 
            src={outstandingImg} 
            alt="Outstanding Service" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* section 4 */} 
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={eliteworkImg} 
            alt="Elitework force" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
                   <img 
            src={workforceIcon} 
            alt="workforce" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Skilled Professionals</h2>
            <p className="text-gray-800 leading-relaxed">
            We employ a network of top-tier IT professionals, handpicked to address the unique and complex IT challenges of our clients. Our team consists of technology specialists, industry experts, and experienced management professionals with years of expertise in developing solutions for businesses.
            </p>
          </div>
        </div>
      </section>
      {/*section 5*/}
<section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <div className="p-6">
            <img 
            src={serviceIcon} 
            alt="service" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Reliable Solutions

</h2>
            <p className="text-gray-800 leading-relaxed">
            At Global Solutions Tech, we’re committed to delivering impactful solutions that drive value. By leveraging our deep expertise, we create customized solutions that address unique business challenges.
            </p>
</div>
         

          <img 
            src={highqualityImg} 
            alt="High quality solutions" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/*section 6*/}
         <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={deliveryImg} 
            alt="Delivery" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
              <img 
            src={deliveryIcon} 
            alt="delivery" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Provide timely and cost-effective solutions</h2>
            <p className="text-gray-800 leading-relaxed">
            We honor our commitments, delivering what we promise, when we promise. We consistently achieve on-time, on-budget results, and often go beyond expectations.
            </p>
          </div>
        </div>
      </section>
      {/* section 7 */}
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <div className="p-6">
          <img 
            src={teamleaderIcon} 
            alt="teamleader" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Expertise & Leadership

</h2>
            <p className="text-gray-700 leading-relaxed">
            We consistently design, develop, and deliver superior solutions to our clients' needs. With deep expertise and specialized solutions, Global Solutions Tech creates significant value for each client.
            </p>
</div>
         

          <img 
            src={leadershipImg} 
            alt="Leadership" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* section 8 */}

      <ContactBar />
    </div>
  );
}

export default WhyUs; 