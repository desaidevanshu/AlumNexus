import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error.response.data);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blog-list">
            <h2>Blog Posts</h2>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog._id} className="blog-item">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <div className="blog-meta">
                            <span className="author">{blog.author}</span> | 
                            <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No blog posts available.</p>
            )}
        </div>
    );
};

export default BlogList;
