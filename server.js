const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB")
const cloudinary = require("cloudinary");

// Handling Uncaught Execption => anything not defind Uncaught Execption 

process.on("uncaughtException", (err) => {
    // console.log(`Error , ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


//config =>
dotenv.config({ path: "/config/config.env" })
// Connect With MongoDB
connectDB();

// conncet with cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`);
});

// Unhandled Promise Rejection  => server issue
process.on("unhandledRejection", (err) => {
    // console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    // if there any issue occures eg : broken host link eg : then return msg and server will close
    server.close(() => {
        process.exit(1);
    })
})


// const axios = require('axios');

// const authenticate = async () => {
//     try {
//         const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
//             email: 'ayush.6678@gmail.com',
//             password: '#Plusplus1'
//         });
//         return response.data.token;
//     } catch (error) {
//         console.error('Error authenticating:', error.response.data);
//         throw error;
//     }
// };

// const getTrackingDetails = async (token, orderId) => {
//     try {
//         const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${orderId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching tracking details:', error.response.data);
//         throw error;
//     }
// };

// const main = async () => {
//     try {
//         const token = await authenticate();
//         const orderId = '3849842352'; // Replace with your actual order ID

//         var axios = require('axios');

//         var config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: 'https://apiv2.shiprocket.in/v1/external/orders',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         };

//         axios(config)
//             .then(function (response) {
//                 console.log((response.data));
//             })
//             .catch(function (error) {
//                 console.log("error");
//             });

//         const trackingDetails = await getTrackingDetails(token, orderId);
//         console.log('Tracking Details:', trackingDetails);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// };

// main();
