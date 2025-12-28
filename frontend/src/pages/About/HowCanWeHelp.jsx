
import applicationImg from "../../assets/application-management-outsourcing.jpg";
import appIcon from "../../assets/application.png";
import buildtransferImg from "../../assets/build-transfer.jpg";
import buildIcon from "../../assets/build.png";
import businessImg from "../../assets/business-process-outsourcing.jpg";
import businessIcon from "../../assets/business.png";
import fixedcostImg from "../../assets/fixed-cost.jpg";
import fixedIcon from "../../assets/fixed.png";
import helpImg from "../../assets/help.jpg";
import offshoreImg from "../../assets/offshore-team.jpg";
import shoreIcon from "../../assets/shore.png";
import timemeterialImg from "../../assets/time-material.jpg";
import timeIcon from "../../assets/time.png";
import ContactBar from "../../components/ContactBar";


function HowCanWeHelp() { 
  return (
    <div className="w-full">

      {/*section1 */}
      <section className="bg-white text-blue-900 pt-20 px-0 pb-0"> 
  <div className="text-center">
    <h1 className="text-4xl font-bold mt-8 mb-4">How Can We Help?</h1>
    <p className="text-lg text-gray-800 leading-relaxed mb-6 max-w-5xl mx-auto"> 
      Where Technology Meets Business Excellence..
    </p>
  </div>

  <img 
    src={helpImg} 
    alt="How Can We Help Hero" 
    className="w-full h-96 object-cover" 
  />
</section>

{/* section 2 */} 
<section className="bg-gray-200 text-blue-900 px-0">
  <div className="text-center pt-8"> 
    <h1 className="text-3xl font-bold mb-4">
    Our Core Competencies and Solutions
    </h1>
    <p className="text-xl text-gray-800 leading-relaxed max-w-5xl mx-auto pb-8">
    With our specialized services, we help you bring IT solutions to market faster and more efficiently.
    </p>
  </div>
</section>

      {/* section 3 */}
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
        
          <div className="p-6">
              <img 
            src={fixedIcon} 
            alt="Fixed Cost Business Solution" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Fixed Cost Business Solution</h2>
            <p className="text-gray-800 leading-relaxed ">
            The Fixed Price Custom Application Development model is ideal when client requirements are clearly defined, and the client seeks a solution or specific task to be delivered at a fixed price based on the agreed specifications and project plan. Under this model, Global Solutions Tech utilizes a mix of on-site, off-site, or offshore teams, as per the agreement with the client, to ensure the solution is delivered on time and within budget, aligned with the agreed-upon terms.
            </p>
</div>
         

          <img 
            src={fixedcostImg} 
            alt="Fixed Cost Business Solution" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* section 4 */} 
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={timemeterialImg} 
            alt="Time and Material" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
                   <img 
            src={timeIcon} 
            alt="time and material" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Time and Material</h2>
            <p className="text-gray-800 leading-relaxed">
            This model enables clients to request IT professionals from Global Solutions Tech for assignments where work allocation is managed by the client. It is particularly suited for situations where project scope is unclear or accurate estimates are difficult to provide. Resources can be deployed on-site, off-site, or offshore, depending on the client’s needs.
            </p>
          </div>
        </div>
      </section>
      {/*section 5*/}
<section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <div className="p-6">
            <img 
            src={businessIcon} 
            alt="business process outsourcing" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Business Process Outsourcing

</h2>
            <p className="text-gray-800 leading-relaxed">
            Business Process Outsourcing (BPO) is a strategic approach that helps clients enhance performance by controlling costs, minimizing risks, and promoting collaboration. The philosophy behind this model is to allow clients to focus on their core competencies while entrusting Global Solutions Tech to manage non-core business processes.
            </p>
</div>
         

          <img 
            src={businessImg} 
            alt="Business Process Outsourcing" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/*section 6*/}
         <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={applicationImg} 
            alt="Application Management Outsourcing" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
              <img 
            src={appIcon} 
            alt="application management outsourcing" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Application Management Outsourcing</h2>
            <p className="text-gray-800 leading-relaxed">
            Clients can focus on developing innovative technology solutions while Global Solutions Tech' offshore infrastructure team handles the management and support of your applications in both production and testing environments. This approach provides better value for each IT dollar spent, access to global expertise, and the benefit of 24/7 support due to time zone differences.
            </p>
          </div>
        </div>
      </section>
      {/* section 7 */}
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <div className="p-6">
          <img 
            src={buildIcon} 
            alt="build and transfer" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Build and Transfer

</h2>
            <p className="text-gray-700 leading-relaxed">
            The complete application or solution is developed and deployed for a specific client, with the responsibility for ongoing management transferred to the client upon successful delivery.
            </p>
</div>
         

          <img 
            src={buildtransferImg} 
            alt="Build and Transfer" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* section 9 */}

     
    
      <section className="py-0 px-0">
        <div className="w-full grid md:grid-cols-2 gap-0 items-center">
          <img 
            src={offshoreImg} 
            alt="Offshore Infrastructure Management" 
            className="w-full h-full object-cover order-1 md:order-0"
          />

          <div className="p-6">
              <img 
            src={shoreIcon} 
            alt="Offshore Infrastructure Management" 
            className="w-20 h-20 mb-6 py-1 px-1"
          />
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Off-Shore Delivery Center</h2>
            <p className="text-gray-800 leading-relaxed">
            In this model, Global Solutions Tech offers clients a dedicated team or set of resources for a specified period at a fixed cost. Clients have the flexibility to utilize the team as needed while Global Solutions handles all logistics and operations.
            </p>
          </div>
        </div>
      </section>
      {/* section 9 */}
       <ContactBar />
    </div>
  );
}

export default HowCanWeHelp ; 