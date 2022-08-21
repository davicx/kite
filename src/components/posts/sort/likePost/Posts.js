import { useState } from 'react';
import IndividualPost from './IndividualPost';

const Posts = () => {
    let databasePosts = [
        {postCaption: 'hiya!', postFrom: 'davey', postTo: 'sam', postLiked: 'liked', postID: 1},
        {postCaption: 'lets garden!', postFrom: 'frodo', postTo: 'sam', postLiked: 'like me', postID: 2},
        {postCaption: 'and hike!', postFrom: 'sam', postTo: 'davey',  postLiked: 'liked', postID: 3},
        {postCaption: 'and hike tonight!', postFrom: 'davey', postTo: 'sam', postLiked: 'like me', postID: 4}
    ]

    const[currentPosts, setPosts] = useState(databasePosts);

    const handleDelete = (postID) => {
        console.log(postID)
        const updatedPosts = currentPosts.filter(post => post.postID !== postID);
        setPosts(updatedPosts);
    }

    const likePost = (postID) => {
      console.log("You liked " + postID);
      const postIndex = currentPosts.findIndex((post => post.postID === postID));
      const likedPosts = currentPosts.map(a => Object.assign({}, a));
      //const updatedPosts = currentPosts.filter(post => post.postID !== 77);
      likedPosts[postIndex].postLiked = "you liked me!"
      console.log(likedPosts);
      setPosts(likedPosts);
  } 

      return (
        <div className="posts">
            <IndividualPost posts={ currentPosts } title="The Posts!" likePost={likePost} handleDelete={handleDelete} /><hr />
        </div>
      );
    }
  
  export default Posts;

  //Use Effect- Run function on every render including initial render 

  //<IndividualPost posts={ currentPosts.filter((post) => post.postFrom === 'davey') } title="Just Davids Posts!"/>


  /*
         <button onClick= {()=> handleDelete(post.postID)}> delete post </button>   
              {posts.map((post) => (
                <div className = "post" key={post.postID}> 
                    <p> {} </p>
                </div>
            ))}
  import { useState } from 'react';

const Posts = () => {
    let userOne = { userID: 1, userName: "david", location: "corvallis" }
    let userTwo = { userID: 2, userName: "sam", location: "shire" }
    let userThree = { userID: 3, userName: "frodo", location: "bag end" }
    var allUsers = [userOne, userTwo, userThree];

    const[users, setPosts] = useState(allUsers) 

      return (
        <div className="">
            {users.map((user) => (
                <div className = "user" key={user.userID}> 
                    <p> {user.userName}  {user.location} </p>
                </div>
            ))}
        </div>
      );
    }
  
  export default Posts;
  const Posts = () => {

    let currentPosts = [
        {caption: 'hiya!', from: 'davey', liked: 'liked', postID: 1},
        {caption: 'lets garden!', from: 'frodo', liked: 'like me', postID: 2},
        {caption: 'and hike!', from: 'sam', liked: 'liked', postID: 3},
        {caption: 'and hike tonight!', from: 'davey', liked: 'like me', postID: 4}
    ]

    const[posts, setPosts] = useState(currentPosts);

    const handleDelete = (postID) => {
        const newPosts = posts.filter(post => post.postID !== postID);
        setPosts(newPosts);
    }
    
    return (
        <div className="posts">
            <AllPosts posts = {posts} title="all the posts" handleDelete={handleDelete} />    
        </div>
        );
    } 

export default Posts;
*/

