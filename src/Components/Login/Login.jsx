import React, { useState } from 'react';
import { useRef } from 'react';
import './Login.scss'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [signIn, toggle] = React.useState(true);
    const {signup , currentUser} = useAuth()
    const navigate = useNavigate();
    const { login } = useAuth()
    const emailRef = useRef()
    const logemailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const logpasswordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    async function handleSubmit(e) {
        e.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;

        if (!name || !email || !password || !passwordConfirm) {
            enqueueSnackbar('Please fill in all details.', { variant: 'error' });
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password);
            enqueueSnackbar('Account created successfully!', { variant: 'success' }); // Snackbar for successful account creation
            form.current.reset();
            setTimeout(() => {
                 navigate("/Form");
             }, 1000);
        } catch {
            setError("Failed to create an account");
        }

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
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-mobile">
    <div className="form-body">
    <div className="form-structor">
      <form onSubmit={handleSubmit} className={isLogin ? "signup slide-up" : "signup"}>
 
        <h2 className="form-title" onClick={toggleForm}><span>or</span>SIGN UP </h2>
        <div className="form-holder">
          <input ref={nameRef} type="text" className="input" placeholder="Name" />
          <input ref={emailRef} type="email" className="input" placeholder="Email" />
          <input ref={passwordRef} type="password" className="input" placeholder="Password" />
          <input ref={passwordConfirmRef} type="password" className="input" placeholder="confirm-Password" />
        </div>
        <button disabled={loading} className="submit-btn">Sign up</button>
      </form>
      <form onSubmit={handleSubmitlogin} className={isLogin ? "login" : "login slide-up"}>

        <div className="center">
          <h2 className="form-title" onClick={toggleForm}><span>or</span>Log in</h2>
          <div className="form-holder">
            <input ref={logemailRef} type="email" className="input" placeholder="Email" />
            <input ref={logpasswordRef} type="password" className="input" placeholder="Password" />
          </div>
          <button disabled={loading} className="submit-btn">Log in</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Login;
