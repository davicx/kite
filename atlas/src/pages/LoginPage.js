import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, } from "react-router-dom"
import LoginHeader from '../components/login/LoginHeader';
import LoginHero from '../components/login/LoginHero';
import LoginProductPreview from '../components/login/LoginProductPreview';
import LoginFeatures from '../components/login/LoginFeatures';
import LoginHowItWorks from '../components/login/LoginHowItWorks';
import LoginRemediation from '../components/login/LoginRemediation';
import LoginAskCloudPilot from '../components/login/LoginAskCloudPilot';
import LoginBigIdea from '../components/login/LoginBigIdea';
import LoginCta from '../components/login/LoginCta';
import LoginFooter from '../components/login/LoginFooter';
import { LoginContext } from "../functions/context/LoginContext";

import '../style/login.css';

function LoginPage() {

  //Check Login Status 
  const { currentUser, setLoginState} = useContext(LoginContext);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("localStorageCurrentUser");
    const currentUserLoggedIn = JSON.parse(data);
    setLoginState(currentUserLoggedIn);

    if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
      setUserLoggedIn(false);
      console.log("No one is logged in right now");
      console.log("Login Page: OK STAY HERE");
    } else {
      setUserLoggedIn(true);
      console.log("Login Page: DONT BE HERE");
      console.log(currentUserLoggedIn + " is currently logged in");
      navigate("/chat");
    }
}, []);

    return (
      <div className="login-landing">
        <LoginHeader />
        <LoginHero />
        <LoginProductPreview />
        <LoginFeatures />
        <LoginHowItWorks />
        <LoginRemediation />
        <LoginAskCloudPilot />
        <LoginBigIdea />
        <LoginCta />
        <LoginFooter />
      </div>
    );
  }

export default LoginPage;
