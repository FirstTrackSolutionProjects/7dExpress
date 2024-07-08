import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Partner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    "/public/images/partners/bluedart.jpeg",
    "/public/images/partners/delhivery.jpeg",
    "/public/images/partners/dhl.jpeg",
    "/public/images/partners/Ecom.png",
    "/public/images/partners/gati.png",
    "/public/images/partners/xpress.jpeg",
  ];

  return (
    <div className=" mx-auto p-4 my-4">
      <div className="text-center mb-6">
        <h2 className="text-sm md:text-2xl font-bold italic text-sky-800">Our Delivery Partners</h2>
        {/*<p className="text-gray-600">Here are some images sliding automatically.</p>*/}
      </div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2 md:mx-20">
            <img src={image} alt={`Slide ${index + 1}`} className="w-72 h-24 md:w-72 md:h-36 rounded shadow" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partner;
