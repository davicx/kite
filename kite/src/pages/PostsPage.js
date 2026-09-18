import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";

import PostList from '../components/posts/display/PostList';
import NewPost from '../components/posts/actions/NewPost';
import NewPhotoPost from '../components/posts/actions/NewPhotoPostOld';
import NewPhotoPhoto from '../components/posts/actions/NewPhotoPhoto';

import axios from 'axios'


const axiosRequest = axios.create({
  withCredentials: true
})  


function PostsPage() {

  return (
    <div className = "">
      <header> 
        <p> header </p>
      </header>
      <div className="site-body">
        <div className="posts">
          <NewPhotoPhoto currentUser = "davey" groupID = { 70 } api = { axiosRequest }/>
          <PostList groupID = { 70 } api = { axiosRequest }/>
        </div>

      </div>
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
