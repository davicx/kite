import Posts from './display/PostList';
import NewPost from './actions/NewPost';

function GroupPosts({ groupID, currentUser, api }) {

  return (
  <div className="">
    <NewPost groupID = { groupID } currentUser = { currentUser }  />
    <Posts groupID = { groupID } api = { api }/>
  </div>
  );
}

export default GroupPosts;
