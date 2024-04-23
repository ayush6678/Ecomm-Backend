const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const { isAuthentictedUser } = require("../middleWare/auth");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.route("/payment/process").post(isAuthentictedUser, processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

router.route("/create-payment-intent").post(async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "inr",
        description: "tees",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router


