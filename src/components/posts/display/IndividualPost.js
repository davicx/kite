import Likes from '../actions/like/Likes';
import EditPost from '../actions/EditPost';

const IndividualPost = ({post, currentUser, groupID }) => {
    //console.log(post)
    // groupID = { groupID }
    return (     
        <div className="post" >
            <p className = "post-text"> Current User { currentUser } </p>
            <p className = "post-text"> { post.postCaption } </p>
            <p className = "post-text"> POST ID: { post.postID } |  { post.postFrom } | { post.postTo} | GROUP ID: { post.groupID }</p>  
            <Likes groupID = { groupID } post = { post } currentUser = {currentUser}  />                     
        </div>       
        );
    }  

export default IndividualPost;
/*


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