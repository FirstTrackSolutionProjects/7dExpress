import React from 'react';

const blogPosts = [
  {
    title: 'The Future of Logistics: Trends to Watch',
    date: 'July 5, 2024',
    author: 'Jane Doe',
    summary: 'Discover the top trends shaping the future of logistics, from automation to sustainability.',
    imageUrl: "/src/assets/images/image1.jpg",
  },
  {
    title: 'How Technology is Revolutionizing Supply Chain Management',
    date: 'June 20, 2024',
    author: 'John Smith',
    summary: 'Learn how the latest technologies are transforming supply chain management for businesses.',
    imageUrl: "/src/assets/images/image1.jpg",
  },
  {
    title: 'Best Practices for Efficient Warehouse Operations',
    date: 'June 10, 2024',
    author: 'Emily Johnson',
    summary: 'Explore the best practices for improving efficiency and productivity in warehouse operations.',
    imageUrl: "/src/assets/images/image1.jpg",
  },
  // Add more blog posts as needed
];

const BlogCard = ({ post }) => {
  return (
    <div className="bg-cyan-500 bg-opacity-20 rounded-lg shadow-md overflow-hidden">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-4">By {post.author} on {post.date}</p>
        <p className="text-gray-700">{post.summary}</p>
      </div>
    </div>
  );
};

const Blogs = () => {
  return (
    <div className=" bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-cyan-500 bg-opacity-20 p-2 rounded-lg ">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {blogPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
