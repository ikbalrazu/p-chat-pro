import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    friendList: [],
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    userProfileShow: false,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            set({friendList: res.data.friends});
            
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async(data)=>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            toast.success("Account created successfully");
            set({ authUser: res.data });
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
        }finally{
            set({ isSigningUp: false });
        }
    },

    login: async(data)=>{
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login Successful!")
        } catch (error) {
            toast.dismiss();
            toast.error(error?.response?.data?.message)
        }finally{
            set({ isLoggingIn: false });
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

}))