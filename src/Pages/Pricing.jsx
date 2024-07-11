// src/components/Form.js

import React from 'react';
import Calculator from '../Components/Calculator';

const Pricing = () => {
  return (
    <div className=''>
    
      <div className="text-sky-950 text-2xl md:text-4xl text-center py-5">Calculate Your Shipping Price</div>
      <div className="mx-6 md:mx-80 mb-5">
      <Calculator/>
    </div>
    </div>
  );
}

export default Pricing;
