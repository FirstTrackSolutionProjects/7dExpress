import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTag, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import EmailOTPVerificationModal from '../Components/Modals/EmailOTPVerificationModal';
import registerService from '../services/register';
import { toast } from 'react-toastify';
import { Box, Button, TextField } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    reg_email: "",
    reg_password: "",
    confirm_password: "",
    business_name: "",
    mobile: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isAuthenticated, login, verified, emailVerified } = useAuth();
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const navigate = useNavigate();

  const closeEmailModal = () => {
    setEmailModalOpen(false);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let validationErrors = false;

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      toast.error("Full name should contain alphabets only")
      validationErrors = true;
    }

    if (!/\S+@\S+\.\S+/.test(formData.reg_email)) {
      toast.error("Invalid email format")
      validationErrors = true;
    }

    if (formData.reg_password.length < 4) {
      toast.error("Password should be at least 4 characters")
      validationErrors = true;
    }

    if (formData.reg_password !== formData.confirm_password) {
      toast.error("Passwords do not match")
      validationErrors = true;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number should be exactly 10 digits")
      validationErrors = true;
    }

    return validationErrors;
  };

  useEffect(()=>{
    console.log("validation", isAuthenticated)
    if (isAuthenticated && verified){
      navigate("/dashboard")
    } else if (isAuthenticated && emailVerified){
      navigate("/verify")
    } else if (isAuthenticated){
      setEmailModalOpen(true);
    }
  },[isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (!validationErrors) {
      try {
        const registerResponse = await registerService(formData)
        if (registerResponse?.success) {
          toast.success("User registered successfully!");
          await login(registerResponse?.token)
        } else {
          toast.error(registerResponse?.message || "Registration failed, please try again.");
        }
      } catch (err) {
        toast.error("Unexpected Error Occured");
      }
    } else {
      toast.error("Please check form format!");
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      {emailModalOpen && <EmailOTPVerificationModal open={emailModalOpen} onClose={closeEmailModal}  />}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg my-3">
        <div className="text-3xl font-bold mb-5 text-sky-950">Sign Up</div>
        <div className="text-[14px] font-bold mb-5 text-sky-900">Signing up is easy. It only takes a few steps</div>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="business_name" className="block text-sm font-medium text-gray-700">Business Name</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faUserTag} className="w-5 justify-center mt-4 mr-2 text-sky-950" />
            <TextField
              size="small"
              type="text"
              id="business_name"
              name='business_name'
              value={formData.business_name}
              onChange={handleChange}
              placeholder=""
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Full Name</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faUser} className="w-5 justify-center mt-4 mr-2 text-sky-950" />
            <TextField
              type="text"
              size="small"
              id="name"
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faPhone} className="w-5 justify-center mt-4 mr-2 text-sky-950" />
            <TextField
              size="small"
              type="text"
              id="mobile"
              name='mobile'
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="reg_email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faEnvelope} className="w-5 justify-center mt-4 mr-2 text-sky-950" />
            <TextField
              type="email"
              size="small"
              id="reg_email"
              name='reg_email'
              value={formData.reg_email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="reg_password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faLock} className="w-5 justify-center mt-4 mr-2 text-sky-950" />
            <TextField
              type={showPassword?'text':'password'}
              size="small"
              id="reg_password"
              name='reg_password'
              value={formData.reg_password}
              onChange={handleChange}
              InputProps={{
                endAdornment: <Box className="h-4 cursor-pointer" onClick={()=>setShowPassword((prev)=>!prev)}>{!showPassword?<FaEye/>:<FaEyeSlash/>}</Box>
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faLock} className="w-5 justify-center mt-4 mr-2 text-sky-950" />
            <TextField
              type={showConfirmPassword?'text':'password'}
              id="confirm_password"
              size="small"
              name='confirm_password'
              value={formData.confirm_password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: <Box className="h-4 cursor-pointer" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>{!showConfirmPassword?<FaEye/>:<FaEyeSlash/>}</Box>
              }}
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div className='w-full flex justify-center'>
            <Button
              type="submit"
              variant='contained'
              disabled={
                formData.business_name.trim() === "" ||
                formData.name.trim() === "" ||
                formData.mobile.trim() === "" ||
                formData.reg_email.trim() === "" ||
                formData.reg_password.trim() === "" ||
                formData.confirm_password.trim() === ""
              }
              className="w-64 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-950 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center">
              <p className="text-gray-700">
                Already have an account?{' '}
                <button
                  className="text-sky-900 hover:underline"
                  onClick={navigateToLogin}
                >
                  Login
                </button>
              </p>
            </div>
        </form>
      </div>
    </>
  )
}

const SignupForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-login bg-cover">
       <Form />
    </div>
  );
};

export default SignupForm;
