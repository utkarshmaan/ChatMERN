import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (currentState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }
    login(currentState === "Sign Up" ? 'signup' : 'login', { fullName, email, password, bio })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#060e20] via-[#0f1930] to-[#1a2a4a] flex flex-col items-center justify-center px-4'>
      {/* Header */}
      <div className='text-center mb-12'>
        {/* <div className='flex justify-center mb-3'>
          <img src={assets.logo_big} alt='EtherChat' className='w-16 h-16' />
        </div> */}
        {/* <h1 className='text-4xl font-bold text-white mb-2'>EtherChat</h1>
        <p className='text-gray-400 text-sm tracking-widest uppercase'>Digital Sanctuary</p> */}
      </div>

      {/* Login Card */}
      <div className='w-full max-w-md rounded-3xl border border-gray-700 bg-[#0f1930]/80 backdrop-blur p-8 shadow-2xl'>
        
        {/* Title */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-white mb-2'>
            {currentState === "Login" ? "Welcome Back to your Sanctuary" : "Begin Your Journey"}
          </h2>
          <p className='text-gray-400 text-sm'>
            {currentState === "Login" 
              ? "Please enter your credentials to reconnect." 
              : "Create an account to get started."}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className='space-y-4'>
          
          {/* Full Name - Sign Up Only */}
          {currentState === "Sign Up" && !isDataSubmitted && (
            <div>
              <label className='text-xs uppercase text-gray-400 font-semibold tracking-wide'>Full Name</label>
              <input
                type='text'
                placeholder='John Doe'
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='w-full mt-2 rounded-lg bg-[#1a2a4a] border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              />
            </div>
          )}

          {/* Email */}
          {!isDataSubmitted && (
            <div>
              <label className='text-xs uppercase text-gray-400 font-semibold tracking-wide'>Username</label>
              <div className='flex items-center mt-2 rounded-lg bg-[#1a2a4a] border border-gray-600 px-4'>
                <span className='text-gray-500 mr-2'>@</span>
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full bg-transparent py-3 text-white placeholder-gray-500 focus:outline-none'
                />
              </div>
            </div>
          )}

          {/* Password */}
          {!isDataSubmitted && (
            <div>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-xs uppercase text-gray-400 font-semibold tracking-wide'>Password</label>
                {/* {currentState === "Login" && (
                  <a href='#' className='text-xs text-purple-400 hover:text-purple-300 transition'>Forgot?</a>
                )} */}
              </div>
              <div className='flex items-center rounded-lg bg-[#1a2a4a] border border-gray-600 px-4'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-transparent py-3 text-white placeholder-gray-500 focus:outline-none'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='text-gray-400 hover:text-gray-300 transition focus:outline-none'
                >
                  {showPassword ? 
                  'Hide' 
                  : 
                  'Show'
                  }
                </button>
              </div>
            </div>
          )}

          {/* Bio - Sign Up Only */}
          {currentState === "Sign Up" && isDataSubmitted && (
            <div>
              <label className='text-xs uppercase text-gray-400 font-semibold tracking-wide'>Bio</label>
              <textarea
                placeholder='Tell us about yourself...'
                rows={4}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className='w-full mt-2 rounded-lg bg-[#1a2a4a] border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none'
              />
            </div>
          )}

          {/* Agreement Checkbox - Sign Up Only */}
          {currentState === "Sign Up" && (
            <div className='flex items-center gap-2 text-xs text-gray-400 pt-2'>
              <input type='checkbox' required className='cursor-pointer' />
              <p>Agree to the terms of use & privacy policy.</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition duration-300 cursor-pointer'
          >
            {isDataSubmitted && currentState === "Sign Up"
              ? "Complete Account"
              : currentState === "Sign Up"
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* Divider */}
        {/* {!isDataSubmitted && (
          <>
            <div className='flex items-center gap-4 my-6'>
              <div className='flex-1 h-px bg-gray-700'></div>
              <span className='text-gray-400 text-xs uppercase'>Or</span>
              <div className='flex-1 h-px bg-gray-700'></div>
            </div>

            Google Sign-In 
            <button
              type='button'
              className='w-full py-3 rounded-full border border-gray-600 text-white font-semibold hover:bg-gray-700/50 transition duration-300 flex items-center justify-center gap-2'
            >
              <span>🔍</span> Continue with Google
            </button>
          </>
        )} */}

        {/* Toggle Form State */}
        {isDataSubmitted && currentState === "Sign Up" && (
          <button
            type='button'
            onClick={() => setIsDataSubmitted(false)}
            className='w-full mt-4 py-2 text-gray-400 text-sm hover:text-white transition'
          >
            ← Back to form
          </button>
        )}

        {/* Footer Links */}
        <div className='mt-6 text-center text-sm text-gray-400'>
          {currentState === "Login" ? (
            <p>
              New to the Sanctuary?{' '}
              <span
                onClick={() => {
                  setCurrentState("Sign Up")
                  setIsDataSubmitted(false)
                }}
                className='text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition'
              >
                Begin Journey
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => {
                  setCurrentState("Login")
                  setIsDataSubmitted(false)
                }}
                className='text-purple-400 font-semibold cursor-pointer hover:text-purple-300 transition'
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Footer Security Badge */}
      {/* <div className='mt-12 text-center text-xs text-gray-600 flex gap-4'>
        <span>🔐 END-TO-END ENCRYPTED</span>
        <span>☁️ ETHER CLOUD SYNC</span>
      </div> */}
    </div>
  )
}

export default Login