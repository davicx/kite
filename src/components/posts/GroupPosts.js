import Posts from './display/PostList';
import NewPost from './actions/NewPost';

function GroupPosts({ groupID, currentUser }) {

  return (
  <div className="">
    <NewPost groupID = { groupID } currentUser = { currentUser } />
    <Posts groupID = { groupID }/>
  </div>
  );
}


export default GroupPosts;