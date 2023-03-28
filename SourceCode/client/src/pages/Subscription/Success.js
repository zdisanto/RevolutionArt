import React from 'react';
import './SubscriptionSuccess.css';

const SubscriptionSuccess = () => {
  const handleGoToHomepage = () => {
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div className="subscription-success-container">
      <h2 className='congratulations-title'>Congratulations! You are now a Subscriber</h2>
      <p>Thank you for subscribing to our service.</p>
      <button className="go-to-homepage-btn" onClick={handleGoToHomepage}>Back to Homepage</button>
    </div>
  );
};

export default SubscriptionSuccess;
