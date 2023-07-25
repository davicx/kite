import Posts from './display/PostList';
import NewPost from './actions/NewPost';

function GroupPosts({ groupID, currentUser, api }) {

  console.log("GroupPosts: groupID " + groupID)
  console.log("GroupPosts: currentUser " + currentUser)
  
  return (
  <div className="">
    <NewPost groupID = { groupID } currentUser = { currentUser }  />
    <Posts groupID = { groupID } api = { api }/>
  </div>
  );
}

export default GroupPosts;
