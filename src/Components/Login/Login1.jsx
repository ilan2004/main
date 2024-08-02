import React, { useState, useRef } from 'react';
import './Login1.css';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';
import { SnackbarProvider } from 'notistack';

const LoginBox = () => {
    const [signIn, toggle] = useState(true);
    const { signup, login, loginAsManager } = useAuth(); // Ensure loginAsManager is in your AuthContext
    const navigate = useNavigate();
    const logemailRef = useRef();
    const logpasswordRef = useRef();
    const [companyName, setCompanyName] = useState(''); // New state for company name
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [loginType, setLoginType] = useState('user'); // 'user' or 'manager'

    const handleLoginTypeChange = (type) => {
        setLoginType(type);
        enqueueSnackbar(`Switched to ${type === 'manager' ? 'Manager' : 'User'} login`, { 
            variant: 'info',
            autoHideDuration: 2000,
        });
    };

    async function handleSubmitlogin(e) {
        e.preventDefault();

        const email = logemailRef.current.value;
        const password = logpasswordRef.current.value;

        if (!email || !password || (loginType === 'manager' && !companyName)) {
            enqueueSnackbar('Please fill in all details.', { variant: 'error' });
            return;
        }

        try {
            setError("");
            setLoading(true);
            if (loginType === 'manager') {
                await loginAsManager(email, password, companyName);
                enqueueSnackbar('Manager login successful!', { variant: 'success' });
                setTimeout(() => {
                    navigate("/ManagerDashboard"); // Route for manager dashboard
                }, 1000);
            } else {
                await login(email, password);
                enqueueSnackbar('User login successful!', { variant: 'success' });
                setTimeout(() => {
                    navigate("/Dashboard"); // Route for user dashboard
                }, 1000);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Failed to log in");
            enqueueSnackbar('Login failed. Please check your credentials.', { variant: 'error' });
        }

        setLoading(false);
    }

    return (
      <SnackbarProvider maxSnack={3}>
        <div className="loginpage">
            <div className="login-box" signinIn={signIn}>
                <h2>Login</h2>
                <div className="login-options">
                    <button 
                        onClick={() => handleLoginTypeChange('user')} 
                        className={loginType === 'user' ? 'active' : ''}
                    >
                        Login as User
                    </button>
                    <button 
                        onClick={() => handleLoginTypeChange('manager')} 
                        className={loginType === 'manager' ? 'active' : ''}
                    >
                        Login as Manager
                    </button>
                </div>
                <form onSubmit={handleSubmitlogin}>
                    <div className="user-box">
                        <input ref={logemailRef} type='email' required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input ref={logpasswordRef} type="password" required />
                        <label>Password</label>
                    </div>
                    {loginType === 'manager' && (
                        <div className="user-box">
                            <input 
                                type="text" 
                                value={companyName} 
                                onChange={(e) => setCompanyName(e.target.value)} 
                                required 
                            />
                            <label>Company Name</label>
                        </div>
                    )}
                    <button disabled={loading}>
                        {loginType === 'manager' ? 'Login as Manager' : 'Login as User'}
                    </button>
                </form>
            </div>
        </div>
        </SnackbarProvider>
    );
};

export default LoginBox;
