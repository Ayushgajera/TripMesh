import React, { useState } from 'react';
import { useDepositToWalletMutation, useVerifyPaymentMutation } from '../../features/api/wallet.js';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { updateBalance } from '../../features/userslice.js';
import { useNavigate } from 'react-router-dom';

const WalletDeposit = () => {
  const [amount, setAmount] = useState('');
  const [initiateDeposit] = useDepositToWalletMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const currentBalance = useSelector(state => state.user.wallet.balance);
  console.log("Current Balance:", currentBalance);
  console.log("Amount:", amount);

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      const result = await initiateDeposit(amount * 100); // amount in paise

      if (!result?.data) {
        console.error("Deposit initiation failed", result);
        toast.error("Something went wrong while initiating payment.");
        return;
      }

      const data = result.data.data;
        console.log(data.amount);

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
            // Update the balance in Redux store
            dispatch(updateBalance(currentBalance + parseFloat(amount)));
            await navigate("/profile");
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Money to Wallet</h1>
          <p className="mt-2 text-sm text-gray-600">
            Securely deposit funds to your wallet using Razorpay
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Balance Card */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
            <div className="text-center">
              <p className="text-purple-100 text-sm font-medium">Current Balance</p>
              <p className="text-white text-4xl font-bold mt-1">₹{parseFloat(currentBalance).toFixed(2)}</p>
            </div>
          </div>

          {/* Deposit Form */}
          <div className="p-6 md:p-8">
            {/* Quick Amount Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Select Amount
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleQuickAmount(value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${amount === value.toString()
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                      }`}
                  >
                    ₹{value}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Or Enter Custom Amount
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="block w-full rounded-lg border-gray-200 pl-8 pr-12 py-3 text-lg
                    focus:border-purple-500 focus:ring-purple-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">INR</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-8">
              <button
                onClick={handlePayment}
                disabled={!amount || amount <= 0}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                  px-6 py-4 rounded-lg text-lg font-medium shadow-md
                  hover:from-purple-700 hover:to-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 ease-in-out"
              >
                Add ₹{amount || '0'} to Wallet
              </button>
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
              Secured by Razorpay
            </div>
          </div>
        </div>

        {/* Transaction Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Your wallet will be credited instantly after successful payment.
            <br />
            For any issues, please contact our support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletDeposit;
