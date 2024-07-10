// Blogs.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const blogs = [
  {
    id: 1,
    title: 'The Future of Shipping: Trends to Watch in 2024',
    image: 'images/blog1.jpg',
    content: 'The shipping industry is evolving rapidly with advancements in technology and changing consumer demands. In 2024, several trends are set to shape the future of shipping.',
  },
  {
    id: 2,
    title: 'How to Choose the Right Shipping Service for Your Business',
    image: 'images/blog2.jpg',
    content: 'Identify your shipping needs, including package size, weight, destination, and delivery speed. Different services cater to different requirements.',
  },
  {
    id: 3,
    title: 'The Importance of Packaging in Shipping: Best Practices',
    image: 'images/blog3.jpg',
    content: 'Proper packaging is vital to ensure the safety and integrity of your shipments.Following these best practices will help you avoid shipping issues and ensure your products reach their destination in perfect condition.',
  },
  // Add more blogs as needed
];

const Blogs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="bg-bg-about bg-cover p-6 md:py-12">
        <div className="container bg-white bg-opacity-40 rounded-md py-6 mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="cursor-pointer bg-white p-4 rounded shadow" onClick={() => openModal(blog)}>
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover mb-4 rounded" />
            <h2 className="text-xl font-bold">{blog.title}</h2>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        {selectedBlog && (
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 overflow-auto max-h-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">{selectedBlog.title}</h2>
            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-2/6 h-2/5 mx-auto mb-4 rounded " />
            <p className="text-xxl mb-4 text-center">{selectedBlog.content}</p>
          </div>
        )}
      </Modal>
    </div>
    </div>
  );
};

export default Blogs;
