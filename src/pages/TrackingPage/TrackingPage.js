import React from 'react';
import './TrackingPage.css';
import { FaCheck, FaMapMarkerAlt, FaCreditCard, FaUtensils, FaClock } from 'react-icons/fa';

const TrackingPage = () => {
  const currentStatus = 'Out for Delivery';

  const orderSteps = [
    { title: 'Order Placed', time: '10:30 AM', icon: <FaClock /> },
    { title: 'Preparing', time: '10:45 AM', icon: <FaUtensils /> },
    { title: 'Out for Delivery', time: '11:15 AM', icon: <FaMapMarkerAlt /> },
    { title: 'Delivered', time: '', icon: <FaCheck /> },
  ];

  const getStatusClass = (step) => {
    const flow = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    return flow.indexOf(step) <= flow.indexOf(currentStatus) ? 'active' : '';
  };

  return (
    <div className="track-wrapper">
      <h2>📦 Order Tracking</h2>

      <div className="timeline">
        {orderSteps.map((step, index) => (
          <div key={index} className={`timeline-step ${getStatusClass(step.title)}`}>
            <div className="timeline-icon">{step.icon}</div>
            <div className="timeline-content">
              <h4>{step.title}</h4>
              <p>{step.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>🧾 Order Summary</h3>
        <ul>
          <li>1x Paneer Pizza – ₹220</li>
          <li>2x Coke – ₹80</li>
          <li>1x Fries – ₹60</li>
        </ul>
        <p><strong>Total:</strong> ₹360</p>
      </div>

      <div className="card">
        <h3>📍 Delivery Address</h3>
        <p>R. Ramya<br />6/108, North Street, Karumpulyuthu,<br />Alangulam, Tenkasi - 627851</p>
      </div>

      <div className="card">
        <h3>💳 Payment</h3>
        <p><FaCreditCard /> Paid via UPI<br />Transaction ID: UPI4235XXXX</p>
      </div>
    </div>
  );
};

export default TrackingPage;
