import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom" 
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";
import apiFunctions from '../functions/apiFunctions';
import SimpleGetUsers from '../components/playground/SimpleGetUsers';
import SimpleCheckbox from '../components/playground/SimpleCheckbox';


import axios from 'axios'

const axiosRequest = apiFunctions.getAPI();


function Playground() {
    let currentUser = "davey"

    return (
        <div className="user">
            <SimpleGetUsers api = { axiosRequest } currentUser = { currentUser }  /> 
            <SimpleCheckbox /> 
        </div>
    );
}

export default Playground;

