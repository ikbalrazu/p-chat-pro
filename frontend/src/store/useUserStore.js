import { create } from "zustand";

export const useUserStore = create((set)=>({
    friends: [],
    searchQueryResults: [],
    
    setFriendsList: async(ids)=>{
        console.log(ids);
    },

    setFriendsList: async(ids) => {
        try {
            await axiosInstance.post("/user/all-friends",{ids});
        } catch (error) {
            toast.error(error.response.data.message);
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
