import React, { useState } from 'react';
import './Login1.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
const LoginBox = () => {
    const [signIn, toggle] = React.useState(true);
    const {signup , currentUser} = useAuth()
    const navigate = useNavigate();
    const { login } = useAuth()
    const emailRef = useRef()
    const logemailRef = useRef()
    const nameRef = useRef()
    const LocationRef = useRef()
    const passwordRef = useRef()
    const logpasswordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    async function handleSubmit(e) {
        e.preventDefault();

        const displayName = nameRef.current.value;
        const Location = LocationRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (!displayName || !email || !password || !Location || !passwordConfirm) {
            enqueueSnackbar('Please fill in all details.', { variant: 'error' });
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        setLoading(true);
        signup(email, password, displayName, Location)
          .then(() => {
            enqueueSnackbar('Account created successfully!', { variant: 'success' });
            console.log("Account created successfully");
            setTimeout(() => {
              navigate("/Form");
            }, 1000);
          })
          .catch((error) => {
            console.error("Error creating account:", error);
            setError("Failed to create an account");
            setLoading(false);
          });
        

        setLoading(false);
    }
    async function handleSubmitlogin(e) {
        e.preventDefault();

        const email = logemailRef.current.value;
        const password = logpasswordRef.current.value;

        if (!email || !password) {
            enqueueSnackbar('Please fill in all details.', { variant: 'error' });
            return;
        }

        try {
            setError("");
            setLoading(true);
            await login(email, password);
            enqueueSnackbar('Login successful!', { variant: 'success' });
            setTimeout(() => {
                navigate("/Form");
            }, 1000);
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }
  return (
    <div className="loginpage">
    <div className="login-box"signinIn={signIn}>
      <h2>Login</h2>
      <form onSubmit={handleSubmitlogin}>
        <div className="user-box">
          <input ref={logemailRef} type='email' required />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input ref={logpasswordRef} type="password" required />
          <label>Password</label>
        </div>
        <button  disabled={loading}>Login</button>
      </form>
    </div>
    </div>
    
  );
};

export default LoginBox;
