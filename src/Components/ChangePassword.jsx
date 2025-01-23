import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const API_URL = import.meta.env.VITE_APP_API_URL
const ChangePassword = () => {
    const INITIAL_STATE = {
        oldPassword : '',
        newPassword : '',
        confirmNewPassword : ''
    }
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('New password must match the Confirm new password')
            return;
        }
        await fetch(`${API_URL}/password/change`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(formData),
        }).then(response => response.json()).then(result => alert(result.message))
        setFormData(INITIAL_STATE)
    }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className=" py-16 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto">
      <div className='w-full p-8 flex flex-col items-center'>
      <div className='text-center text-3xl font-medium text-black mb-8'>Change Password</div>
      <form action="" onSubmit={handleSubmit} className="w-full sm:w-auto flex px-3 flex-col mt-3 space-y-3 sm:space-y-5 text-black">
          <TextField 
              type={showOldPassword?'text':'password'} 
              size='small'
              InputProps={{
                endAdornment: <Box className="h-4 cursor-pointer" onClick={()=>setShowOldPassword((prev)=>!prev)}>
                  {!showOldPassword?<FaEye/>:<FaEyeSlash/>}
                </Box>
              }} 
              placeholder="Old Password" 
              value={formData.oldPassword} 
              onChange={handleChange} 
              name="oldPassword" 
              className="py-2 px-3 rounded-xl w-full sm:w-[400px]" 
            />
            <TextField 
              type={showNewPassword?'text':'password'} 
              size='small'
              InputProps={{
                endAdornment: <Box className="h-4 cursor-pointer" onClick={()=>setShowNewPassword((prev)=>!prev)}>
                  {!showNewPassword?<FaEye/>:<FaEyeSlash/>}
                </Box>
              }} 
              placeholder="New Password" 
              value={formData.newPassword} 
              onChange={handleChange} 
              name="newPassword"  
              className="py-2 px-3 rounded-xl w-full sm:w-[400px]" 
            />
            <TextField 
              type={showConfirmPassword?'text':'password'} 
              size='small'
              InputProps={{
                endAdornment: <Box className="h-4 cursor-pointer" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                  {!showConfirmPassword?<FaEye/>:<FaEyeSlash/>}
                </Box>
              }} 
              placeholder="Confirm New Password" 
              value={formData.confirmNewPassword} 
              onChange={handleChange} 
              name="confirmNewPassword" 
              className="py-2 px-3 rounded-xl w-full sm:w-[400px]" 
            />
          <Button type="submit" variant='contained' disabled={!formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword}>Change password</Button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
