import React, { useState } from 'react';
import axios from 'axios';
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

  // 🔔 Success message
  alert("Login successfully ✅");

  // 🔄 Fire custom event for header update
  window.dispatchEvent(new Event("userLoggedIn"));
}

       else {
        // 🧑‍💼 Register API
        const res = await axios.post('http://localhost:5000/api/register',{
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: 'user' // default role
        });

        alert(`Registered successfully ✅\nCustomer ID: ${res.data.customer_id}`);
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
