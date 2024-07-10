import { Link } from 'react-router-dom'

const Footer = () =>{

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

    return(
        <>
            <footer className=" bg-sky-950 font-bold text-gray-300 py-8">
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap ">
      
         {/* Company Info */}
         <div className="w-full md:w-1/4 mb-6 md:mb-0 ">
            <h2 className="text-xl font-bold mb-4 hover:underline">7D EXPRESS</h2>
            <p className='pr-4'>Delivering excellence in logistics solutions entire PAN India.<br/> Your reliable partner for domestic shipping services.</p>
          </div>

            
          {/* Navigation Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0 justify-center">
            <h2 className="text-xl font-bold mb-4 hover:underline">Quick Links</h2>
            <ul>
              <li><Link to="/faq" onClick={scrollToTop} className="text-gray-300">FAQs</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="text-gray-300 ">About Us</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="text-gray-300 ">Contact Us</Link></li>
              <li><Link to="/privacy" onClick={scrollToTop} className="text-gray-300 ">Privacy & Policy</Link></li>
              <li><Link to="/terms" onClick={scrollToTop} className="text-gray-300 ">Terms of Use</Link></li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4 hover:underline">Contact Us</h2>
            <p className="mb-2">Room No 356, Floor -G, Shahid<br/>Bhagat Singh Nagar, Sant Gora,<br/>Kumbhar Road, 5th Kumbharwada,<br/>Sec 2, Dharavi, Mumbai, Maharashtra, India-400017</p>
            <p className="mt-3 mb-8 md:-mb-4">Email:  info@7dexpress.com </p>
          </div>
        

        {/* Available services */}
        <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-4 hover:underline">Available services</h2>
            <p className="mb-2">E-Commerce Delivery</p>
            <p className="mb-2">Pickup & Drop </p>
            <p className="mb-2">Packaging </p>
            <p className="mb-2">Domestic Services </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p>Copyright &copy; {new Date().getFullYear()} Developed by First Track Solution Technologies.</p>
        </div>
      </div>
    </footer>
        </>
    )
}

export default Footer;