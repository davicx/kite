import { useState } from 'react';

const IndividualPost = (props) => {
    const posts = props.posts;
    const postID = posts.postID
    const title = props.title;
    const handleDelete = props.handleDelete

    const likePost = (postID) => {
      console.log("you liked! " + postID);
    }

    return (
        <div className = "post-list">
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>           
                    <button onClick={ () => { likePost(post.postID) } }> Like Post </button>                                                
                    <button onClick={ () => { handleDelete(post.postID) } }> Delete </button>                          
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPost;

/*
                      
const IndividualPost = (props) => {
    const posts = props.posts;
    const postID = posts.postID
    const title = props.title;

    const [postLiked, setLike] = useState("Liked")

    const likePost = (postID) => {
      console.log("you liked! " + postID);
      setLike('Like Me')
    }

    const likePostID = (postID) => {
      console.log("you liked! " + postID);
    }

    return (
        <div className = "post-list">
            { posts.map((post) => (
                <div className="post" key={ post.postID }>
                    <p className = "post-text"> { post.postCaption } </p>
                    <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>      
                    <p className = "post-text"> Liked: { postLiked } </p>      
                    <button onClick={ () => { likePost(post.postID) } }> Like Post </button>                                                
                    <button onClick={ () => { likePostID(post.postID) } }> Like </button>                                                
                </div>
            ))}
        </div>
        );
    }  

export default IndividualPost;
*/ 
/*
//e
const likePost = (postID, e) => {
  console.log("you liked! " + postID);
}
<button onClick={ (e) => { likePost(post.postID, e) } }> Like </button>        

//This will make the function run automatically 
<button onClick={ likePost('frodo') }> Like </button>   
*/