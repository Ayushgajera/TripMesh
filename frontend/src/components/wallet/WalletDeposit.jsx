import React, { useState } from 'react';
import { useDepositToWalletMutation, useVerifyPaymentMutation } from '../../features/api/wallet.js';
import { toast } from 'react-toastify';

const WalletDeposit = () => {
  const [amount, setAmount] = useState('');
  const [initiateDeposit] = useDepositToWalletMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      // Fix applied here: directly pass amount * 100
      const result = await initiateDeposit(amount * 100); // amount in paise

      if (!result?.data) {
        console.error("Deposit initiation failed", result);
        toast.error("Something went wrong while initiating payment.");
        return;
      }

      const data = result.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Wallet Payment",
        order_id: data.orderId,
        handler: async (response) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: data.amount / 100, // convert back to rupees
          };

          const verifyResult = await verifyPayment(paymentData);
          console.log("Payment verification result:", verifyResult);

          if ('data' in verifyResult) {
            toast.success(verifyResult.data.message || "Wallet updated successfully");
          } else {
            toast.error(verifyResult.error?.data?.message || "Verification failed");
          }
        },
        prefill: {
          name: "Ayush Gajera",
          email: "ayush@example.com",
        },
        theme: { color: "#6366f1" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Deposit to Wallet</h2>
      <input
        type="number"
        placeholder="Enter amount"
        className="border p-2 rounded w-full mb-4"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={handlePayment}
      >
        Deposit
      </button>
    </div>
  );
};

export default WalletDeposit;
