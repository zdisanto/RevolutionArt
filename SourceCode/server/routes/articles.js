import express from "express";
import {login} from "../controllers/user.js";
import auth from "../middleware/auth.js";
import article from "../models/article.js"
import User from "../models/user.js";
import UserModal from "../models/user.js";
import { stripe } from "../utils/stripe.js";

const router = express.Router();
//might have to add auth below
router.get("/",async (req, res) => {
    // const user = await UserModal.findOne({ email: req.body.email });
    const oldUser = await UserModal.findOne({ email: req.body.email});

    const subscriptions = await stripe.subscriptions.list(
        {
            customer: UserModal.stripeCustomerId,
            status: "all",
            expand: ["data.default_payment_method"]
        },
        {
            apiKey: "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX"
        }
    )
    if(!subscriptions.data.length) 
        return res.status(400).json({ message: "User is not subscribed to any plan" });
    // const subscription = subscriptions.data[0];

    // if (subscription.customer !== UserModal.stripeCustomerId) {
    //     return res.status(403).json({ message: "You are not authorized to access this subscription" });
    // }
    const plan = subscriptions.data[0].plan.nickname;
    
    if (plan === "Elite") {
        const articles = await article.find({ access: "Elite"});
        return res.json(articles);
    }else if (plan === "Ultra Elite") {
        const articles = await article.find({ access: "Ultra Elite"});
        return res.json(articles);
    }else {
        const articles = await article.find({ access: "VIP"});
        return res.json(articles);
    }
    res.json(plan);
})

export default router;

// import express from "express";
// import { stripe } from "../utils/stripe.js";
// import article from "../models/article.js";
// import UserModal from "../models/user.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// router.get("/", auth, async (req, res) => {

//     const subscriptions = await stripe.subscriptions.list(
//       {
//         customer: req.body.stripeCustomerId,
//         status: "all",
//         expand: ["data.default_payment_method"],
//       },
//       {
//         apiKey:
//           "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX",
//       }
//     );
//     if (!subscriptions.data.length)
//       return res
//         .status(400)
//         .json({ message: "User is not subscribed to any plan" });

//     const plan = subscriptions.data[0].plan.nickname;

//     if (plan === "Elite") {
//       const articles = await article.find({ access: "Elite" });
//       return res.json(articles);
//     } else if (plan === "Ultra Elite") {
//       const articles = await article.find({ access: "Ultra Elite" });
//       return res.json(articles);
//     } else {
//       const articles = await article.find({ access: "VIP" });
//       return res.json(articles);
//     }
// });

// export default router;


// import express from "express";
// import auth from "../middleware/auth.js";
// import article from "../models/article.js";
// import UserModal from "../models/user.js";
// import { stripe } from "../utils/stripe.js";

// const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await UserModal.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const subscriptions = await stripe.subscriptions.list(
//       {
//         customer: user.stripeCustomerId,
//         status: "all",
//         expand: ["data.default_payment_method"],
//       },
//       {
//         apiKey: "sk_test_51MmLUyAaUjfR3qEUoqPd1W0YVIqe3vzt356fGQfJTT0X8KJZG0NXHIhJ8yQb6nSER5sZCmaknO13bRAbDx1Dirjb006ExhI7LX",
//       }
//     );

//     if (!subscriptions.data.length) {
//       return res.status(400).json({ message: "User is not subscribed to any plan" });
//     }

//     const plan = subscriptions.data[0].plan.nickname;

//     if (plan === "Elite") {
//       const articles = await article.find({ access: "Elite" });
//       return res.json(articles);
//     } else if (plan === "Ultra Elite") {
//       const articles = await article.find({ access: "Ultra Elite" });
//       return res.json(articles);
//     } else {
//       const articles = await article.find({ access: "VIP" });
//       return res.json(articles);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });

// export default router;
