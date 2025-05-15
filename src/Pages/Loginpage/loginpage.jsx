import LoginBox from '../../Components/Login/Login1'
import React from 'react'
import styles from './page.module.css'
export const Loginpage = () => {
  return (
    <div className= {styles.loginpage}>
        <h1 className ='text-white dark:text-white relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2 text-balance text-left font-semibold tracking-tighter md:text-center text-5xl sm:text-7xl md:text-7xl lg:text-7xl'>
            Dashboard
        </h1>
        <LoginBox/>
    </div>
  )
}
