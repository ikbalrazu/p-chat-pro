import { create } from "zustand";

export const useUserStore = create((set)=>({
    userProfileShow: false,

    setUserProfileShow: (userprofileshow)=>{
        console.log(userprofileshow);
        set({ userProfileShow: userprofileshow });
    },
}))
