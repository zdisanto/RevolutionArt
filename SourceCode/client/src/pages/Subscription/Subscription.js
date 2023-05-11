import React, { useEffect, useState } from "react";
//import './Subscription.css'
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SUBS_INFO, AUTH, S_AUTH } from "../../constants/actionTypes";
import ShowMessage from "../../utils/modals/ShowMessage";
import ConfirmationModal from "../../utils/modals/ConfirmationModal";

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

const Subscription = ({
  showMessageModal,
  setShowMessageModal,
  unsubscribedConfirm,
  setUnsubscribedConfirm,
  shouldUnsubscription,
  setShouldUnsubscription,
}) => {
  // setting states
  const [subsSubmit, setSubsSubmit] = useState(false);
  const [prices, setPrices] = useState([]);
  const dispatch = useDispatch();
  const subscriptionInfo = useSelector((state) => state.subscriptionReducer);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/subs/prices"
    );

    setPrices(response.data);
  };

  // Function for cancel subscription for seller and buyer
  const cancelPlan = async () => {
    setSubsSubmit(true);
    try {

      // getting seller and buyer profile from localstorage
      let sellerProfile = JSON.parse(localStorage.getItem("seller_profile"));
      let userProfile = JSON.parse(localStorage.getItem("profile"));

      // cancle subscription for seller profile 
      if (sellerProfile) {
        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/subsseller/stripe/cancel",
          {
            subscriptionId: subscriptionInfo.subscriptionId,
            customerId: sellerProfile.result._id,
          }
        );

        if (res.status === 200) {
          setShowMessageModal(true);
          setShouldUnsubscription(false);

          let obj = {
            ...sellerProfile,
            result: res.data.customerInfo,
            subscriptionInfo: res.data.customerInfo.subscriptionInfo,
          };

          dispatch({ type: ADD_SUBS_INFO, payload: res.data.subscriptionInfo });
          dispatch({ type: S_AUTH, data: obj });
          setSubsSubmit(false);
          setShowMessageModal(true);
        } else {
          setShouldUnsubscription(false);
          alert("Somethind wrong !!!");
          setSubsSubmit(false);
        }
      } else if (userProfile) {
      // cancle subscription for buyer profile 

        const res = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/subs/stripe/cancel",
          {
            subscriptionId: subscriptionInfo.subscriptionId,
            customerId: userProfile.result._id,
          }
        );

        if (res.status === 200) {
          setShouldUnsubscription(false);
          setShowMessageModal(true);

          let obj = {
            ...userProfile,
            result: res.data.customerInfo,
            subscriptionInfo: res.data.customerInfo.subscriptionInfo,
          };

          dispatch({ type: ADD_SUBS_INFO, payload: res.data.subscriptionInfo });
          dispatch({ type: AUTH, data: obj });
          setSubsSubmit(false);
        } else {
          setShouldUnsubscription(false);
          alert("Somethind wrong !!!");
          setSubsSubmit(false);
        }
      }
    } catch (error) {
      // showing error if unsubscription process is failed
      console.log(error, "error");
      alert("Something went wrong !!!");
      setSubsSubmit(false);
      setShouldUnsubscription(false);
    }
  };

  const createSession = async (priceId) => {
    let customerId = JSON.parse(localStorage.getItem("seller_profile"))
      ? JSON.parse(localStorage.getItem("seller_profile")).stripeCustomerId
      : JSON.parse(localStorage.getItem("profile")).stripeCustomerId;

    const { data: response } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/subs/session",
      {
        priceId,
        customerId,
      }
    );
    window.location.href = response.url;
  };

  useEffect(() => {
    // Cancle subscription after user confirmation
    if (shouldUnsubscription) {
      cancelPlan();
    }
  }, [shouldUnsubscription]);

  const SubscriptionBox = ({ price, bulletPoints }) => {
    return (
      <div className="flex-col h-auto w-80 space-x-4 bg-gray-50 hover:bg-gray-100 rounded-xl mx-4 my-4">
        <div
          className="w-full text-center pt-5 font-bold rounded-2xl"
          key={price.id}
        >
          {price.nickname}
        </div>
        <div className="w-full text-center text-xl pt-5">
          ${price.unit_amount / 100}
          <span>/month</span>
        </div>
        <div className="flex items-center justify-center pt-5">
          {/* check user subscriptionInfo planId with price id and showing cancel, loading text and select option conditionally */}
          {subsSubmit && subscriptionInfo.planId === price.id ? (
            <span className="px-6 py-2 text-red-500 border-r-2">
              Please wait...
            </span>
          ) : !subscriptionInfo.subscriptionCancel ? (
            subscriptionInfo.planId === price.id ? (
              <button
                disabled={subsSubmit}
                className="hover:bg-red-400 hover:text-white bg-red-500 rounded-md px-10 py-2"
                onClick={() => setUnsubscribedConfirm(true)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="hover:bg-green-200  bg-green-200 rounded-md px-10 py-2"
                disabled
              >
                Select
              </button>
            )
          ) : (
            <button
              disabled={subsSubmit}
              className="hover:bg-green-500 hover:text-white bg-green-200 rounded-md px-10 py-2"
              onClick={() => createSession(price.id)}
            >
              Select
            </button>
          )}
        </div>
        <div className="flex items-center py-5 px-2 justify-center text-gray-500">
          <ul className="">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
    {/* Show popup with success message after subscription cancallation process is successfully completed */}
      <ShowMessage show={showMessageModal} setShow={setShowMessageModal} />
      {/* show confirmationation popup message for subscription cancalling */}
      <ConfirmationModal
        show={unsubscribedConfirm}
        setShow={setUnsubscribedConfirm}
        setShouldUnsubscription={setShouldUnsubscription}
      />
      <div className="h-full w-full mx-44 my-20">
        {/* <div><BackButton/></div> */}
        <div className="px-14 pb-5 mx-32">
          <h1>
            Choose your <span>subscription plan</span>
          </h1>
        </div>
        <div className="flex bg-white p-4 rounded-xl">
          {prices.map((price) => {
            if (price.nickname === "Elite") {
              const bulletPoints = [
                "Elite Plan",
              ];
              return (
                <SubscriptionBox
                  key={price.id}
                  price={price}
                  bulletPoints={bulletPoints}
                />
              );
            } else if (price.nickname === "Ultra Elite") {
              const bulletPoints = [
                "Ultra Elite Plan",
              ];
              return (
                <SubscriptionBox
                  key={price.id}
                  price={price}
                  bulletPoints={bulletPoints}
                />
              );
            } else if (price.nickname === "VIP") {
              const bulletPoints = [
                "VIP Plan",
              ];
              return (
                <SubscriptionBox
                  key={price.id}
                  price={price}
                  bulletPoints={bulletPoints}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Subscription;
