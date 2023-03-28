import express from "express";
// import { login} from "../controllers/user.js";
import s_auth from "../middleware/s_auth.js";
import Seller from "../models/seller.js";
import { stripe } from "../utils/stripe.js";
// import Article from "../models/article.js";
////
// import UserModal from "../models/user.js";
////

const router = express.Router();

router.get("/subsprices",async (req, res) => {
    // get prices from stripe
    const prices = await stripe.prices.list({
        apiKey: "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX"
    });

    return res.json(prices);
});


// Create route for checkout session after user selects a subscription plan
router.post("/subssession",async (req,res) =>{
    ////
    // const seller = await Seller.findOne({ email: req.seller})
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

    const session = await stripe.checkout.sessions.create({
        mode:"subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: req.body.priceId,
                quantity: 1
            }
        ],
        success_url:"http://localhost:3000/subscriptionsuccess",
        // cancel_url:"http://localhost:3000/subscription",
        // customer: seller.stripeCustomerId,
    }, {
        apiKey: "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX"
    });
    //return session
    return res.json(session);
})
export default router;
