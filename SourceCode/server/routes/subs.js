import express from "express";
import { stripe } from "../utils/stripe.js";


import mongoose from "mongoose";
import UserModal from "../models/user.js";

const router = express.Router();

router.get("/prices", async (req, res) => {
  // get prices from stripe
  const prices = await stripe.prices.list({
    apiKey:
      "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX",
  });

  return res.json(prices);
});

// check users total subscription list
router.post("/stripe/checkallsubs", async (req, res) => {

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: req.body.stripeCustomerId,
    });

    if (subscriptions.data.length) {
      const AllSubs = subscriptions.data.map((subscription) => {
        
        return { subscriptionId: subscription.id, status: subscription.status };
      });
      return res.status(200).json({ AllSubs });
    }

    return res.status(404).json({ message: "No subscriptions available" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ Message: "Something went wrong", error: error });
  }
});

// check user subscription using subs id
router.post("/stripe/checksubs", async (req, res) => {
  
  try {
    stripe.subscriptions.retrieve(
      req.body.subscriptionId,
      async function (err, subscription) {
        if (err) {
          const { statusCode, message } = err.raw;
          return res.status(statusCode).json({ message });
        } else {
          try {
            const {
              id,
              cancel_at_period_end,
              canceled_at,
              current_period_start,
              current_period_end,
              customer,
              currency,
              status,
              plan,
            } = subscription;

            const subscriptionInfo = {
              subscriptionId: id,
              customer,
              subscriptionStart: new Date(current_period_start * 1000),
              subscriptionEnd: new Date(current_period_end * 1000),
              subscriptionCancel: canceled_at !== null ? true : false,
              subsCancleAtPeriodEnd: cancel_at_period_end,
              subscriptionCancelTime:
                canceled_at !== null ? new Date(canceled_at * 1000) : null,
              currency,
              status,
              planId: plan.id,
              planAmout: plan.amount,
              product: plan.product,
              nickname: plan.nickname,
            };

            if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
              // Here customerId is document user id of mongodb
              return res
                .status(404)
                .send(`No User with id: ${req.body.customerId}`);

            const userInfo = await UserModal.findOne({
              _id: req.body.customerId,
            });

            userInfo.subscriptionInfo = subscriptionInfo;
            await userInfo.save();

            return res
              .status(200)
              .json({ subscriptionInfo, customerInfo: userInfo });
          } catch (error) {
            console.log(error, "error");
            return res
              .status(400)
              .json({ error: error, message: "Internal server error" });
          }
        }
      }
    );

    return;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ Message: "Something went wrong" });
  }
});

// Create route for checkout session after user selects a subscription plan
router.post("/session", async (req, res) => {
  ////
  // const user = await UserModal.findOne({ email: req.body.email})
  /////
  //might have to add user.findone here!!!!!!!! check code(added above)
  ///add article
  // Article.create({
  //     title: "VIP Subscription",
  //     imageUrl:
  //     "https://images.unsplash.com/photo-1532540983331-3260f8487880?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80",
  //     content:
  //     "As a VIP member, you will have access to the most exclusive and unique art pieces. You will receive the highest discounts on selected art pieces and have priority access to private art collections and exclusive events. You will receive personalized art consultations and recommendations via email to enhance your art collection. Additionally, you will have access to invitation-only art auctions and sales. Enjoy the ultimate art collecting experience with the VIP plan.",
  //     access: "VIP",
  // });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      customer: req.body.customerId,
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/subscriptionsuccess`,
      cancel_url:`${process.env.CLIENT_URL}/subscriptionsuccess`,
      // customer: user.stripeCustomerId,
    },
    {
      apiKey:
        "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX",
    }
  );

  return res.json(session);
});

// cancel user subscription api
router.post("/stripe/cancel", async (req, res) => {
  stripe.subscriptions.del(
    req.body.subscriptionId,
    async function (err, confirmation) {
      if (err) {
        const { statusCode, message } = err.raw;
        return res.status(statusCode).json({ message });
      } else {
        const {
          id,
          cancel_at_period_end,
          canceled_at,
          current_period_start,
          current_period_end,
          customer,
          currency,
          status,
          plan,
        } = confirmation;

        const subscriptionInfo = {
          subscriptionId: id,
          customer,
          subscriptionStart: new Date(current_period_start * 1000),
          subscriptionEnd: new Date(current_period_end * 1000),
          subscriptionCancel: canceled_at !== null ? true : false,
          subsCancleAtPeriodEnd: cancel_at_period_end,
          subscriptionCancelTime:
            canceled_at !== null ? new Date(canceled_at * 1000) : null,
          currency,
          status,
          planId: plan.id,
          planAmout: plan.amount,
          product: plan.product,
          nickname: plan.nicknames,
        };

        if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
          // Here customerId is document user id of mongodb
          return res
            .status(404)
            .send(`No User with id: ${req.body.customerId}`);

        const userInfo = await UserModal.findOne({
          _id: req.body.customerId,
        });

        userInfo.subscriptionInfo = subscriptionInfo;
        await userInfo.save();
        return res
          .status(200)
          .json({ subscriptionInfo, customerInfo: userInfo });
      }
    }
  );
});

export default router;
