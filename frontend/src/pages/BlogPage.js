import React, { useState } from 'react';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    const handleBlogCreated = (newBlog) => {
        setBlogs([newBlog, ...blogs]);
    };

    return (
        <div className="blog-page">
            <BlogForm onBlogCreated={handleBlogCreated} />
            <BlogList />
        </div>
    );
};

export default BlogPage;
