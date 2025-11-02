import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



import { useState } from "react";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    fetchRegister();
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    navigate('/login');
    alert("Registration successful!");
  };

  const fetchRegister = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
    </form>
    <div><h3> I already have an account? <Link to="/login">Login</Link></h3></div>
    </>
  )
}

export default RegisterPage;
