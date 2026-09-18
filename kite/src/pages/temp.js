

/*
<CreateGroup api = { axiosRequest } currentUser = { currentUser } />
<Link className="navLink center" to="/groups/new"> New Group </Link>
<hr />
<CreateGroup api = { axiosRequest } currentUser = { currentUser } />
<FriendSearch api = { axiosRequest } currentUser = { currentUser } />
<!-- Doesn't work -->
<CreateGroup currentUser = { currentUser } api = { axiosRequest } />
*/


/*
      {data && groups.groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
          </div>
      ))}
*/



//WORKS
/*
//FUNCTION 1: Search for Friends API
async function friendSearchAPI(currentUser, searchString) {     
    const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 
    const { data } = await axios.get(friendSearchURL)

    return data
} 
  

function FriendSearch({ api, currentUser }) {
    const [searchString, setSearchString] = useState('')

    //FUNCTION 3: Handle user typing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchString(value);

        //Fetch Current Data
        let currentSearchString = value
        if(currentSearchString.length > 0) {
            friendSearchAPI(currentUser, value)
        }
    }

    return (
        <div className="new-post">
            <p className = "single-line">Friend Name</p>
            <input name= "group-name" className="" type="text" value={ searchString } onChange={ handleChange} />
            <p className = "single-line"> Typed { searchString } </p>
        </div>
    );
}
*/







/* 

function NewPost({ groupID, currentUser, api }) {

    //FUNCTION 2: Handle New Post Submit Button
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
   
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var newPost = {
            masterSite: "kite",
            postType: "text",
            postFrom: currentUser,
            postTo: groupID,
            groupID: groupID,
            listID: 0,
            postCaption: postCaption,
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/" + groupID
        }
        //makePost(newPost)
        //console.log(newPost)
        mutate(newPost)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(makePostAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                var updatedPostData = structuredClone(originalQueryData);
                let newPost = returnedData.data;

                updatedPostData.unshift(newPost);

                return updatedPostData;     
            })
        }
      })

    //FUNCTION 4: React and Site Page
    return (
        <div className="new-post">
            <p><b> Make a Post </b>to Group { groupID } </p>
            <p> Current User: { currentUser} </p>
            <form onSubmit={ handleSubmit }>
                <label> </label> 
                <input name= "postCaption" type="text" value={ postCaption } onChange={handleChange} />
                <p> {postCaption}</p>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}


//EXAMPLE
//FUNCTION 1: New Post API
async function makePostAPI(post) {
    const postURL = "http://localhost:3003/post/text";
    const response = await axios.post(postURL, post);

    return response.data;
} 

function NewPost({ groupID, currentUser, api }) {

    //FUNCTION 2: Handle New Post Submit Button
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
   
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var newPost = {
            masterSite: "kite",
            postType: "text",
            postFrom: currentUser,
            postTo: groupID,
            groupID: groupID,
            listID: 0,
            postCaption: postCaption,
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/" + groupID
        }
        //makePost(newPost)
        //console.log(newPost)
        mutate(newPost)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(makePostAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                var updatedPostData = structuredClone(originalQueryData);
                let newPost = returnedData.data;

                updatedPostData.unshift(newPost);

                return updatedPostData;     
            })
        }
      })

    //FUNCTION 4: React and Site Page
    return (
        <div className="new-post">
            <p><b> Make a Post </b>to Group { groupID } </p>
            <p> Current User: { currentUser} </p>
            <form onSubmit={ handleSubmit }>
                <label> </label> 
                <input name= "postCaption" type="text" value={ postCaption } onChange={handleChange} />
                <p> {postCaption}</p>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default NewPost;

*/


/*
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import UserProfile from '../components/users/UserProfile';
import LogoutUser from '../components/login/LogoutUser';

import useLoginStatus from '../functions/hooks/useLoginStatus';
import axios from 'axios'



function ProfilePage() {
  console.log("PAGE: ProfilePage")
  //const { currentUser, setLoginState} = useContext(LoginContext);
  //const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { currentUser, userLoggedIn  } = useLoginStatus();
  
  return (
    <div className="user">
        <p><b> Profile </b></p>
        <p> Current User: { currentUser } </p>
        <p> User Logged In: { userLoggedIn ? 'yep!' : 'nooo' } </p>
        <UserProfile currentUser = { currentUser } api = { axiosRequest } /> 
        <LogoutUser />
    </div>
  );
}

export default ProfilePage;
*/





/*

import React, { useState, useContext } from 'react';
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"
import LogoutUser from '../components/login/LogoutUser';
import { LoginContext } from "../functions/context/LoginContext";
//import { LoggedInContext } from "../functions/context/LoggedInContext";

import Axios from "axios";

const axiosRequest = Axios.create({
  withCredentials: true
})

function Profile() {
  const { currentUser, setLoginState} = useContext(LoginContext);
      
  return (
    <div className="user">
        <p> Profile</p>

    </div>
  );
}

export default Profile;
export default Profile;
*/



/*

  useEffect(() =>{
    setTimeout(() => {
      navigate("/login")
      }, 1000)
  },[])

export function NotFound() {


  return <Navigate to = "/login" />

}
*/



/*

  useEffect(() =>{
    setTimeout(() => {
      navigate("/login")
      }, 1000)
  },[])

export function NotFound() {
  return <Navigate to = "/login" />

}




function NotFound() {

  return (
    <div className="user">
        <p> Not Found </p>
    </div>
  );
}

import { Navigate, BrowserRouter, useNavigate, Link  } from "react-router-dom"

export function NotFound() {
    return <Navigate to = "/login" />
}
*/