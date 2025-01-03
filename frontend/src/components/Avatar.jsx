import React from 'react';
import { PiUserCircle } from "react-icons/pi";

const Avatar = ({userId,name,width,height,imageUrl}) => {
    let avatarName = "";
    
    if(name){
        const splitName = name?.split(" ")
  
        if(splitName.length > 1){
          avatarName = splitName[0][0]+splitName[1][0]
        }else{
          avatarName = splitName[0][0]
        }
    }
  return (
    <div className={`text-slate-800  rounded-full font-bold relative`} style={{width : width+"px", height : height+"px" }}>
        {
            imageUrl ? (
                <img
                    src={imageUrl}
                    width={width}
                    height={height}
                    alt={name}
                    className='overflow-hidden rounded-full'
                />
            ) : (
                name ? (
                    <div  style={{width : width+"px", height : height+"px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-lg`}>
                        {avatarName}
                        
                    </div>
                ) :(
                  <PiUserCircle
                    size={width}
                  />
                )
            )
        }

        {/* {
          isOnline && (
            <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>
          )
        } */}
      
    </div>
  )
}

export default Avatar