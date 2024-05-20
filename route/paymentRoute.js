const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const { isAuthentictedUser } = require("../middleWare/auth");
const router = express.Router();
const { Cashfree } = require("cashfree-pg");

router.route("/payment/createOrder").post(async (req, res) => {

    Cashfree.XClientId = process.env.X_ID;
    Cashfree.XClientSecret = process.env.X_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

    var request = {
        "order_amount": 4.00,
        "order_currency": "INR",
        "order_id": req.body.ID,
        "customer_details": {
            "customer_id": "walterwNrcMi",
            "customer_phone": "8474090589",
            "customer_name": "Walter White",
            "customer_email": "walter.white@example.com"
        },
        "order_meta": {
            "return_url": "http://localhost:3000/success",
            "notify_url": "https://www.cashfree.com/devstudio/preview/pg/webhooks/24210234",
            "payment_methods": "cc,dc,upi"
        },
        "order_note": "Sample Order Note",
        "order_tags": {
            "name": "Developer",
            "company": "Cashfree"
        }
    };

    Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
        console.log('Order created successfully:', response.data);
        res.send(response.data)
    }).catch((error) => {
        console.error('Error:', error.response.data.message);
        res.send(response.data)
    });
})

router.route("/payment/process").post(isAuthentictedUser, processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);




module.exports = router


