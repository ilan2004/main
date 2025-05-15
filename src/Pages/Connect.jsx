import React from 'react'
import { AuthProvider } from '../Contexts/AuthContext'
import Login from '../Components/Login/Login'
 const Connect = () => {
  return (
    <div>
        <AuthProvider>
        <Login/>
        </AuthProvider>

    </div>
  )
}
export default Connect
