import React from "react";
import * as Components from './Logindestop-comp';
import './Logindesk.css'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
const Logindesktop = () => {
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
     return(
        <div className="logindesk">
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form onSubmit={handleSubmit}>
                     <Components.Title>Create Account</Components.Title>
                     {currentUser && currentUser.email}
                     <Components.Input ref={nameRef} type='text' placeholder='Name' />
                     <Components.Input ref={emailRef} type='email' placeholder='Email' />
                     <Components.Input ref={passwordRef} type='password' placeholder='Password' />
                     <Components.Input ref={passwordConfirmRef} type='confirm-password' placeholder='confirm-Password' />
                     <Components.Button disabled={loading}>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form onSubmit={handleSubmitlogin} >
                      <Components.Title>Sign in</Components.Title>
                      {currentUser && currentUser.email}
                      <Components.Input ref={logemailRef}  type='email' placeholder='Email' />
                      <Components.Input ref={logpasswordRef}  type='password' placeholder='Password' />
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button disabled={loading}>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
         </div>
     )
}
const SignUpWithSnackbar = () => (
    <SnackbarProvider>
        <Logindesktop />
    </SnackbarProvider>
);

export default SignUpWithSnackbar;