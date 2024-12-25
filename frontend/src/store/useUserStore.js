import { create } from "zustand";

export const useUserStore = create((set)=>({
    friends: [],
    
    setFriendsList: async(ids)=>{
        console.log(ids);
    },

    setFriendsList: async(ids) => {
        try {
            await axiosInstance.post("/user/all-friends",{ids});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

}))
