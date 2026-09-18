import Posts from './display/PostList';
import NewPost from './actions/NewPost';

function GroupPosts({ groupID, currentUser, api }) {
  
  return (
  <div className="">
    <NewPost currentUser = {currentUser} groupID = { groupID } api = { api }/>
    <Posts groupID = { groupID } api = { api }/>
  </div>
  );
}

export default GroupPosts;
