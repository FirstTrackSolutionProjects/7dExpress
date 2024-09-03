import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_APP_API_URL
const AutoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    
    //slide 1
    <div className="grid grid-cols-2 gap-0 mt-5 md:-mt-5">
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                    <img src="images/textile.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
                <div className="flex-col  justify-center h-36 md:h-52">
                <div className="text-[10px] md:text-lg text-sky-950 my-5 mx-1 text-center">Streamlining Textile and Garment Logistics with Precision, Efficiency, and Industry Expertise</div>
                <div className="text-md md:text-3xl text-yellow-500 text-center">Textile & Garments</div>
                </div>
                <div className="flex-col justify-center h-36 md:h-52">
                <div className="text-[10px] md:text-lg text-sky-950 my-5 mx-1 text-center">Reliable pharmaceutical logistics ensuring safe, timely, and efficient delivery of critical medications</div>
                <div className="text-md md:text-3xl text-yellow-500 text-center">Pharmaceuticals</div>
                </div>
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                <img src="images/pharma.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
            </div>,

            //slide 2
            <div className="grid grid-cols-2 gap-0 mt-5 md:-mt-5">
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                    <img src="images/cosmetics.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
                <div className="flex-col  justify-center h-36 md:h-52">
                <div className="text-[10px] md:text-lg text-sky-950 my-5 mx-1 text-center">Efficient solutions antailored for cosmetics, ensuring seamless delivery and exceptional service.</div>
                <div className="text-md md:text-3xl text-yellow-500 text-center">Cosmetics</div>
                </div>
                <div className="flex-col justify-center h-36 md:h-52">
                <div className="text-[10px] md:text-lg text-sky-950 my-5 mx-1 text-center">Streamlining your stationery supply chain with efficient, reliable logistics solutions tailored to your needs</div>
                <div className="text-md md:text-3xl text-yellow-500 text-center">Stationery</div>
                </div>
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                <img src="images/stationery.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
            </div>,

            //slide 3
            <div className="grid grid-cols-2 gap-0 mt-5 md:-mt-5">
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                    <img src="images/computer.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
                <div className="flex-col  justify-center h-36 md:h-52">
                <div className="text-[10px] md:text-lg text-sky-950 my-5 mx-1 text-center">Efficiently tailored for IT with cutting-edge solutions for seamless technology management.</div>
                <div className="text-md md:text-3xl text-yellow-500 text-center">IT & Peripherals</div>
                </div>
                <div className="flex-col justify-center h-36 md:h-52">
                <div className="text-[10px] md:text-lg text-sky-950 mt-5 mb-1 mx-1 text-center">Streamlining your electrical and electronic industry with precision and expertise to power your success.</div>
                <div className="text-md md:text-3xl text-yellow-500 text-center">Electronic & Electricals</div>
                </div>
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                <img src="images/electronic.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
            </div>

  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); 

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
