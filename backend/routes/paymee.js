const axios = require('axios');

const PAYMEE_API_URL = 'https://sandbox.paymee.tn/api/v2/payments/create';
const API_KEY = '588017639337ce4eb57aea9bcbb83c8a34957ccf'; 

async function initiatePayment(paymentDetails) {
    try {
        const response = await axios.post(PAYMEE_API_URL, paymentDetails, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initiatePayment
};
