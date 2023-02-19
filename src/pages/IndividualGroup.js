import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import Posts from '../components/posts/Posts';

import NewPost from './../components/posts/NewPost';

const IndividualGroup = () => {
    const { groupID } = useParams()

    //Login Status 
    const navigate = useNavigate();
    const { currentUser, setLoginState} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
  
    useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      if(currentUserLoggedIn == 'null' || currentUserLoggedIn == null) {
        setUserLoggedIn(false);
        console.log("Group Page: DONT BE HERE");
      } else {
        setUserLoggedIn(true);
        console.log("Group Page: OK STAY HERE")
      }
   }, []);

    return (
        <div>
            <NewPost groupID = { groupID } currentUser = { currentUser } />
            <Posts groupID = { groupID }/>
            <p><b> Your on a group! with the ID { groupID }</b></p>
            <p> Current User: { currentUser } </p>
            <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
            <Link className="" to="/groups"> Groups </Link>
        </div>
    )
}

export default IndividualGroup;
