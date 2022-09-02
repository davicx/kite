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



