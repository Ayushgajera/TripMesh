import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your API call here
    toast.success('If an account exists with this email, you will receive a password reset link.')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto p-8 bg-white/95 backdrop-blur-lg rounded-2xl 
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
          hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] 
          transition-all duration-300
          relative
          overflow-hidden
          border border-white/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-pink-50/30 pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Forgot Password?
            </motion.h2>
            <p className="text-sm text-gray-600">
              Don't worry! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group"
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl 
                  bg-white/50 backdrop-blur-sm
                  transition-all duration-200 
                  focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  group-hover:border-gray-300"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading || !email}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white rounded-xl font-medium 
                shadow-lg shadow-indigo-200/50 
                hover:shadow-xl hover:shadow-indigo-300/50 
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
