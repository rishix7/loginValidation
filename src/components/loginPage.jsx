import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
   


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchLogin();
        setUsername('');
        setPassword('');
     
    }

    const fetchLogin = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
             if (response.ok) {
                 alert("Login successful!");
                  navigate('/welcome');
          } 
         
          console.log(username);
          
          
             if (response.status === 401) {
              alert("Login failed! Please check your credentials.");
          }   if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.accessToken);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

  return (
    <>
    <h2>Login Page</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
    <div><h3> I don't have an account? <Link to="/">Register</Link></h3></div>
    </>
  )
}

export default  LoginPage
