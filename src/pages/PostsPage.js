import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";

import PostList from '../components/posts/display/PostList';
import NewPost from '../components/posts/actions/NewPost';

import axios from 'axios'


const axiosRequest = axios.create({
  withCredentials: true
})  


function PostsPage() {

  return (
    <div className="user">
        <PostList groupID = { 70 } api = { axiosRequest }/>
        <NewPost currentUser = "davey" groupID = { 70 } api = { axiosRequest }/>

    </div>
  );
}

export default PostsPage;

  
  /*
  //STEP 1: Check user is logged in
    const loggedInMessage = useLoginStatus();

    //STEP 3: Get the current User
    var [currentUser, setCurrentUser] = useCurrentUser();
  */
