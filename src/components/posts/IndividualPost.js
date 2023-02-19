const IndividualPost = ({post, currentUser}) => {
    return (     
        <div className="post" >
            <p className = "post-text"> Current User { currentUser } </p>
            <p className = "post-text"> { post.postCaption } </p>
            <p className = "post-text"> { post.postID } |  { post.postFrom } | { post.postTo} | { post.groupID }</p>                    
        </div>       
        );
    }  

export default IndividualPost;
/*
            <button onClick={ likePost }> Like </button>  
    const postID = post.postID

    const likePost = (e) => {
      console.log(e.target);
      console.log("you liked! " + postID);
    }

import Likes from './Likes';
import EditPost from './EditPost';

const Post = (props) => {
    const currentUser = props.currentUser;
    const post = props.post;

    return (
        <div className="post">
            <p><b> Post from: </b>{ post.postFrom } </p>
            <p className = "post-text"> post to: { post.postTo } | ID: { post.postID }</p>
            <p className = "post-text"> { post.postCaption } </p>
            <Likes post = { post } currentUser = {currentUser}  />    
            <EditPost post = { post } currentUser = {currentUser}  />    
        </div>
        );
    }  
  
export default Post;
*/