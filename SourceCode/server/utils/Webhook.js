import bodyParser from "body-parser";

// Webhook handler for asynchronous events.

function addWebhook(app) {
  
  app.post("/webhook", bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    let data;
    let eventType;
  
    try {
      const signature = req.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
      data = event.data;
      eventType = event.type;
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
  
    console.info("event eventType >>>> ", eventType);
  
    await Promise.all([
      checkout(eventType, data),
      subscription(eventType, data),
      invoice(eventType, data),
    ]);
  
    res.sendStatus(200);
  });

  
}



const checkout = async (eventType, data) => {
  if (eventType !== "checkout.session.completed") {
    return; // not a checkout event
  }

  console.log("checkout event detected", eventType);

  const { object } = data;
  console.log(`object.customer`, object.customer);
  console.log(`object.customer_email`, object.customer_email);
  if (object.metadata?.product_name === "buy250") {
    await addCredits({
      credits: parseInt(object.metadata.credits) || 250,
      customer: object.customer,
    });
  }
};


const subscription = async (eventType, data) => {
  if (!eventType.includes("subscription")) {
    return; // not a subscription event
  }

  console.log("subscription event detected", eventType);

  await updateSubscription(eventType, data);
};

const updateSubscription = async (eventType, data) => {
  const { object } = data;

  if (eventType.includes("subscription.created")) {
    await updateUserSubscription(object.customer, {
      status: object.status,
      plan: object.items.data[0].plan.nickname,
      trial_end: object.trial_end,
      current_period_end: object.current_period_end,
      cancel_at_period_end: object.cancel_at_period_end,
    });
  } else if (eventType.includes("subscription.updated")) {
    await updateUserSubscription(object.customer, {
      status: object.status,
      plan: object.items.data[0].plan.nickname,
      trial_end: object.trial_end,
      current_period_end: object.current_period_end,
      cancel_at_period_end: object.cancel_at_period_end,
    });
  } else if (eventType.includes("subscription.deleted")) {
    await updateUserSubscription(object.customer, {
      status: object.status,
      plan: "N/A",
      trial_end: object.trial_end,
      current_period_end: object.current_period_end,
      cancel_at_period_end: object.cancel_at_period_end,
    });
  }
};

const updateUserSubscription = async (customerId, subscriptionData) => {
  await User.updateOne({ customerId }, subscriptionData).exec();
};



const invoice = async (eventType, data) => {

	if (!eventType.includes("invoice")) {
		return // not a subscription event
	}

	paid(eventType, data)
}

const paid = async (eventType, data) => {

	if (!eventType.includes("invoice.paid")) {
		return // not a subscription event
	}
	const { object } = data
	let user = await User.findOne({
		customerId: object.customer
	})

	// only updating credits when user pay some money
	if (object.amount_paid > 0) {
		if (!user.referrerPaid) { // check for referrer if any then pay referer // only paying when referrer bought any plan
			let referrer = await User.findOne({
				_id: user.referrer
			})
			if (referrer) { // if referrer is available
				referrer.credits += 100 // paying 100 credits to referrer
				user.referrerPaid = true
				referrer.save()
			}
		}// paying referrer done

		// retrieving plan for which the invoice is generated
		const subscription = await stripe.subscriptions.retrieve(
			object.subscription,
			{ expand: ['plan'] }
		);
		const plan = subscription.plan // here we have information of subscription plan

		console.log("user plans>>>>", subscription.plan);

		// previously we have ensured that user has payed so we have to assign credits according to its plan  

		// implementing credits here
		if (plan.id === process.env.STRIPE_PRODUCT_ENTRY) { // cheking if the plan is entry plan then run this block
			user.credits += parseInt(process.env.ENTRY_CREDITS) || 1000  //DEFAULT 1000
			console.log(`Adding entry ${process.env.ENTRY_CREDITS || 1000} credits to ${user.email}`)
		}
		if (plan.id === process.env.STRIPE_PRODUCT_PRO) {// cheking if the plan is pro plan then run this block
			user.credits += parseInt(process.env.PRO_CREDITS) || 1000  //DEFAULT 1000
			console.log(`Adding pro ${process.env.PRO_CREDITS || 1000} credits to ${user.email}`)
		}

		// otherwise dont do anything 
		// we have three situation 1. user has free plan 2. user Bought  entry plan 3. user Bought pro plan
		// user has default 100 credits for free trial and that is for once when a user is created
		// and then for every payment we have to give him credits
	}

	try {
		await user.save();
		console.log("Added");
	} catch (error) {
		console.error("error updating user credits: ", error);
	}

}



export default addWebhook