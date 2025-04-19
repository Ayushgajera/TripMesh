import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const PROFILE_IMAGE = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

const tabs = [
  { id: 'overview', label: 'Overview', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
    </svg>
  )},
  { id: 'rides', label: 'Rides', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v6a2 2 0 002 2h2"/>
    </svg>
  )},
  { id: 'wallet', label: 'Wallet', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
    </svg>
  )},
  { id: 'support', label: 'Support', icon: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  )}
];

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState({
    personalInfo: {
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '+1 234 567 8900',
      dateOfBirth: '1995-05-14',
      address: '123 Main Street, NY',
      preferredPayment: 'Credit Card'
    },
    travelPreferences: {
      seatPreference: 'Window',
      carType: 'Premium Sedan',
      airCondition: 'Cool',
      musicPreference: 'Soft Music'
    },
    rideStats: {
      totalRides: 45,
      totalDistance: 1235,
      totalAmount: 2890,
      averageRating: 4.8,
      totalCancellations: 2,
      ridesThisMonth: 5,
      favoritePaths: [
        { from: 'Home', to: 'Office', count: 25 },
        { from: 'Home', to: 'Airport', count: 12 }
      ]
    },
    wallet: {
      balance: 1250,
      savedPayments: [
        { id: 1, type: 'UPI', name: 'personal@upi', isDefault: true },
        { id: 2, type: 'Card', name: '**** **** **** 4242', isDefault: false },
        { id: 3, type: 'UPI', name: 'work@upi', isDefault: false }
      ],
      recentTransactions: [
        { id: 1, type: 'RIDE', amount: -250, date: '2025-04-18', description: 'Ride to Office' },
        { id: 2, type: 'CREDIT', amount: 1000, date: '2025-04-15', description: 'Added money' },
        { id: 3, type: 'RIDE', amount: -180, date: '2025-04-12', description: 'Ride to Mall' }
      ]
    },
    upcomingRides: [
      {
        id: 1,
        pickup: 'Home',
        dropoff: 'Office',
        date: '2025-05-20',
        time: '09:00 AM',
        status: 'Confirmed'
      },
      {
        id: 2,
        pickup: 'Airport',
        dropoff: 'Hotel Plaza',
        date: '2025-05-22',
        time: '02:30 PM',
        status: 'Scheduled'
      }
    ],
    support: {
      activeTickets: [
        { id: 1, subject: 'Payment Issue', status: 'Open', date: '2025-04-17' },
        { id: 2, subject: 'Ride Cancellation', status: 'Resolved', date: '2025-04-15' }
      ],
      emergencyContacts: [
        { name: '24/7 Support', number: '1800-123-4567' },
        { name: 'Local Police', number: '911' }
      ]
    },
    settings: {
      language: 'English',
      notifications: true,
      darkMode: false
    },
    referral: {
      code: 'ALEX2025',
      pointsEarned: 450,
      invitesSent: 8,
      successfulReferrals: 3
    }
  });

  const handleInputChange = (section, key, value) => {
    setUserData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Profile updated successfully');
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const TabNavigation = () => (
    <div className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center justify-center gap-2 flex-1 
                min-w-[80px] px-3 py-3
                text-xs font-medium 
                transition-all relative
                ${activeTab === tab.id 
                  ? 'text-purple-600 bg-purple-50/50' 
                  : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50/30'}
              `}
            >
              {/* Icon */}
              <span className="block">
                {tab.icon}
              </span>
              
              {/* Label */}
              <span className="truncate">
                {tab.label}
              </span>

              {/* Active Indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-violet-600 to-indigo-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} 
          />
        </div>

        {/* Profile Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-6 pb-20 md:pt-8 md:pb-28 lg:pt-12 lg:pb-32">
            {/* Top Navigation Stats */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3 mb-6 md:mb-8">
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-white/90 backdrop-blur-sm">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-xs md:text-sm font-medium">{userData.rideStats.averageRating}</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-white/90 backdrop-blur-sm">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span className="text-xs md:text-sm font-medium">{userData.rideStats.totalRides} Rides</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-white/90 backdrop-blur-sm">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-xs md:text-sm font-medium">${userData.rideStats.totalAmount}</span>
              </div>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-8 lg:gap-10">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={PROFILE_IMAGE}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 bg-white text-purple-600 p-2 md:p-3 rounded-xl shadow-lg hover:bg-purple-50 transition-colors">
                    
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                      {userData.personalInfo.name}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-purple-500/20 text-white backdrop-blur-sm">
                        Premium Member
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm bg-white/10 text-white/90 backdrop-blur-sm">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span className="truncate max-w-[150px] md:max-w-none">{userData.personalInfo.email}</span>
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm bg-white/10 text-white/90 backdrop-blur-sm">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        {userData.personalInfo.phone}
                      </span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="mt-2 md:mt-0">
                    <button
                      onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}
                      className={`px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                        isEditing 
                          ? 'bg-white text-purple-600 hover:bg-purple-50' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isEditing ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                            )}
                          </svg>
                          {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <p className="text-white/60 text-xs md:text-sm">Total Distance</p>
                    <p className="text-lg md:text-2xl font-bold mt-1 text-white">{userData.rideStats.totalDistance} km</p>
                  </div>
                  <div className="bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <p className="text-white/60 text-xs md:text-sm">Amount Spent</p>
                    <p className="text-lg md:text-2xl font-bold mt-1 text-white">${userData.rideStats.totalAmount}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <p className="text-white/60 text-xs md:text-sm">This Month</p>
                    <p className="text-lg md:text-2xl font-bold mt-1 text-white">{userData.rideStats.ridesThisMonth} rides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Navigation - Only visible on mobile */}
      <TabNavigation />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Content sections wrapped in conditional rendering based on activeTab */}
          <div className={activeTab === 'overview' ? 'block' : 'hidden md:block'}>
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-purple-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              <div className="space-y-4">
                {Object.entries(userData.personalInfo).map(([key, value]) => (
                  <div key={key} className="group">
                    <label className="block text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isEditing ? (
                      <input
                        type={key.includes('date') ? 'date' : 'text'}
                        value={value}
                        onChange={(e) => handleInputChange('personalInfo', key, e.target.value)}
                        className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm 
                          focus:border-purple-500 focus:ring-purple-500 
                          group-hover:border-purple-300 transition-colors"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 p-2 rounded-lg bg-gray-50 group-hover:bg-purple-50 transition-colors">
                        {value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 ${activeTab === 'rides' ? 'block' : 'hidden md:block'}`}>
            {/* Upcoming Rides */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-violet-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upcoming Rides
              </h2>
              <div className="space-y-4">
                {userData.upcomingRides.map((ride) => (
                  <div key={ride.id} 
                    className="p-4 rounded-xl border border-violet-100 hover:bg-violet-50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{ride.pickup} → {ride.dropoff}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ride.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {ride.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{ride.date} at {ride.time}</p>
                      </div>
                      <button className="text-violet-600 hover:text-violet-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`col-span-full ${activeTab === 'wallet' ? 'block' : 'hidden md:block'}`}>
            {/* Wallet Details */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-purple-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                    />
                  </svg>
                  Wallet Details
                </h2>
                <button 
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  onClick={() => toast.info('Add Money feature coming soon!')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Money
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-80">Available Balance</p>
                  <p className="text-4xl font-bold mt-2">${userData.wallet.balance}</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm opacity-80">Last updated</p>
                    <p className="text-sm">Today, 12:45 PM</p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
                  </div>
                  <div className="space-y-3">
                    {userData.wallet.recentTransactions.map((transaction) => (
                      <div key={transaction.id} 
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'CREDIT' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-red-100 text-red-600'
                          }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {transaction.type === 'CREDIT' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                              )}
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <p className={`font-medium ${
                          transaction.type === 'CREDIT' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'CREDIT' ? '+' : '-'}${Math.abs(transaction.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saved Payment Methods */}
                <div className="md:col-span-3">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Saved Payment Methods</h3>
                    <button 
                      className="text-sm text-purple-600 hover:text-purple-700"
                      onClick={() => toast.info('Add payment method coming soon!')}
                    >
                      Add New
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {userData.wallet.savedPayments.map((payment) => (
                      <div key={payment.id} 
                        className="p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors relative group"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {payment.type === 'UPI' ? (
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
                                  />
                                </svg>
                              ) : (
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                                  />
                                </svg>
                              )}
                              <span className="font-medium text-gray-900">{payment.type}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{payment.name}</p>
                          </div>
                          {payment.isDefault && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-gray-900/5 rounded-xl">
                          <button className="px-3 py-1 bg-white shadow-lg rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Manage
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-span-full ${activeTab === 'support' ? 'block' : 'hidden md:block'}`}>
            {/* Support & Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Support & Help
                </h2>

                <div className="space-y-4">
                  <button 
                    onClick={() => toast.info('Complaint feature coming soon!')}
                    className="w-full p-4 rounded-xl border border-purple-100 hover:bg-purple-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Raise New Complaint</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Active Tickets</h3>
                    {userData.support.activeTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-900">{ticket.subject}</p>
                          <p className="text-sm text-gray-500">{ticket.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ticket.status === 'Open' 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Emergency Contacts</h3>
                    {userData.support.emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <a href={`tel:${contact.number}`} className="text-purple-600 hover:text-purple-700 font-medium">
                          {contact.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">Language</p>
                      <p className="text-sm text-gray-500">Current: {userData.settings.language}</p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-700 font-medium">
                      Change
                    </button>
                  </div>

                  <button 
                    onClick={() => toast.info('Change password coming soon!')}
                    className="w-full p-4 rounded-xl border border-gray-100 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">Change Password</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button className="w-full p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            padding-top: 56px; /* Height of the mobile navigation */
          }
        }

        @media (max-width: 768px) {
          .section-full-width {
            grid-column: 1 / -1;
          }
        }

        /* Add smooth transitions */
        .tab-indicator {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default UserProfilePage;