import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css"

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/signup', { username, password });
            alert('User created successfully');
            window.location.replace("/login");
        } catch (error) {
            console.error(error);
            alert('Failed to create user');
        }
    };

    return (
        <div className='signupPage'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
