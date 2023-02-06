import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom"
import { LoginContext } from "../functions/context/LoginContext";
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";

import AllPosts from '../components/posts/AllPosts';
import MakePost from '../components/posts/MakePost';

import axios from 'axios'


const axiosRequest = axios.create({
  withCredentials: true
})  


function PostsPage() {

  return (
    <div className="user">
        <p> Posts </p>
        <AllPosts />
        <MakePost />
    </div>
  );
}

export default PostsPage;
