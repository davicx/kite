import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "react-query";
import { useNavigate  } from "react-router-dom" 
import useLoginStatus from '../functions/hooks/useLoginStatus';
import functions from "../functions/functions";

import axios from 'axios'



function Playground() {
    const [postCaption, editPostCaption] = useState('Post caption! Edit Me! wanna go on a hike today the weather is perfect!')
   
    const handleEditPost = (postCaption) => {
        console.log("you clicked")
        console.log(postCaption)
      }

  return (
    <div className="user">
        <h4> Playground </h4>
        <p> {postCaption} </p>
        
        <button type="submit" className = "" onClick={() => { handleEditPost(postCaption) }}>Edit Post</button>

    </div>
  );
}

export default Playground;

/*
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NameForm />);

*/
//NEW POST

/*
<textarea name="postContent" value = {postCaption} rows={4} cols={40} />
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

/*
const Search = () => {
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => setShowResults(true)
  return (
    <div>
      <input type="submit" value="Search" onClick={onClick} />
      { showResults ? <Results /> : null }
    </div>
  )
}

const Results = () => (
  <div id="results" className="search-results">
    Some Results
  </div>
)
*/

/*
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "react-query";
import axios from 'axios'


//Create the API to call 
const api = axios.create({

})

async function likePostAPI(likedPost) {
  const postURL = "http://localhost:3003/post/like"
  const response = await axios.post(postURL, likedPost);
  console.log(response.data)

  return response.data;
} 

//COMPONENT: Like Post  
function LikePost({groupID, post, currentUser}) {
  const queryClient = useQueryClient();
  //const postUserLikesArray = post.likedByUsernameArray;
  const postID = post.postID;

  const handleLikePost = (postID, currentUser) => {
    var likedPost = {
        postID: postID,
        currentUser: currentUser,
        groupID: groupID
    }

    mutate(likedPost)

  }

  const { isLoading, mutate } = useMutation(likePostAPI, {
    onSuccess: (returnedData) => {
      queryClient.setQueryData(['group-posts', groupID], (originalQueryData) => {
        console.log(returnedData)
        
          //STEP 1: Get post ID of updated post and new like array 
          var updatedQueryData = structuredClone(originalQueryData);
          console.log("updatedQueryData")
          console.log(updatedQueryData)
          console.log("updatedQueryData")

          const postID = returnedData.postID;
          const currentUser = returnedData.currentUser;

          for (let i = 0; i < updatedQueryData.length; i++) {

              if(updatedQueryData[i].postID == postID) {

                  var postLike = returnedData.newLike[0];

                  //Create the new array of users who have liked this
                  updatedQueryData[i].postLikesArray.push(postLike)
                  updatedQueryData[i].simpleLikesArray.push(currentUser)
                  updatedQueryData[i].totalLikes = updatedQueryData[i].simpleLikesArray.length

              }
          }

            return updatedQueryData;

        })
            
    }
  })

  return (
    <div className="">
        <button type="submit" className = "" onClick={() => { handleLikePost(postID, currentUser) }}>Like Me</button>
    </div>
  );
}


export default LikePost;
*/