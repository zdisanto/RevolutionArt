import React, { useEffect, useState } from 'react';
//import './Subscription.css'
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

// const BackButton = () => {
//   const handleGoBack = () => {
//     window.history.back();
//   };

//   return (
//     <button className="back-button" onClick={handleGoBack}>
//       <FaArrowLeft className="back-icon" />
//     </button>
//   );
// };

// const Box = ({ children }) => {
//   return (
//     <div
//       className="subscription-box"
//       style={{
//         marginTop: "8rem",
//         marginLeft: "8rem",
//         marginRight: "5rem",
//         borderRadius: "1rem",
//         height: "600px",
//         width: "400px",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "rgba(73, 196, 212, 0.51)",
//         boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.2)",
//         transformOrigin: "center",
//         perspective: "1000px",
//       }}
//     >
//       {children}
//     </div>
//   );
// };


const Subscription = () => {

  // setting states
  const [prices, setPrices] = useState([])

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get("http://localhost:5000/subs/prices");
    console.log(response);
    setPrices(response.data);
  };

  const SubscriptionBox = ({ price, bulletPoints }) => {
    return (
      <div className='flex-col h-auto w-80 space-x-4 bg-gray-50 hover:bg-gray-100 rounded-xl mx-4 my-4'>
        <div className="w-full text-center pt-5 font-bold rounded-2xl" key={price.id}>{price.nickname}</div>
        <div className="w-full text-center text-xl pt-5">
          ${price.unit_amount / 100}<span>/month</span>
        </div>
        <div className="flex items-center justify-center pt-5">
          <button className='hover:bg-green-500 hover:text-white bg-green-200 rounded-md px-10 py-2' onClick={() => createSession(price.id)}>
            Select
          </button>
        </div>
        <div className='flex items-center py-5 px-2 justify-center text-gray-500'>
          <ul className="">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const createSession = async (priceId) => {
    const { data: response } = await axios.post("http://localhost:5000/subs/session",
      {
        priceId,
      })
    window.location.href = response.url;
  }

  return (
    <div className='h-full w-full mx-44 my-20'>
    {/* <div><BackButton/></div> */}
      <div className='px-14 pb-5 mx-32'>
        <h1>Choose your <span>subscription plan</span></h1>
      </div>
      <div className='flex bg-white p-4 rounded-xl'>
        {prices.map((price) => {
          if (price.nickname === "Elite") {
            const bulletPoints = [
              "Access to exclusive art pieces",
              "Discounts on selected art pieces",
              "Exclusive art-related content via email",
              "Priority notification for new art arrivals",
            ];
            return <SubscriptionBox key={price.id} price={price} bulletPoints={bulletPoints} />;
          } else if (price.nickname === "Ultra Elite") {
            const bulletPoints = [
              "Access to even more exclusive and rare art pieces",
              "Higher discounts on selected art pieces",
              "Priority access to art events and exhibitions",
              "Personalized art recommendations via email",
            ];
            return <SubscriptionBox key={price.id} price={price} bulletPoints={bulletPoints} />;
          } else if (price.nickname === "VIP") {
            const bulletPoints = [
              "Access to the most exclusive and unique art pieces",
              "The highest discounts on selected art pieces",
              "Priority access to private art collections and exclusive events",
              "Personalized art consultations and recommendations via email",
              "Invitation-only art auctions and sales.",
            ];
            return <SubscriptionBox key={price.id} price={price} bulletPoints={bulletPoints} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Subscription;

