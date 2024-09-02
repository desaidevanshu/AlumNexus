import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegister ? '/auth/register' : '/auth/login';
        try {
            const response = await axios.post(url, { email, password});
            localStorage.setItem('token', response.data.token);
            // Redirect to dashboard or home page

            // Clear the input fields
            setEmail('');
            setPassword('');
            alert("Successfully login");
        } catch (error) {
            console.error('Authentication failed:', error.response.data);
            alert("Authentication failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
               

                <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
            </form>
            <button className="toggle-auth" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
};

export default Auth;
