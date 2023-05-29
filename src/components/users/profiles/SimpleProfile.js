
//<SimpleProfile api = { api } friend = { friend } currentUser = {currentUser} key = { friend.friendID }/>
const SimpleProfile = ({api, friend, currentUser}) => {
    return (     
        <div className="post" >
            <p> Simple Profile for {friend.friendUserName }</p>
            <p> Image: {friend.friendUserImage }</p>
        </div>       
        );
    }  

export default SimpleProfile;
