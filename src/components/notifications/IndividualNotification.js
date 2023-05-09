//import Comments from '../../comments/CommentList';

const IndividualNotification = ({api, notification, currentUser }) => {
    return (     
        <div className="post" >
            <p> Notification </p>
            <p className = "post-text"> Notification { notification.notificationMessage } </p>
            <p className = "post-text"> From: { notification.notificationFrom } To: { notification.notificationTo } </p>
        </div>       
        );
    }  

export default IndividualNotification;

// <IndividualNotification api = { api } notification = { notification }  currentUser = {currentUser} key = { notification.notificationID }/>