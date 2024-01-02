import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom" 
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";
import apiFunctions from '../functions/apiFunctions';
import SimpleGetUsers from '../components/playground/SimpleGetUsers';
import SimpleCheckbox from '../components/playground/SimpleCheckbox';
import SimpleEdit from '../components/playground/SimpleEdit';
import SimpleAddUser from '../components/playground/SimpleAddUser';
import SimpleUserSearch from '../components/playground/SimpleUserSearch';


import axios from 'axios'

const axiosRequest = apiFunctions.getAPI();


function Playground() {
    let currentUser = "davey"
    let searchString = "fro"

    return (
        <div className="user">
            <SimpleUserSearch api = { axiosRequest } currentUser = { currentUser } searchString = { searchString }/> 
        </div>
    );
}

export default Playground;

/*
<SimpleAddUser api = { axiosRequest } currentUser = { currentUser }/> 
<SimpleGetUsers api = { axiosRequest } currentUser = { currentUser } /> 
<SimpleCheckbox /> 
<SimpleEdit /> 
*/

