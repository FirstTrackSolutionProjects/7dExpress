const API_URL = import.meta.env.VITE_APP_API_URL
const teamMembers = [
    {
      name: 'Secure Delivery',
      role: '',
      imageUrl: "images/bg1.jpg",
      description: 'Secure delivery and easy payments.',
    },
    {
      name: 'Shipping',
      role: '',
      imageUrl: "images/bg2.jpg",
      description: 'One stop solution for all shipping needs.',
    },
    {
      name: 'Easy assistance',
      role: '',
      imageUrl: "images/bg1.jpg",
      description: 'User Friendly Client Panel',
    },
  ];
  
  const About = () => {
    return (
      <div className="bg-bg-about bg-cover p-6 md:py-12">
        <div className="container bg-white rounded-md py-6 mx-auto px-4">
          <div className="text-2xl md:text-4xl font-bold text-center m-5">Who We Are</div>
          <div className="text-lg md:text-xl text-left m-5">
            Welcome to 7D EXPRESS, your reliable partner in efficient and secure delivery services. Our mission is to provide seamless, dependable, and cost-effective shipping solutions to meet all your logistics needs.
            We are a leading logistics company dedicated to providing reliable and efficient shipping solutions all over nation.
          </div>
          <div className="text-lg md:text-xl text-left m-5">
          7D EXPRESS was born out of a passion for enhancing the delivery experience. 
          Over the years, we have grown from a small local courier service to a nationwide logistics provider. Our dedication to innovation, customer satisfaction, and continuous improvement has been the driving force behind our expansion and success.
        </div>
          </div>



          <div className="container bg-white rounded-md mt-24 mx-auto py-5 px-4">
          <div className="text-2xl md:text-4xl font-bold text-center ">Why 7D Express</div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden my-3 md:my-10 mx-5 ">
                <img className="w-full h-48 object-cover" src={member.imageUrl} alt={member.name} />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                  {/*<h3 className="text-xl text-gray-700 mb-4">{member.role}</h3>*/}
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
          </div>



          


      </div>
    );
}
    
    export default About;