'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LoaderCircle, Mail, ArrowRight } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChromeIcon  } from '@hugeicons/core-free-icons';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // hint i prodution in this add ture false with query adn this url changeing 
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (isSignUp && !formData.name) newErrors.name = 'Name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Success - redirect or show success message
    console.log('Form submitted:', formData);
    setIsLoading(false);
    // Handle success
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Handle OAuth login
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setShowEmailForm(false);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative">
      {/* ProjectAPI Logo - Top Left */}
      <div className="absolute top-8 left-8">
        <span className="text-2xl font-semibold tracking-tight text-[#FFFBF4] font-space-grotesk">
          ProjectAPI
        </span>
      </div>

      {/* Auth Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] bg-[#141414] border border-white/10 rounded-2xl p-12"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#FFFBF4] font-space-grotesk leading-tight">
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-[#D8CFBC] mt-1.5">
            {isSignUp 
              ? 'Start building with ProjectAPI today.' 
              : 'Log in to manage your projects and API.'}
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">

          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full h-11 flex items-center justify-center gap-2.5 bg-[#141414] border border-white/10 rounded-lg text-sm font-medium text-[#FFFBF4] hover:border-white/20 transition-all duration-200"
          >
           <HugeiconsIcon icon={ChromeIcon} />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-[#D8CFBC]">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Email Login Trigger */}
        <AnimatePresence mode="wait">
          {!showEmailForm ? (
            <motion.button
              key="email-trigger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmailForm(true)}
              className="w-full h-11 flex items-center justify-center gap-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm font-medium text-[#D8CFBC] hover:border-white/20 transition-all duration-200"
            >
              <Mail className="size-4" />
              Continue with email
              <ArrowRight className="size-4 ml-auto opacity-50" />
            </motion.button>
          ) : (
            <motion.form
              key="email-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Name Field - Sign Up Only */}
              {isSignUp && (
                <div>
                  <label className="text-xs text-[#D8CFBC] block mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full h-11 px-3 bg-[#0A0A0A] border ${
                      errors.name ? 'border-[#F87171]' : 'border-white/10'
                    } rounded-lg text-sm text-[#FFFBF4] outline-none focus:border-white/30 transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-xs text-[#F87171] mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="text-xs text-[#D8CFBC] block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full h-11 px-3 bg-[#0A0A0A] border ${
                    errors.email ? 'border-[#F87171]' : 'border-white/10'
                  } rounded-lg text-sm text-[#FFFBF4] outline-none focus:border-white/30 transition-colors`}
                />
                {errors.email && (
                  <p className="text-xs text-[#F87171] mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#D8CFBC]">Password</label>
                  {!isSignUp && (
                    <a href="#" className="text-xs text-[#D8CFBC] hover:underline underline-offset-4">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full h-11 px-3 pr-10 bg-[#0A0A0A] border ${
                      errors.password ? 'border-[#F87171]' : 'border-white/10'
                    } rounded-lg text-sm text-[#FFFBF4] outline-none focus:border-white/30 transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D8CFBC]"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#F87171] mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password - Sign Up Only */}
              {isSignUp && (
                <div>
                  <label className="text-xs text-[#D8CFBC] block mb-1.5">
                    Confirm password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full h-11 px-3 bg-[#0A0A0A] border ${
                      errors.confirmPassword ? 'border-[#F87171]' : 'border-white/10'
                    } rounded-lg text-sm text-[#FFFBF4] outline-none focus:border-white/30 transition-colors`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#F87171] mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#FBF7F4] text-[#0A0A0A] font-semibold text-sm rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#e8e4df] disabled:opacity-70"
              >
                {isLoading ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  isSignUp ? 'Create account' : 'Log in'
                )}
              </button>

              {/* Back to social login */}
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="w-full text-xs text-[#D8CFBC] hover:text-[#FFFBF4] transition-colors"
              >
                ← Back to social login
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-8 right-8 text-sm text-[#D8CFBC]">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        {' '}
        <button
          onClick={toggleForm}
          className="text-[#FFFBF4] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;