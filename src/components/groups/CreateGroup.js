import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


//FUNCTION 1: New Post API
async function createGroupAPI(newGroup) {
    const groupURL = "http://localhost:3003/group/create/";
    //const response = await axios.post('')
    const response = await axios.post(groupURL, newGroup);
    //setMessage(response.data)
    console.log(response.data.data)
    return response.data;
}


function CreateGroup({api, currentUser}) {  
    const [groupName, setGroupName] = useState('New Group!')
    
    //FUNCTION 2: Handle New Group Submit Button
    const handleChange = (event) => {
        const { name, value } = event.target
        setGroupName(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Create a new Group " + groupName + " for "  + currentUser)
        const newGroup = {
            "currentUser": currentUser,
            "groupName": groupName,
            "groupType": "kite",
            "groupPrivate": 1,
            "groupUsers": ["davey", "sam", "frodo"],
            "notificationMessage": "Invited you to a new Group",  
            "notificationType": "group_invite",
            "notificationLink": "http://localhost:3003/group/77"   
        }
        console.log(newGroup)
        mutate(newGroup)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(createGroupAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['user-groups', currentUser], (originalQueryData) => {
                var updatedGroupData = structuredClone(originalQueryData);
                console.log(returnedData)
                //let newPost = returnedData.data;

                //updatedPostData.unshift(newPost);

                return updatedGroupData;     
            })
        }
      })

    return (
      <div className = "login">
          <form onSubmit={ handleSubmit }>
              <input name= "group-name" className="loginInput" type="text" value={ groupName } onChange={handleChange} />
              <p> { groupName } </p>
              <button type="submit" className="loginButton" > Create New Group </button>
          </form>
      </div>
    );
  }

export default CreateGroup;


//PASS TO API
/*
import React from 'react';
import { useMutation, useQueryClient } from "react-query";

import axios from 'axios'

//PART 1: API Call
async function cancelFriendRequestAPI(cancelFriendRequest) {
    const requestAPI = cancelFriendRequest.api
    const requestBody = cancelFriendRequest.cancelFriendRequestBody

    const cancelFriendRequestURL = "http://localhost:3003/friend/cancel/"
    const response = await requestAPI.post(cancelFriendRequestURL, requestBody);
    //console.log(response.data)
  
    return response.data;
} 

//COMPONENT: Friend Request
const FriendRequest = ({api, currentUser, friend}) => {
    const queryClient = useQueryClient();

    //Button: Add a Friend on Button Click 
    const handleCancelFriendRequest = (api, currentUser, friendName) => {
        console.log(currentUser + " wants to cancel " + friend.friendName + " as a friend!")
        var cancelFriendRequestBody = {
            masterSite: "kite",
            currentUser: currentUser,
            friendName: friendName
        }

        var cancelFriendRequest = {
            api: api,
            cancelFriendRequestBody: cancelFriendRequestBody
        }

        mutate(cancelFriendRequest)
       
    }

    //Action: Use React Query to make call
    const { isLoading, mutate } = useMutation(cancelFriendRequestAPI, {
        onSuccess: (returnedData) => {
            queryClient.setQueryData(['all-users'], (originalQueryData) => {
            var updatedQueryData = structuredClone(originalQueryData);
            const statusCode = returnedData.statusCode
            const currentUser = returnedData.data.currentUser
            const newFriend = returnedData.data.friendName

            //Loop over all the users and update the new friend to be request pending
            for (let i = 0; i < updatedQueryData.data.length; i++) {
                //console.log(updatedQueryData.data[i].friendName + " " + newFriend)
                if(updatedQueryData.data[i].friendName.toUpperCase() === newFriend.toUpperCase()) {
                    updatedQueryData.data[i].friendshipKey = "not_friends"
                }
            }
            
            return updatedQueryData;
    
            })
        
        }
        })

    return (     
        <div className="" >
            <p> Friend Request </p>
            <p> Friendship Request Pending (they have to response and you can cancel) - "request_pending"</p>
            <button type="submit" className = "" onClick={() => { handleCancelFriendRequest(api, currentUser, friend.friendName) }}>Cancel</button>
        </div>       
        );
    }  

export default FriendRequest;




*/



//EXAMPLE
/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'

//FUNCTION 1: New Post API
async function makePostAPI(post) {
    const postURL = "http://localhost:3003/post/text";
    const response = await axios.post(postURL, post);

    return response.data;
} 

function NewPost({ groupID, currentUser, api }) {

    //FUNCTION 2: Handle New Post Submit Button
    const [postCaption, setPostCaption] = useState('Hiya sam! wanna go on a hike today the weather is perfect!')
   
    const handleChange = (event) => {
        const { name, value } = event.target
        setPostCaption(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var newPost = {
            masterSite: "kite",
            postType: "text",
            postFrom: currentUser,
            postTo: groupID,
            groupID: groupID,
            listID: 0,
            postCaption: postCaption,
            notificationMessage: "Posted a Message",   
            notificationType: "new_post_text",
            notificationLink: "http://localhost:3003/posts/group/" + groupID
        }
        //makePost(newPost)
        //console.log(newPost)
        mutate(newPost)
        
    }

    //FUNCTION 3: React Query Mutation
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(makePostAPI, {
        onSuccess: (returnedData) => {
          queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
                var updatedPostData = structuredClone(originalQueryData);
                let newPost = returnedData.data;

                updatedPostData.unshift(newPost);

                return updatedPostData;     
            })
        }
      })

    //FUNCTION 4: React and Site Page
    return (
        <div className="new-post">
            <p><b> Make a Post </b>to Group { groupID } </p>
            <p> Current User: { currentUser} </p>
            <form onSubmit={ handleSubmit }>
                <label> </label> 
                <input name= "postCaption" type="text" value={ postCaption } onChange={handleChange} />
                <p> {postCaption}</p>
                <button type="submit"> Submit </button>
            </form>
        </div>
    );
}

export default NewPost;


*/