const asyncWrapper = require("../middleWare/asyncWrapper");
exports.processPayment = async (req, res) => {

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // asigning key as well
  try {
    const intent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'inr', // Or your desired currency
      payment_method_types: ['card'],
    });

    // res.status(200).send({ clientSecret: intent.client_secret });
    res
      .status(200)
      .json({ sucess: true, client_secret: intent.client_secret });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
}



// asyncWrapper(async (req, res, next) => {

//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // asigning key as well

//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "inr",
//     metadata: {
//       company: "Ecommerce",
//     },
//   });

//   res
//     .status(200)
//     .json({ sucess: true, client_secret: myPayment.client_secret });

// });

// send STRIPE_API_KEY to user =>

exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
