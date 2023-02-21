import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import GroupPosts from '../components/posts/GroupPosts';
//import Posts from '../components/posts/GroupPosts';
//import NewPost from './../components/posts/NewPost';

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
          <p><b>Current User: { currentUser } is visiting a group with the ID { groupID }</b></p>
          <GroupPosts groupID = { groupID } currentUser = { currentUser } />
          <Link className="" to="/groups"> Groups </Link>
        </div>
    )
}

export default IndividualGroup;

/*

<p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
*/