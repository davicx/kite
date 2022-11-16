import { useParams } from "react-router";
import { BrowserRouter, useNavigate, Link  } from "react-router-dom"

//import Posts from './../components/posts/Posts';
//import MakePost from './../components/posts/MakePost';

const IndividualGroup = () => {
    const { groupID } = useParams()

    return (
        <div>
            <p> Your on a group! </p>
            <p> Group ID { groupID } </p>
            <Link to={`/group/1`}>{ "Music 1" } </Link>
            <Link to={`/group/2`}>{ "Music 2" } </Link>
            <Link className="" to="/group/5"> Games 5 </Link>
        </div>
    )
}

export default IndividualGroup;

/*
//import Posts from './../components/posts/Posts';
//import MakePost from './../components/posts/MakePost';

const IndividualGroup = () => {
    const { groupID } = useParams()

    return (
        <div>
            <p> Your on a group! </p>
            <p> Group ID { groupID } </p>
            <MakePost groupID = { groupID }/>
            <Posts groupID = { groupID }/>
        </div>
    )
}

export default IndividualGroup;
*/
