import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    friendList: [],
    friendRequestList: [],
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingProfileInfo: false,
    isCheckingAuth: true,
    userProfileShow: false,

    socket: null,
    onlineUsers: [],

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log(res);
            set({authUser: res?.data});
            set({friendList: res?.data?.friends});
            set({friendRequestList: res?.data?.friendRequests});
            // get().connectSocket();
            if(res.data){
                setTimeout(() => {
                    get().connectSocket();
                }, 100);
            }
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
            // toast.error(error.message);
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
            console.log(res);
            set({ authUser: res.data });
            toast.success("Login Successful!");
            get().connectSocket()
        } catch (error) {
            // toast.dismiss();
            console.log(error);
            toast.error(error?.response?.data?.message)
        }finally{
            set({ isLoggingIn: false });
        }
    },

    logout: async(navigate)=>{
        try {
            const {disconnectSocket} = get();
            const res = await axiosInstance.post("/auth/logout");
            console.log(res.data.message);
            if(res.data.message === "Logged out successfully"){
                disconnectSocket();
                set({authUser: null});
                toast.success("Logged out successfully");
                
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    },

    updateProfilePic: async(imagedata)=>{
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", imagedata);
            set({ authUser: res.data });
            toast.success("Profile Picture Updated!");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        }finally{
            set({ isUpdatingProfile: false });
        }
    },

    updateProfileInfo: async(data)=>{
        try {
            set({ isUpdatingProfileInfo: true});
            const res = await axiosInstance.put("/auth/update-profileinfo", data );
            set({ authUser: res.data });
            toast.success("Updated profile info!");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({ isUpdatingProfileInfo: false});
        }
    },

    connectSocket: () => {
        const {authUser,socket} = get();
        if(!authUser || (socket && socket.connected)) return;
        const socketInstance  = io(
            "http://localhost:5000",
            // { withCredentials: true },
            {query: {userId: authUser._id}}
        );
        socketInstance.connect();
        // socketInstance.on("connect", () => {
        //     console.log("Socket connected:", socketInstance.id);
        // });
        console.log(socket);
        set({ socket: socketInstance });

        socketInstance.on("getOnlineUsers", (userIds)=>{
            console.log(userIds);
            set({onlineUsers: userIds});
        })
    },

    disconnectSocket: () => {
        const {socket} = get();
        // if(socket.connected) {
        //     socket.disconnect();
        //     console.log("Socket disconnected");
        //     set({ socket: null });
        // }
        if(socket.connected) socket.disconnect();
        // if (socket && socket.connected) {
        //     socket.disconnect();
        //     console.log("Socket disconnected successfully.");
        //     set({ socket: null });
        // } else {
        //     console.log("Socket is not connected or already null.");
        // }
    }

}))