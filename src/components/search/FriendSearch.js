import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from 'axios'

//FUNCTION 1: Search for Friends API
async function friendSearchAPI(currentUser,searchString) {   
    if (searchString.length > 0) {
        const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 
        const { data } = await axios.get(friendSearchURL)

        return data
    } 

} 

function FriendSearch({ api, currentUser }) {
    const [searchString, setSearchString] = useState('')

    //FUNCTION 2: Handle user typing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchString(value);
    }

     //FUNCTION 3: React Query 
    const { isLoading, data, isError, error  } = useQuery(['friend-search', searchString], () => friendSearchAPI(currentUser, searchString), 
        {  staleTime: 60000 }
    )

    return (
        <div className="new-post">
            <p className = "single-line">Friend Name</p>
            
            { data && console.log(data.data)}
            {data && data.data.map(user => (
                console.log(user.friendName)
            ))}

            <input name= "group-name" className="" type="text" value={ searchString } onChange={ handleChange} />
            <p className = "single-line"> Typed { searchString } </p>
        </div>
    );
}

export default FriendSearch;

/*
      {data && groups.groups.map(group => (
          <div className="group" key={ group.groupID } >
            <Link to={`/group/${group.groupID}`}>{ group.groupID } | {group.groupName } </Link>
          </div>
      ))}
*/



//WORKS
/*
//FUNCTION 1: Search for Friends API
async function friendSearchAPI(currentUser, searchString) {     
    const friendSearchURL = "http://localhost:3003/search/user/" + currentUser + "/string/" + searchString; 
    const { data } = await axios.get(friendSearchURL)

    return data
} 
  

function FriendSearch({ api, currentUser }) {
    const [searchString, setSearchString] = useState('')

    //FUNCTION 3: Handle user typing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchString(value);

        //Fetch Current Data
        let currentSearchString = value
        if(currentSearchString.length > 0) {
            friendSearchAPI(currentUser, value)
        }
    }

    return (
        <div className="new-post">
            <p className = "single-line">Friend Name</p>
            <input name= "group-name" className="" type="text" value={ searchString } onChange={ handleChange} />
            <p className = "single-line"> Typed { searchString } </p>
        </div>
    );
}
*/







/* 

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


//EXAMPLE
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