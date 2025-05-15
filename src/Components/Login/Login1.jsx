import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useAuth } from '../../Contexts/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Label } from '../ui/label';
import { Input } from "../ui/imput";
import { cn } from '../../lib/utils';

export default function LoginBox() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      enqueueSnackbar('Please fill in all details.', { variant: 'warning' });
      return;
    }

    try {
      setLoading(true);
      
      // Check internet connection
      if (!navigator.onLine) {
        throw new Error("No internet connection");
      }

      // Authenticate the user
      const userCredential = await login(email, password);
      const user = userCredential.user;

      // Get the user's role from Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        enqueueSnackbar('Login successful!', { variant: 'success' });
        
        // Redirect based on user role
        setTimeout(() => {
          if (userRole === 'manager') {
            navigate("/ManagerDashboard");
          } else {
            navigate("/Dashboard");
          }
        }, 1000);
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        enqueueSnackbar('Invalid email or password. Please try again.', { variant: 'error' });
      } else if (error.message === "No internet connection") {
        enqueueSnackbar('No internet connection. Please check your network and try again.', { variant: 'error' });
      } else if (error.message === "User data not found") {
        enqueueSnackbar('User account issue. Please contact support.', { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred. Please try again later.', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  }, [login, navigate, enqueueSnackbar]);

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Login
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="user@example.com" type="email" ref={emailRef} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" ref={passwordRef} />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};