const Footer = () =>{
    return(
        <>
            <footer className=" font-bold text-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">7D EXPRESS</h2>
            <p>Delivering excellence in logistics solutions worldwide. Your reliable partner for international and domestic shipping services.</p>
          </div>
          
          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Services</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="mb-2">1234 Street Name, City, State, 12345</p>
            <p className="mb-2">Email: info@abc.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} First Track Solution Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
        </>
    )
}

export default Footer;