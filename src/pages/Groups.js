import React, { useState } from 'react';
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"


function Groups() {
  let navigate = useNavigate();
  const [groups, setGroups] = useState([
    { groupName: 'Music!', groupID: 70 },
    { groupName: 'Hike', groupID: 77 },
    { groupName: 'Games', groupID: 78 }
  ])

  return (
    <div className="user">

      <div className='holder'>
        <p> Groups </p>
        {groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupName } </Link>
            <p>{ group.groupID }</p>
          </div>
        ))}
      </div>

      <div className='holder'>
        <button onClick={ () => navigate('/users') } > Users </button>
      </div>
    
    </div>
  );
}

export default Groups;




//WORKS
/*
          <BrowserRouter>
            <Link to = {`/group/${group.groupID}`}>
              <h4>{ group.groupName }</h4>
            </Link>       
          </BrowserRouter>
import { useState } from "react";
import { Link } from "react-router-dom";
import fetchGroups from './../functions/useFetchGroups';

//http://localhost:3000/?group_id=77
//http://localhost:3003/group/user/davey

/*
const Groups = () => {
  const groupUser = "davey";
  const groupsURL = 'http://localhost:3003/group/user/' + groupUser;

  const { data, isPending, error } = fetchGroups(groupsURL)
  console.log("OUTPUT");
  console.log(data);
  console.log(isPending);
  console.log(error);
  console.log("OUTPUT");
  //const currentPosts = data;

  const [groups, setGroups] = useState([
    { groupName: 'Music!', groupID: 70 },
    { groupName: 'Hike', groupID: 77 },
    { groupName: 'Games', groupID: 78 }
  ])

  return (
    <div className="">
      {groups.map(group => (
        <div className="group" key={ group.groupID } >
          <Link to = {`/group/${group.groupID}`}>
           <h4>{ group.groupName }</h4>
          </Link>
          <p>{ group.groupID }</p>
        </div>
      ))}
    </div>
  );
}
 

export default Groups;
*/

/*
const Groups = () => {
  
  return (
    <div className="">
      {groups.map(group => (
        <div className="group" key={ group.groupID } >
          <Link to = {`/group/${group.groupID}`}>
           <h4>{ group.groupName }</h4>
          </Link>
          <p>{ group.groupID }</p>
        </div>
      ))}
    </div>
  );
}
 

export default Groups;
*/