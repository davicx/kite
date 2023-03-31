
const IndividualComment = ({api, comment, currentUser, groupID }) => {
    return (     
        <div className="" >
            <p className = "post-text"> Comment { comment.commentCaption } </p>
            <p className = "post-text"> Comment ID: { comment.commentID } |  { comment.commentFrom } | { comment.commentTo} </p>  
        </div>       
        );
    }  

export default IndividualComment;