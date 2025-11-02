import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [name, setName] = useState(''); // 👈 this triggers re-render when updated
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/users/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Current user:', data);

        // Adjust this depending on how your backend sends the data
        setName(data.user?.username || 'User');
      } else {
        console.error('Failed to fetch current user');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome, {name || '...'}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
