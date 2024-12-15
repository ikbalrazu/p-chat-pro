import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  const location = useLocation();
  const {authUser} = useAuthStore();

  const basePath = location.pathname === '/'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className='bg-white lg:block'>
        {/* <Sidebar/> */}
      </section>
      <section>
        section 2
      </section>
      
    </div>
    // <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
    //     <section className={`bg-white lg:block`}>
    //        <Sidebar/>
    //     </section>

    //     {/**message component**/}
    //     {/* <section className={`${basePath && "hidden"}`} >
    //         <Outlet/>
    //     </section> */}


    //     <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
    //         <div>
    //           {/* <img
    //             src={logo}
    //             width={250}
    //             alt='logo'
    //           /> */}
    //         </div>
    //         <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
    //     </div>
    // </div>
  )
}

export default HomePage