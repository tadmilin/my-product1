import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/upload');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primaryBlue mb-4">สมัครสมาชิก</h1>
      <div className="max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="อีเมล"
          className="mb-2 block w-full p-2 border border-primaryBlue rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
          className="mb-2 block w-full p-2 border border-primaryBlue rounded"
        />
        <button
          onClick={handleSubmit}
          className="bg-primaryBlue text-red px-4 py-2 rounded bg-blue-700"
        >
          สมัครสมาชิก
        </button>
      </div>
    </div>
  );
};

export default Register;