import React, { useState, useRef, useEffect } from 'react';
import './Signup.css';
import { useSnackbar, SnackbarProvider } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const SignupBox = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const logemailRef = useRef();
  const logpasswordRef = useRef();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('user'); // Set default role to 'user'
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Debug: Log role changes
  useEffect(() => {
    console.log("Current role:", role);
  }, [role]);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = logemailRef.current.value;
    const password = logpasswordRef.current.value;

    if (!email || !password || password !== confirmPassword || !displayName || !companyName || !role) {
      enqueueSnackbar('Please fill in all details correctly.', { variant: 'error' });
      return;
    }

    try {
      setError("");
      setLoading(true);
      console.log("Submitting with role:", role); // Debug: Log role before submission
      await signup(email, password, displayName, companyName, role);
      enqueueSnackbar('Account creation successful!', { variant: 'success' });
      setTimeout(() => {
        navigate(role === 'manager' ? "/ManagerDashboard" : "/Dashboard");
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to create account");
      enqueueSnackbar('Account creation failed. Please check your details.', { variant: 'error' });
    }

    setLoading(false);
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="loginpage">
        <div className="login-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input ref={logemailRef} type='email' required />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input ref={logpasswordRef} type="password" required />
              <label>Password</label>
            </div>
            <div className="user-box">
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
              <label>Confirm Password</label>
            </div>
            <div className="user-box">
              <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                required 
              />
              <label>Display Name</label>
            </div>
            <div className="user-box">
              <input 
                type="text" 
                value={companyName} 
                onChange={(e) => setCompanyName(e.target.value)} 
                required 
              />
              <label>Company Name</label>
            </div>
            <div className="user-box">
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                required
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
              <label>Role</label>
            </div>
            <button disabled={loading}>
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default SignupBox;