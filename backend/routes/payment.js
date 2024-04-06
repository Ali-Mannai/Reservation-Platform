const express = require('express');
const router = express.Router();
// const User = require('../models/user');  //ajouter la reservation payé pour cet user
const axios = require("axios");
// const { initiatePayment } = require('./paymee');


router.post('/payment', async (req,res)=>{
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
        "app_token": "038f8f00-21b0-4755-9193-f471e6052e71", 
        "app_secret": process.env.flouci,
        "amount": req.body.amount,
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:4200/success",
        "fail_link": "http://localhost:4200/fail",
        "developer_tracking_id": "8d5333ab-f414-4c7d-af2d-d1758172bb78"
    };

    if (payload.amount<1999999) {
        await axios.post(url,payload)
        .then(result => {
            res.send(result.data);
        })
        .catch(err => {
            console.error(err); 
        })
    } else {
        res.send({message: `The amount is not accepted, please enter an amount less than 2000dt`})
    }

})

router.get('/payment/:id', async (req,res)=>{
    const payment_id = req.params.id;
    await axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`, {
    headers: {
    'Content-Type': 'application/json',
    'apppublic':'038f8f00-21b0-4755-9193-f471e6052e71',
    'appsecret': process.env.flouci
    }
    })
    .then((result) => {
    res.send(result.data);
    })
    .catch((err) => {
        console.log(err.message);
    });
});



module.exports = router;
    








// router.post('/initiate-payment', async (req, res) => {
//     try {
//         const paymentDetails = req.body;
//         const paymentResponse = await initiatePayment(paymentDetails);
//         res.status(300).redirect(paymentResponse.data.payment_url);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });