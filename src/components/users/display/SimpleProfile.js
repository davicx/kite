import React from 'react';
import { Link } from 'react-router-dom';

const SimpleProfile = ({friend}) => {
    return (     
        <div className="post" >
            <Link to={`/friends/${friend.friendName}`}> {friend.friendName } </Link>
            <p> Friend Status Message { friend.alsoYourFriend } </p>
    
        </div>       
        );
    }  

export default SimpleProfile;


/*
        {friend.alsoYourFriend ? 
                <p> Already friends </p>
                : 
                <p> Be my friend </p>    
            }

<p> Simple Profile for {friend.friendName} </p>
<p> First Name: {friend.firstName}</p>
<p> Image: {friend.friendImage}</p>
*/