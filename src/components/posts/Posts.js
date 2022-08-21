import React from 'react';
import IndividualPost from './IndividualPost';
import fetchPosts from './../../functions/useFetchPosts';

const Posts = (props) => {
    const groupID = props.groupID;
    const postURL = 'http://localhost:3003/posts/group/' + groupID;

    const { data, isPending, error } = fetchPosts(postURL)
    const currentPosts = data;

    return (
    <div className="posts">
        { error && <div> { error } </div>}
        { isPending && <div> loading... </div>}
        { currentPosts && <IndividualPost posts = { currentPosts } title="The posts!" />}
    </div>
    );
    }
  
export default Posts;

