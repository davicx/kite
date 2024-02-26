import React, { useState, useEffect } from 'react'
import { act } from 'react-dom/test-utils';

function Activities() {
    const [activity, setActivity] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function loadActivity() {
        setIsLoading(true);
        fetch("https://www.boredapi.com/api/activity")
        .then((response) => response.json())
        .then((data) => {
            setActivity([...activity, data]);
            setIsLoading(false)
        });
    }

    useEffect(() => {
        loadActivity()
      }, []);

      if(activity.length === 0) {
        return <p> loading...</p>
      }

      return (
        <div> 
            <ul> 
                {activity.map((currentActivity) => {
                    return <li key = {currentActivity.key}> { currentActivity.activity } </li>
                })}
            </ul>
          <button disabled={isLoading} onClick={loadActivity}> Add One </button>
        </div>
    );
}

export default Activities;



//WORKING
/*
import React, { useState, useEffect } from 'react'
import { act } from 'react-dom/test-utils';

function Activities() {
    const [activity, setActivity] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function loadActivity() {
        setIsLoading(true);
        fetch("https://www.boredapi.com/api/activity")
        .then((response) => response.json())
        .then((data) => {
            setActivity([...activity, data]);
            setIsLoading(false)
        });
    }

    useEffect(() => {
        loadActivity()
      }, []);

      if(isLoading) {
        return <p> loading...</p>
      }

      return (
        <div> 
            <ul> 
                {activity.map((currentActivity) => {
                    return <li key = {currentActivity.key}> { currentActivity.activity } </li>
                })}
            </ul>
          <button onClick={loadActivity}> Add One </button>
        </div>
    );
}

export default Activities;
*/