
//<SimpleProfile api = { api } friend = { friend } currentUser = {currentUser} key = { friend.friendID }/>
const SimpleProfile = ({friend}) => {
    return (     
        <div className="post" >
            <p> Simple Profile for {friend.friendName} </p>
            <p> First Name: {friend.firstName}</p>
            <p> Image: {friend.friendImage}</p>
        </div>       
        );
    }  

export default SimpleProfile;
