import { useParams } from "react-router";

import Posts from './../components/posts/Posts';
import MakePost from './../components/posts/MakePost';

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
