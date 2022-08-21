//import { useState } from "react";
//import { Link } from "react-router-dom";
//import fetchGroups from './../functions/useFetchGroups';
import { useParams } from "react-router";

const IndividualGroup = () => {
  const { groupID } = useParams()

  return (
      <div>
          <p> Your on a group! </p>
          <p> Group ID { groupID } </p>
          <p> Posts </p>
      </div>
  )
}

export default IndividualGroup;
