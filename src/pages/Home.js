import React, { useEffect } from 'react';
import { useNavigate  } from "react-router-dom"

function Home() {
    //Login Status 
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("localStorageCurrentUser");
        const currentUserLoggedIn = JSON.parse(data);
        if(currentUserLoggedIn == 'null') {
            navigate("/login");
        } else {
            navigate("/groups");
        }
    }, []);

    return (
      <div className="user">
          <p> Home go to Login or Groups </p>
      </div>
    )
}

export default Home;