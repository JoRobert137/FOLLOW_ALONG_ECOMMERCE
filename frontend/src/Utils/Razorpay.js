import axios from 'axios';

export const handlePay = async (total, token, orderIds) => {
  try {
    const createOrdersResponse = await axios.post(
      'http://localhost:8080/payment/create-order',
      {
        amount: total,
        currency: 'INR',
      }
    );
    const { amount, id: orderId, currency } = createOrdersResponse.data.orders;

    const responseKeys = await axios.get(
      'http://localhost:8080/payment/get-razorpay-key'
    );
    const keys = responseKeys.data;

    const options = {
      key: keys.key,
      amount: amount,
      currency: currency,
      name: 'ShopSphere',
      description: 'ShopSphere Payment',
      order_id: orderId,
      handler: async function (response) {
        const result = await axios.post(
          `http://localhost:8080/payment/pay-order?token=${token}`,
          {
            amount: amount,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            orderIds,
          }
        );
        alert(result.data.message);
      },
      prefill: {
        name: 'ShopSphere User',
        email: 'user@shopsphere.com',
      },
      theme: {
        color: '#F59E0B',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (er) {
    console.error('Payment error:', er.message);
  }
};