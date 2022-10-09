import { useParams } from "react-router";

const MakePost = () => {
    const { groupID } = useParams()

    return (
        <div>
            <p> Make a Post </p>

        </div>
    )
}


export default MakePost;
