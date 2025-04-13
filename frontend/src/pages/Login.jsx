import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('passenger');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4"
    >
      <motion.div 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Toggle Switch */}
        <motion.div 
          className="flex justify-center mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-gray-200 rounded-full p-1 flex relative">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-blue-500"
              initial={false}
              animate={{
                x: isLogin ? 0 : '100%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              className={`px-8 py-2 rounded-full relative z-10 transition-colors duration-300 ${
                isLogin ? 'text-white' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-8 py-2 rounded-full relative z-10 transition-colors duration-300 ${
                !isLogin ? 'text-white' : 'text-gray-500'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        <motion.h2 
          variants={slideIn}
          initial="initial"
          animate="animate"
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </motion.h2>

        {/* Role Selection */}
        <motion.div 
          className="mb-6"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Role</label>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
                role === 'passenger'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setRole('passenger')}
            >
              Passenger
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
                role === 'driver'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setRole('driver')}
            >
              Driver
            </motion.button>
          </div>
        </motion.div>

        <motion.form 
          className="space-y-4"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter your full name"
              />
            </motion.div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Confirm your password"
              />
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </motion.button>
        </motion.form>

        <motion.p 
          variants={fadeIn}
          className="text-center mt-6 text-sm text-gray-600"
        >
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-blue-500 font-semibold hover:text-blue-600"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </motion.button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-blue-500 font-semibold hover:text-blue-600"
                onClick={() => setIsLogin(true)}
              >
                Login
              </motion.button>
            </>
          )}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Login;
