const teamMembers = [
    {
      name: 'Secure Delivery',
      role: '',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Secure delivery and easy payments.',
    },
    {
      name: 'Shipping',
      role: '',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'One stop solution for all shipping needs.',
    },
    {
      name: 'Easy assistance',
      role: '',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'User Friendly Client Panel',
    },
  ];
  
  const About = () => {
    return (
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <p className="text-center mb-12 text-lg">
            We are a leading logistics company dedicated to providing reliable and efficient shipping solutions both domestically and internationally.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
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