import React from "react";

import ContactBar from "../../components/ContactBar";
import qualitypolicyImg from "../../assets/quality-policy.jpg";
import trustintegrityImg from "../../assets/trust-integrity.jpg"
import trustIcon from "../../assets/trust.png";
import commitementImg from "../../assets/commitement.jpg";
import commitementIcon from"../../assets/commitment.png";
import customersatisafactionImg  from"../../assets/customer-satisfaction.jpg";
import  customerIcon from"../../assets/customer.png";
import  openenvImg from"../../assets/open-environment.jpg";
import envIcon from"../../assets/environment.png";
import respectindImg from"../../assets/respect-individuals.jpg";
import respectIcon from"../../assets/respect.png";

function QualityPolicy() { 
  return (
    <div className="w-full">

      {/*section1 */}
      <section className="bg-white text-blue-900 pt-20 px-0 pb-0"> 
  <div className="text-center">
    <h1 className="text-4xl font-bold mt-8 mb-4">Quality Policy</h1>
    <p className="text-lg text-gray-800 leading-relaxed mb-6 max-w-5xl mx-auto"> 
    We aim to be proactive leaders, fostering a dynamic environment that drives customer insights in every transaction by continuously aligning our business strategies and capabilities.
    </p>
  </div>

  <img 
    src={qualitypolicyImg} 
    alt="Quality Policy" 
    className="w-full h-96 object-cover" 
  />
</section>

{/* section 2 */} 
<section className="bg-gray-200 text-blue-900 px-0">
  <div className="text-center pt-8"> 
    <h1 className="text-3xl font-bold mb-4">
      Global Solutions Tech's Quality Policy
  </h1>
    <p className="text-xl text-gray-800 leading-relaxed max-w-5xl mx-auto pb-8">
    At Global Solutions Tech, our core values drive our vibrant work culture. Built on our dedication to quality, these values influence everything from how we collaborate to the decisions we make.
    </p>
  </div>
</section>

      {/* section 3 */}
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
        
          <div className="p-6">
              <img 
            src={trustIcon} 
            alt="Trust" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Trust and Integrity</h2>
            <p className="text-gray-800 leading-relaxed ">
            At the core of our business is the value of intellectual capital, driven by human connections. Trust is fundamental to navigating this dynamic space, and we believe our success grows with the trust we cultivate among ourselves. We remain committed to upholding our promises and acting responsibly in every relationship.
            </p>
          </div>
         

          <img 
            src={trustintegrityImg} 
            alt="trust integrity" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* section 4 */} 
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={commitementImg} 
            alt="Commitement" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
                   <img 
            src={commitementIcon} 
            alt="commitement" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Commitment and Professionalism</h2>
            <p className="text-gray-800 leading-relaxed">
            As a people-focused company, we uphold the highest standards of professionalism. We achieve excellence through collaboration, mutual respect, and addressing challenges with courage and integrity. We go beyond our commitments to deliver exceptional results, reflecting our dedication to ethical and principled business practices.
            </p>
          </div>
        </div>
      </section>
      {/*section 5*/}
<section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <div className="p-6">
            <img 
            src={customerIcon} 
            alt="customer" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Relentless quest for customer satisfaction

</h2>
            <p className="text-gray-800 leading-relaxed">
            We place the utmost importance on customer satisfaction, dedicating ourselves to meeting their needs with the highest level of service. Our commitment is reflected in the exceptional, responsive, and efficient solutions we provide. Our business exists because of our clients, and we are driven to serve them with the highest-quality offerings and solutions.
            </p>
</div>
         

          <img 
            src={customersatisafactionImg} 
            alt="Customer Satisfaction" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/*section 6*/}
         <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={openenvImg} 
            alt="Environment" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
              <img 
            src={envIcon} 
            alt="environment" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Open Environment</h2>
            <p className="text-gray-800 leading-relaxed">
            We prioritize listening and learning in every interaction, embracing change and respecting diverse viewpoints. We actively look for ways to improve processes and encourage diverse input for innovation.
            </p>
          </div>
        </div>
      </section>
      {/* section 7 */}
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <div className="p-6">
          <img 
            src={respectIcon} 
            alt="respect" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Respect for Individuals
            </h2>
            <p className="text-gray-700 leading-relaxed">
            This value is not just something we speak about; it is the core principle we live by. It is deeply ingrained in our organization, and we stand by it unconditionally. Regardless of belief systems, gender, sexual orientation, race, religion, or national origin, this will never be compromised. We believe that all individuals deserve to be treated with the maturity and respect they deserve.
            </p>
          </div>
         

          <img 
            src={respectindImg} 
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

export default QualityPolicy; 