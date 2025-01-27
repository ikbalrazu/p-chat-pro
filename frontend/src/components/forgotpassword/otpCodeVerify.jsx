import React from 'react';
import { IoIosArrowBack } from "react-icons/io";

const otpCodeVerify = () => {
  return (
    <div className='flex flex-col min-h-screen p-6'>
        <div className='flex justify-between'>
            <Link to='/login'><IoIosArrowBack size={20} /></Link>
            <a>Need Help?</a>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 mt-5'>
            <h2 className='text-2xl font-bold'>Reset your password</h2>
            <p className='text-md text-[#002D74]'>Please enter your email and we will send an OTP code in the next step to reset your password!</p>
            <div className='flex flex-col p-2 w-80'>
                <label className='text-[#777778] font-bold text-sm'>Email Address</label>
                <input className='rounded-xl border p-2 mt-2' type='email' placeholder='Enter your email'/>
                <button className='mt-5 bg-[#002D74] rounded-xl text-white py-2'>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default otpCodeVerify