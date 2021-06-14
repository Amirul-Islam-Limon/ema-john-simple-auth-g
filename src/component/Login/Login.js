import firebase from "firebase/app";
import "firebase/auth";
import {useContext, useState} from 'react'
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig)

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn:false,
    name:"",
    email:"",
    password:"",
    photoURL:""
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn=()=>{
    firebase.auth()
  .signInWithPopup(provider)
  .then((result)=>{
    const {displayName, email, photoURL} = result.user
    const userSignIn={
      isSignedIn:true,
      name:displayName,
      email:email,
      photoURL:photoURL
    }
    setUser(userSignIn)
    console.log(displayName, email, photoURL)
  })
  .catch(error=>{
    console.log(error.message);
    console.log(error.code);
  })

  }
  const handleSignOut=()=>{
    firebase.auth().signOut()
    .then(() => {
      const userSignOut ={
        isSignedIn:false,
        name:"",
        email:"",
        photoURL:""
      }
      setUser(userSignOut)
    }).catch((error) => {
      console.log("error", error)
    });
  }

  const handleFacebookLog=()=>{
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    
    var credential = result.credential;

    
    var user = result.user;

    console.log(user);
  })
  .catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });

  }

  const handleBlur=(e)=>{
    
    let isFieldValid=true;
    if(e.target.name === "email"){
      isFieldValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)
    }
    if(e.target.name === "password"){
      const isPasswordLength = e.target.value.length > 5
      const isPasswordHasNumber = /(?=.*\d)/.test(e.target.value)  
      isFieldValid = isPasswordLength && isPasswordHasNumber;
    }
    if(isFieldValid){
      const newUser = {...user};
      newUser[e.target.name] = e.target.value
      setUser(newUser);
    }
  }
  const handleSubmit=(e)=>{
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email,
      user.password)
     .then((userCredential) => {
      const newUserInfo = {...user}
      newUserInfo.success = "User Created successfully"
      newUserInfo.error = ""
      setUser(newUserInfo)
      updateUserProfile(user.name)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    const newUserInfo = {...user}
    newUserInfo.error = error.message
    newUserInfo.success = ""
    setUser(newUserInfo)
  });
    }
  
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    const user = userCredential.user;

    const newUserInfo = {...user}
    newUserInfo.success = "User Log in successfully"
    newUserInfo.error = ""
    setUser(newUserInfo)
    setLoggedInUser(newUserInfo)
    history.replace(from);
    console.log(user)
    
  })
  .catch((error) => {

    var errorCode = error.code;
    var errorMessage = error.message;
    const newUserInfo = {...user}
    newUserInfo.error = error.message
    newUserInfo.success = ""
    setUser(newUserInfo)
  });
  }
   e.preventDefault() 
  }

  const updateUserProfile=(name)=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(function() {
      console.log("user's name updated successfully")
    }).catch(function(error) {
      console.log(error)
    });
  }
  return (
    <div style={{textAlign:'center', marginTop:"15px"}}>
      <button onClick={handleFacebookLog}>login Using Facebook</button>
     {
       user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>:
       <button onClick={handleSignIn}>Sign in</button>
     }
     {
       user.isSignedIn && <div>
         <p>Name: {user.name}</p>
         <p>Email: {user.email}</p>
         <img src={user.photoURL} alt="" />
       </div>
     }

     <form onSubmit={handleSubmit}>
       <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
       <label htmlFor="newUser">User Sign Up!</label><br />

        {newUser && <label htmlFor="name">Your Name :</label>}
        {newUser && <input type="text" onBlur={handleBlur} placeholder="Your name"name="name" id="name" /> }

       <br />
       <label htmlFor="eml">Your Email: </label>
       <input type="email" name="email" id="eml" onBlur={handleBlur} placeholder="Email herr" /><br />
       <label htmlFor="pass">Password :</label>
       <input type="password" name="password" id="pass" onBlur={handleBlur} placeholder="password" /><br />
       <br />
       <input type="submit" value={newUser? "Sign Up":"Log In"} />
       {
        user.email && user.success? <p style={{color:"green"}}>{user.success}</p> : <p style={{color:"red"}}>{user.error}</p>
       }
     </form>
    </div>
  );
}

export default Login;
