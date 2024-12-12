import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            
        } catch (error) {
            console.log("Error in checkAuth:", error.message);
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async(data)=>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            console.log(res.data);
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in signup:", error.message);
        }finally{
            set({ isSigningUp: false });
        }
    },

    login: async(data)=>{
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in login:", error.message);
        }finally{
            set({ isLoggingIn: false });
        }
    },

}))