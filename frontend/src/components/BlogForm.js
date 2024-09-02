import React, { useState } from 'react';
import axios from 'axios';


const BlogForm = ({ onBlogCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/blogs/create', {
                title,
                content,
                author,
            });

            // Clear the form fields
            setTitle('');
            setContent('');
            setAuthor('');

            // Notify parent component about the new blog post
            onBlogCreated(response.data);

            // Show success message
            setSuccessMessage('Blog post created successfully!');
            setErrorMessage('');

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error creating blog post:', error.response.data);
            setErrorMessage('Failed to create blog post. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="blog-form">
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {successMessage && <div className="alert success">{successMessage}</div>}
            {errorMessage && <div className="alert error">{errorMessage}</div>}
        </div>
    );
};

export default BlogForm;
