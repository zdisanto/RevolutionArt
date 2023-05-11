import React, { useEffect, useState } from "react";
import {
  getInfo,
  getSubscriptionInfo,
  s_getInfo,
  s_getSubscriptionInfo,
} from "../api";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SUBS_INFO, AUTH, S_AUTH } from "../constants/actionTypes";
import axios from "axios";

const useCheckSubs = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  let sProfile = JSON.parse(localStorage.getItem("seller_profile"));
  let bProfile = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    // checking and gettting seller and buyer info that it is authorized and also checking subscription info
    (async () => {
      // check user authentication using user profile id
      try {
        if (sProfile && sProfile.result) {
          // check seller authentication
          const response = await s_getInfo(sProfile.result._id);
          if (response.status === 200) {
            let obj = {
              ...sProfile,
              result: response.data,
            };
            dispatch({ type: S_AUTH, data: obj });

            // Get seller subscription info from stripe dashboard and update database
            // get seller subscription id
            const responseId = await axios.post(
              process.env.REACT_APP_SERVER_URL +
                "/subsseller/stripe/checkallsubs",
              {
                stripeCustomerId: sProfile.stripeCustomerId,
              }
            );

            let subscriptionId = "";

            if (responseId.status === 200) {
              subscriptionId = responseId.data.AllSubs[0].subscriptionId;
              const customer = {
                subscriptionId,
                customerId: sProfile.result._id,
              };

              // getting seller subscription info using subscription id and stripe customer id
              const res = await s_getSubscriptionInfo({
                subscriptionId: customer.subscriptionId,
                customerId: customer.customerId,
              });

              let obj = {
                ...sProfile,
                result: res.data.customerInfo,
                subscriptionInfo: res.data.customerInfo.subscriptionInfo,
              };

              dispatch({
                type: ADD_SUBS_INFO,
                payload: res.data.subscriptionInfo,
              });
              dispatch({ type: S_AUTH, data: obj });
            }
          }
          // }
        } else if (bProfile) {
          const response = await getInfo(bProfile.result._id);
          if (response.status === 200) {
            let obj = {
              ...bProfile,
              result: response.data,
            };

            dispatch({ type: AUTH, data: obj });

            // Get user subscription info from stripe dashboard and update dashboard

            // get buyer subscription id
            const responseId = await axios.post(
              process.env.REACT_APP_SERVER_URL + "/subs/stripe/checkallsubs",
              {
                stripeCustomerId: bProfile.stripeCustomerId,
              }
            );

            let subscriptionId = "";
            if (responseId.status === 200) {
              subscriptionId = responseId.data.AllSubs[0].subscriptionId;
              const customer = {
                subscriptionId,
                customerId: bProfile.result._id,
              };

              // getting buyer subscription info using subscription id and stripe customer id
              const res = await getSubscriptionInfo({
                subscriptionId: customer.subscriptionId,
                customerId: customer.customerId,
              });
              let obj = {
                ...bProfile,
                result: res.data.customerInfo,
                subscriptionInfo: res.data.customerInfo.subscriptionInfo,
              };

              dispatch({
                type: ADD_SUBS_INFO,
                payload: res.data.subscriptionInfo,
              });
              dispatch({ type: AUTH, data: obj });
            }
          }
        }
      } catch (error) {
        console.log(error, "error");
        // if (error.message === "Network Error") {
        //   // alert("Network error!!!");

        // }
      }
    })();
  }, []);

  return { auth };
};

export default useCheckSubs;
