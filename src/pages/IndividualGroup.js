import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
//import Posts from './../components/posts/Posts';
//import MakePost from './../components/posts/MakePost';

const IndividualGroup = () => {
    const { groupID } = useParams()

    //Login
    const navigate = useNavigate();
    const { currentUser, setLoginState} = useContext(LoginContext);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
  
    useEffect(() => {
      const data = localStorage.getItem("localStorageCurrentUser");
      const currentUserLoggedIn = JSON.parse(data);
      setLoginState(currentUserLoggedIn);
      if(currentUserLoggedIn == 'null') {
        setUserLoggedIn(false);
        console.log("Group Page: DONT BE HERE");
      } else {
        setUserLoggedIn(true);
        console.log("Group Page: OK STAY HERE")
      }
   }, []);

    return (
        <div>
            <p><b> Your on a group! </b></p>
            <p> Group ID { groupID } </p>
            <p> Current User: { currentUser } </p>
            <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
            <Link to={`/group/1`}>{ "Music 1" } </Link>
            <Link to={`/group/2`}>{ "Music 2" } </Link>
            <Link className="" to="/group/5"> Games 5 </Link>
        </div>
    )
}

export default IndividualGroup;





/*
//import Posts from './../components/posts/Posts';
//import MakePost from './../components/posts/MakePost';

const IndividualGroup = () => {
    const { groupID } = useParams()

    return (
        <div>
            <p> Your on a group! </p>
            <p> Group ID { groupID } </p>
            <MakePost groupID = { groupID }/>
            <Posts groupID = { groupID }/>
        </div>
    )
}

export default IndividualGroup;
*/
