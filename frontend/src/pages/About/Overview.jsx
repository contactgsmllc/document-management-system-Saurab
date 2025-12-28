


import React from "react";
import StatsSection from "../../components/StatsSection"; 
import ContactBar from "../../components/ContactBar";
import heroImg from "../../assets/hero.jpg";
import missionImg from "../../assets/mission.jpg";
import visionImg from "../../assets/Vision.jpg";


function About() {
  return (
    <div className="w-full">

      {/* section  hero overview */}
      <section className="bg-white text-blue-900 py-20 px-0">
    
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 m-6 ">Overview</h1>
            <p className="text-lg  text-gray-800 leading-relaxed mb-8 m-4 ">
              We are a trusted leader in custom applications and full-cycle IT solutions.
            </p>
   
          </div>

          <img src={heroImg} alt="About Hero" className="w-full  h-130 object-cover" />
      </section>







{/* section 2 */} 
<section className="bg-white text-blue-900 py-0 px-0 ">
  <div className="text-center">
<h1 className="text-4xl font-bold mb-8">
   Behind every success is our team of experts.
    </h1>
    <p className="text-lg text-gray-800 leading-relaxed mb-8 m-4 max-w-5xl mx-auto ">
    Delivering on our promises is at the heart of everything we do. Our vision is to advance human quality of life through relentless innovation in business and technology practices.
    </p>
  </div>

</section>
{/* section 3 stats */}
<StatsSection />
{/*section 4*/}
      <section className="py-0 px-0">
  <div className="w-full grid md:grid-cols-2 gap-0 items-center">
    
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Commitment</h2>
      <p className="text-gray-700 leading-relaxed">
      Our mission is to help organizations achieve their goals by providing customized IT solutions, exceptional service, and continuous support that ensures success in a rapidly evolving digital world.
      </p>

      <ul className="list-disc list-inside text-gray-700 py-5 px-6">
        <li className="text-gray-700 m-1">Drive clients toward their strategic objectives.</li>
        <li className="text-gray-700 m-1">Leading the Way in IT Solutions and Service Excellence</li>
        <li className="text-gray-700 m-1">Enabling growth and transformation through collaboration</li>
      </ul>
    </div>

    <img 
      src={missionImg} 
      alt="Mission" 
      className="w-full h-full object-cover"
    />

  </div>
</section>



    {/*section 5*/} 
<section className="py-0 px-0">
  <div className="w-full grid md:grid-cols-2 gap-0 items-center">

    <img 
      src={visionImg} 
      alt="Vision" 
      className="w-full h-full object-cover order-1 md:order-0"
    />

    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Aspiration</h2>
      <p className="text-gray-700 leading-relaxed">
      Our vision is to drive the rapid execution of our growth strategy while strengthening our brand with clients, communities, and employees. In every engagement, we aim to build lasting, strategic relationships, guided by a client-centric approach that shapes how we operate and deliver value. We aspire to be the world’s leading IT delivery company, combining unmatched expertise and industry-wide capabilities to provide innovative solutions in close collaboration with our clients.
      </p>
    </div>

  </div>
</section>
{/*section 6 */}
   <ContactBar />

 

</div>
  );
}

export default About;
