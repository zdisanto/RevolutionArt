import React, { useEffect, useState } from "react";
import "./SubscriptionSuccess.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SubscriptionSuccess = () => {
  const { auth, seller_auth, subscriptionReducer } = useSelector(
    (state) => state
  );
  const navigate = useNavigate();

  // Navigate home page via useNavigate hook
  const handleGoToHomepage = () => {
    navigate("/");
  };

  // Add a text loading info untill untill user info user is getting fetched
  if (auth.loading && seller_auth.loading) {
    return (
      <div className="subscription-success-container font-bold text-2xl">
        Please wait...
      </div>
    );
  }

  // Show Subscription message. whenvever user is subscribed or not not
  if (subscriptionReducer.status !== "active") {
    return (
      <SubscriptionMessage
        handleGoToHomepage={handleGoToHomepage}
        title={"You are not a Subscriber"}
        body={"Please subscribe for using our services."}
      />
    );
  }

  return (
    <SubscriptionMessage
      handleGoToHomepage={handleGoToHomepage}
      title={"Congratulations! You are now a Subscriber"}
      body={"Thank you for subscribing to our service."}
    />
  );
};

export default SubscriptionSuccess;

// create SubscriptionMessage component
export const SubscriptionMessage = ({ handleGoToHomepage, title, body }) => {
  return (
    <div className="subscription-success-container">
      <h2 className="congratulations-title">{title}</h2>
      <p>{body}</p>
      <button className="go-to-homepage-btn" onClick={handleGoToHomepage}>
        Back to Homepage
      </button>
    </div>
  );
};
