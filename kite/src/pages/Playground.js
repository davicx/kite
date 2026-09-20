import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom" 
import useLoginStatus from '../functions/hooks/useLoginStatus';

//import functions from "../functions/functions";
//import apiFunctions from '../functions/apiFunctions';
import SimpleGetUsers from '../components/playground/SimpleGetUsers';
import SimpleCheckbox from '../components/playground/SimpleCheckbox';
import SimpleEdit from '../components/playground/SimpleEdit';
import SimpleAddUser from '../components/playground/SimpleAddUser';
import SimpleUserSearch from '../components/playground/SimpleUserSearch';
import SimpleInput from '../components/playground/SimpleInput';
import SimpleLocalStorage from '../components/playground/SimpleLocalStorage';
import SimpleArray from '../components/playground/SimpleArray';
import SimpleButtonParent from '../components/playground/SimpleButtonParent';
//import SimpleAddGroupUser from '../components/playground/SimpleAddGroupUser';
import SimpleAddGroupUser from '../components/playground/SimpleAddGroupUserLS';
import SimpleUpload from '../components/playground/SimpleUpload';
import SimpleUseEffect from '../components/playground/SimpleUseEffect';
import SimpleSaveToStateAPI from '../components/playground/SimpleSaveToStateAPI';
import Example from '../components/playground/tutorials/Example';
import Learning from '../components/playground/tutorials/Learning';
//import AutoComplete from '../components/playground/tutorials/autoComplete/AutoComplete';
import AutoComplete from '../components/playground/tutorials/autoComplete/AutoComplete';
import MainApp from '../components/playground/tutorials/learnAPI/MainApp';
import NewGroup from '../components/groups/actions/NewGroup';
import apiFunctions from '../functions/apiFunctions';


//import axios from 'axios'

const axiosRequest = apiFunctions.getAPI();

function Playground() {
    let currentUser = "davey"
    let searchString = "fro"
    let url = "https://insta-app-bucket-tutorial.s3.us-west-2.amazonaws.com/images/postImage-1716851490721-546172183-59045070_p0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXZAOI335HZSDKHVN%2F20240527%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240527T233903Z&X-Amz-Expires=3600&X-Amz-Signature=48fca7e102adc1ba65c31bbd08703cdbdae763c88495377f6aa7bf08be4c4397&X-Amz-SignedHeaders=host&x-id=GetObject"

    return (
        <div className="user" >
        
           <img src={url} alt="hi"/>
            <SimpleUpload api = { axiosRequest } currentUser = { currentUser } />
        </div>
    );
}

export default Playground;

/*
  <img src="https://instasam-demo-thing-two.s3.us-west-2.amazonaws.com/59045070_p0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAXZAOI335JR6QQSHA%2F20240526%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240526T234807Z&X-Amz-Expires=3600&X-Amz-Signature=3e31cf4b0d6324c8d1822f31c4d684dcc67dd26f3d2e161a9fea811dbd7bd24d&X-Amz-SignedHeaders=host&x-id=GetObject" alt="Girl in a jacket"> 

<NewGroup api = { axiosRequest } currentUser = { "davey" } />
const axiosRequest = apiFunctions.getAPI();

function GroupsPage() {
  const data = localStorage.getItem("localStorageCurrentUser");
  const currentUser = JSON.parse(data);
  //const { currentUser, userLoggedIn  } = useLoginStatus();
  console.log("GroupsPage")
  console.log("Current User " + currentUser)
  
  return (
    <div className="user">
        <p> Current User: {currentUser}</p>
        <Groups currentUser = { currentUser } api = { axiosRequest } /> 
        <CreateGroup api = { axiosRequest } currentUser = { currentUser } />
        <Link className="navLink center" to="/groups/new"> New Group </Link>
        
    </div>
  );
}

<AutoComplete />   
            <Example /> 
<SimpleAddGroupUser />    
<SimpleSaveToStateAPI /> 
<SimpleUseEffect api = { axiosRequest } currentUser = { currentUser } /> 
<SimpleLocalStorage /> 
<SimpleParent api = { axiosRequest } currentUser = { currentUser } /> 
<SimpleAddGroupUser api = { axiosRequest } currentUser = { currentUser } /> 
<SimpleArray api = { axiosRequest } currentUser = { currentUser } /> 

<SimpleHook /> 
<SimpleAddLocalStorage /> 
<SimpleGetUsers api = { axiosRequest } currentUser = { currentUser } /> 
<SimpleUserSearch api = { axiosRequest } currentUser = { currentUser } searchString = { searchString }/> 
<SimpleAddUser api = { axiosRequest } currentUser = { currentUser }/> 
<SimpleGetUsers api = { axiosRequest } currentUser = { currentUser } /> 
<SimpleCheckbox /> 
<SimpleEdit /> 
*/

