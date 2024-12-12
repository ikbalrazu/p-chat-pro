import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const success = validateForm();
    console.log();
    if (success === true){
      signup(formData);
    }
  };

  return (
    <section className='bg-gray-60 min-h-screen flex justify-center items-center'>
      {/* login container */}
      <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5'>
      {/* login form */}
      <div className='md:w-1/2 px-10 md:px-16'>
      <h1 className='font-bold text-2xl text-[#002D74]'>Sign up</h1>
      <p className='text-sm mt-4 text-[#002D74]'>Get started with free account</p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        className='p-2 mt-8 rounded-xl border' 
        type='text' 
        name='fullname' 
        placeholder='Fullname'
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <input 
        className='p-2 rounded-xl border' 
        type='text' 
        name='email' 
        placeholder='Email'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
        className='p-2 rounded-xl border' 
        type='password' 
        name='password' 
        placeholder='Password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button 
        className='bg-[#002D74] rounded-xl text-white py-2'
        type='submit'
        disabled={isSigningUp}
        >Sign Up</button>
      </form>

      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className='border-gray-400'/>
        <p class="text-center text-sm">OR</p>
        <hr class="border-gray-400"/>
      </div>

      <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Login with Google
      </button>

      {/* <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
        <a href="#">Forgot your password?</a>
      </div> */}

      <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        <p>Already have an account?</p>
        <Link to='/login' className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</Link>
      </div>

      </div>

      {/* image */}
      <div className='w-1/2 sm:block hidden'>
      <img className='rounded-2xl' src='https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'/>
      </div>

      </div>
    </section>
  )
}

export default SignUp