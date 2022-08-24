import { useParams } from "react-router";

import Posts from './../components/posts/Posts';

const IndividualGroup = () => {
    const { groupID } = useParams()

    return (
        <div>
            <p> Your on a group! </p>
            <p> Group ID { groupID } </p>
            <Posts groupID = { groupID }/>
        </div>
    )
}

export default IndividualGroup;
