import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


import './Login.css';
import imges from '../../assets/loginimgg.jpg';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
if (isLogin) {
  const res = await axios.post('http://localhost:5000/api/login', {
    email: formData.email,
    password: formData.password
  });

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('role', res.data.role);
  localStorage.setItem('username', res.data.username);

//   Swal.fire({
//   title: 'Login Successful!',
//   text: 'Welcome back!',
//   icon: 'success',
//   showConfirmButton: false,
//   timer: 2000,
//   background: '#1e1e1e',       // Dark background
//   color: '#ffffff',            // White text
//   iconColor: '#4caf50'         // Optional: success tick color (green)
// });

Swal.fire({
    title: 'Login Successful!',
    text: 'Welcome back!',
    icon: 'success',
    showConfirmButton: false,
    timer: 2000
  });

  window.dispatchEvent(new Event("userLoggedIn"));
  navigate('/');
}



    else {
  // 🧑‍💼 Register API
  const res = await axios.post('http://localhost:5000/api/register', {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    role: 'user' // default role
  });

  Swal.fire({
    title: 'Registered Successfully!',
    // html: `Customer ID: <strong>${res.data.customer_id}</strong>`,
    icon: 'success',
    confirmButtonText: 'OK',
  });

  setIsLogin(true); // Redirect to login screen
}

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Something went wrong 😢');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <img src= {imges} alt="Food" />
        </div>
        <div className="login-right">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                {/* <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required /> */}
              </>
            )}
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {/* <div className="remember-forgot">
              <label><input type="checkbox" /> Remember me</label>
              {isLogin && <span>Forgot Password?</span>}
            </div> */}
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Sign Up" : " Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
