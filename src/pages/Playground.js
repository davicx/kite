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

    return (
        <div className="user">
            <NewGroup api = { axiosRequest } currentUser = { "davey" } />
        </div>
    );
}

export default Playground;

/*

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

