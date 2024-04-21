import React from 'react'
import Logindesktop from '../Components/Login/Logindesktop/Logindesktop'
import { AuthProvider } from '../Contexts/AuthContext'

 const Connect = () => {
  return (
    <div>
        <AuthProvider>
        <Logindesktop/>
        </AuthProvider>

    </div>
  )
}
export default Connect
