import React, { useState } from 'react';
import { useRef } from 'react';
import './Login.scss'
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-mobile">
    
    <div className="form-body">
    <div className="form-structor">
      <div className={isLogin ? "signup slide-up" : "signup"}>
        <h2 className="form-title" onClick={toggleForm}><span>or</span>Sign up</h2>
        <div className="form-holder">
          <input type="text" className="input" placeholder="Name" />
          <input type="email" className="input" placeholder="Email" />
          <input type="password" className="input" placeholder="Password" />
        </div>
        <button className="submit-btn">Sign up</button>
      </div>
      <div className={isLogin ? "login" : "login slide-up"}>
        <div className="center">
          <h2 className="form-title" onClick={toggleForm}><span>or</span>Log in</h2>
          <div className="form-holder">
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Password" />
          </div>
          <button className="submit-btn">Log in</button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
