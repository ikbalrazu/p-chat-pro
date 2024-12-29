import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useUserStore = create((set)=>({
    myFriends: [],
    searchQueryResults: [],
    
    // setFriendsList: async(ids)=>{
    //     console.log(ids);
    // },

    getMyFriends: async() => {
        try {
            const response = await axiosInstance.get("/user/my-friends");
            set({myFriends: response.data});
        } catch (error) {
            toast.error(error.message);
        }
    },

    searchFriends: async(query)=>{
        try {
            console.log(query);
            const response = await axiosInstance.get(`/user/search-friends?query=${query}`);
            console.log(response);
            if (response.data.users) {
                set({searchQueryResults:response.data.users})
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    

}))
