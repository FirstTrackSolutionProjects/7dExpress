import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const EmailVerification = () => {
  const {authState} = useAuth()
  const navigate = useNavigate()
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email : authState?.email,
    otp : ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/.netlify/functions/verifyEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(formData),
  }).then(response => response.json()).then(result => {
    if (result.success) {
      navigate('/verify')
    }
    else {
      alert(result.message)
    }
  })
  }
  const handleOtp = async (e) => {
    setIsSending(true)
    await fetch('/.netlify/functions/sendVerifyEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({email : formData.email}),
    }).then(response => response.json()).then(result => {alert(result.message)}).catch((err)=>{alert("Something went wrong")})
    setIsSending(false)
}
  useEffect(()=>{
    handleOtp()
  },[])
  return (
    <>
      <div className={`relative  p-4 flex items-center justify-center bg-white`}>
      <form action="" onSubmit={handleSubmit} className="w-full sm:w-auto flex px-3 flex-col mt-3 space-y-3 sm:space-y-5 text-black">
        <input type="email" placeholder="Email Address" value={formData.email} readOnly name="email" className="py-2 px-3 border-black rounded-xl flex-1 sm:w-[400px]" />
        <div className='flex flex-1 space-x-2'>
        <input type="text" placeholder="OTP" name="otp" value={formData.otp} onChange={handleChange} className="py-2 px-3 rounded-xl border-black w-[180px] sm:w-[284px]"/>
            <button onClick={handleOtp} className="py-2 px-1 rounded-xl text-sm  w-[100px] border border-black  hover:bg-[rgba(135,206,235,1)]" disabled={isSending}>{isSending?"Requesting...":"Resend OTP"}</button>
          </div>
          <button type="submit" className="py-2 px-3 rounded-xl  w-full sm:w-[400px] border border-black  hover:bg-[rgba(135,206,235,1)]" disabled={isLoading}>{isLoading?"Verifying...":"Verify Email"}</button>
        </form>
      </div>
    </>
  )
}

export default EmailVerification