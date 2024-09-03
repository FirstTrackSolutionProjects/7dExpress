import React, { useState } from 'react';
const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'Our return policy allows you to return items within 30 days of purchase for a full refund.'
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by logging into your account and visiting the "Orders" section.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping to most countries. Shipping fees may vary based on the destination.'
  },
];

const FAQ = ({ faq, index, toggleFAQ }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="w-full text-left focus:outline-none"
        onClick={() => toggleFAQ(index)}
      >
        <h3 className="text-lg font-semibold text-gray-700 flex justify-between items-center">
          {faq.question}
          <span>{faq.open ? '-' : '+'}</span>
        </h3>
      </button>
      {faq.open && <p className="mt-2 text-gray-600">{faq.answer}</p>}
    </div>
  );
};

const FAQs = () => {
  const [faqsList, setFaqsList] = useState(faqs.map(faq => ({ ...faq, open: false })));

  const toggleFAQ = index => {
    setFaqsList(faqsList.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqsList.map((faq, index) => (
          <FAQ key={index} faq={faq} index={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
