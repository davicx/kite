import React, { useState, useEffect } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import IndividualGroupUser from './IndividualGroupUser';
import NewGroupUser from './NewGroupUser';

var david = {
  userID: 1,
  userName: "david",
}
var sam = {
  userID: 2,
  userName: "sam",
}
var frodo = {
  userID: 3,
  userName: "frodo",
}
var merry = {
  userID: 4,
  userName: "merry",
}

var friendsArray = [david, sam, frodo]
var localStorageBaseArray = []

const SimpleAddGroupUserLS = ({ currentUser, api }) => {
  const [currentGroupUsers, updateCurrentGroupUsers] = useLocalStorage('newGroupUser', localStorageBaseArray)
  const [availableFriends, updateAvailableFriends] = useState(friendsArray)

  //STEP 1: Get Current Users from Local Storage 
  useEffect(() => {
    console.log("Remove Users from availableFriends who are in local storage")
    let currentAvailableFriends = [...availableFriends];

    for(let i = 0; i < currentGroupUsers.length; i++){
      console.log(currentGroupUsers[i].userName)
      currentAvailableFriends = currentAvailableFriends.filter(user => user.userName !== currentGroupUsers[i].userName);
   }
   updateAvailableFriends(currentAvailableFriends)

  }, [])


  //FUNCTIONS: Add or Remove Users
  //Add Group User 
  const addGroupUser = (userName) => {

    console.log(currentGroupUsers)
    //Step 1: Add New Group User to Local Storage Pending Group
    console.log("You are going to add " + userName)
    let updatedCurrentGroupUsersArray = [...currentGroupUsers];
    let newUser = availableFriends.find(x => x.userName === userName);

    updatedCurrentGroupUsersArray.push(newUser);
    updateCurrentGroupUsers(updatedCurrentGroupUsersArray);
 
    //Step 2: Remove User from Current available Friends
    const updatedFriendsArray = availableFriends.filter(user => user.userName !== userName);
    updateAvailableFriends(updatedFriendsArray)  
  
  }

  //Remove Group User 
  const removeGroupUser = (userName) => {

      //Step 1: Remove New Group User from Pending Group 
      console.log("You will remove " + userName)
      const updatedCurrentGroupUsers = currentGroupUsers.filter(user => user.userName !== userName);
      updateCurrentGroupUsers(updatedCurrentGroupUsers);

      //Step 2: Add User back to available Friends
      let updatedAvailableFriendsArray = [...availableFriends];
      let selectedUser = currentGroupUsers.find(x => x.userName === userName);

      updatedAvailableFriendsArray.push(selectedUser);
      updateAvailableFriends(updatedAvailableFriendsArray);
   
  }


  return (
      <div> 
          <div className='simple-border'>
          <h4> Friends you can Add </h4>
            {availableFriends.map((user) => (
                <IndividualGroupUser key = { user.userName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
            ))} 
            <hr />
            <hr />
            <p> New Group Users </p>
            {currentGroupUsers.map((user) => (
                <NewGroupUser key = { user.userName } addGroupUser = {addGroupUser} removeGroupUser = {removeGroupUser} user = {user} />
            ))} 

          </div>

      </div>
  );
}


export default SimpleAddGroupUserLS;


//TEMP CODE
/*
            {currentGroupUsers.map((user) => (
                console.log(user)
            ))} 

  //localStorage.setItem("newGroupUser", '');
  //localStorage.getItem("temp");
  //console.log(theTemp)

          <h4> New Group Users</h4>
          <div className='simple-border'>
          {newGroupUser.map((user) => (
                <p key = {user}> {user } </p>
            ))} 
            </div>

*/


//BACKUP
/*

const SimpleAddGroupUsers= ({ currentUser, api }) => {
  /*
  let newGroupUsersLocalStorage = ["sam", "frodo"] 
  let string = JSON.stringify(students) 
  localStorage.setItem("students", string) 
  *//*
       ////
    // If I have this array:
    var myArray = ["david", "sam", "frodo"];

    // and this one:
    var toRemove = ["sam"];
    myArray = myArray.filter( ( el ) => !toRemove.includes( el ) );


    console.log(myArray)
    console.log(toRemove)
    console.log(myArray)
    ////


  useEffect(() => {
    console.log("users")
    console.log(users)
    console.log("newGroupUser")
    console.log(newGroupUser)
    let david = {
      userID: 1,
      userName: "david",
    }
    for(let i = 0; i < users.length; i++){
      console.log(users[i].userName)
   }
    //let stillCanAddUsers = users.filter(user => user.userName !== userName);


    let newUsers = [david]
    addUser(newUsers)


  }, [])

  //PART 1: Local Storage Users 
  let baseArray = []
  const [newGroupUser, setNewGroupUser] = useLocalStorage('newGroupUser', baseArray)

  //PART 2: Current Friends (you can add to new group)
  let david = {
    userID: 1,
    userName: "david",
  }
  let sam = {
    userID: 2,
    userName: "sam",
  }
  let frodo = {
    userID: 3,
    userName: "frodo",
  }

  let usersArray = [david, sam, frodo]

  const [users, addUser] = useState(usersArray)
  
  //PART 3: Actions 
  //Part 3A: Add  a Friend to a new Group
  const addNewGroupUser = (userName) => {
    console.log("You are going to add " + userName)
    
    //Step 1: Add New Group User to Local Storage Array 
    let currentGroupUserArray = [...newGroupUser];
    console.log(newGroupUser)
    console.log(typeof(newGroupUser))
    console.log(currentGroupUserArray)
    console.log(typeof(currentGroupUserArray))

    //let currentGroupUserArray = JSON.parse(newGroupUser);
    if(!currentGroupUserArray.includes(userName)) {
      currentGroupUserArray.push(userName)

      setNewGroupUser(currentGroupUserArray)
        
    } else {
      console.log("already in the group")
    }

    
    /*
    let retString = localStorage.getItem("students") 
    let retArray = JSON.parse(retString) 
    console.log(retArray); 
    console.log(oldGroupUserArray);
    oldGroupUserArray.push(userName);

    let newGroupUserArray = oldGroupUserArray;
    console.log(newGroupUserArray);
    setNewGroupUser(newGroupUserArray)
    *//*

    //Step 2: Remove User from Current available Friends
    const newUsers = users.filter(user => user.userName !== userName);
    addUser(newUsers)  
    

  }

  //Part 3B: Add a friend from the new group 
  const removeNewGroupUser = (userID) => {
      console.log("You will remove " + userID)
      //Step 1: Remove New Group User from Local Storage Array 
      localStorage.getItem("temp");

      //Step 2: Add User back to available Friends
  
  }


  //localStorage.setItem("newGroupUser", '');
  //localStorage.getItem("temp");
  //console.log(theTemp)

  return (
      <div> 
          <div className='simple-border'>
          <h4> Friends you can Add </h4>
            {users.map((user) => (
                <IndividualGroupUser key = { user.userName } addNewGroupUser = {addNewGroupUser} removeNewGroupUser = {removeNewGroupUser} user = {user} />
            ))} 
          </div>
          <h4> New Group Users</h4>
          <div className='simple-border'>
          {newGroupUser.map((user) => (
                <p key = {user}> {user } </p>
            ))} 
            </div>

      </div>
  );
}


export default SimpleAddGroupUsers;

*/


//APPENDIX
/*
const SimpleAddLocalStorage = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    //POST AREA
    const handleChange = (event) => {
      const { name, value } = event.target
      console.log(value)
      console.log(name)
  
      setIsChecked(!isChecked);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hi")
    }
  
    return (
      <div className="user">
          <form onSubmit={ handleSubmit }>
          <div className="topping">
          <input type="checkbox" id="user" name="user" value="Sam" checked={isChecked} onChange={handleChange} /> Sam
        </div>
            <p> is checked: {isChecked ? "checked" : "un-checked"}</p>
            <button type="submit"> Submit </button>
          </form>
      </div>
    );
}

export default SimpleAddLocalStorage;
*/