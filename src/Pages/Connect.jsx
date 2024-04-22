import React from 'react'
import Logindesktop from '../Components/Login/Logindesktop/Logindesktop'
import { AuthProvider } from '../Contexts/AuthContext'
import Login from '../Components/Login/Login'
 const Connect = () => {
  return (
    <div>
        <AuthProvider>
        <Logindesktop/>
        <Login/>
        </AuthProvider>

    </div>
  )
}
export default Connect
