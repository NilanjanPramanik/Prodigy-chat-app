import React from 'react';
import "./Auth.css";
import {auth, provider} from "../firebase";
import { signInWithPopup } from 'firebase/auth';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function Auth({setIsAuth}) {

    const handleSignIn = async ()=>{
        try{
            const result =  await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.accessToken);
            cookies.set("user-name", result.user.displayName);
            cookies.set("user-image", result.user.photoURL);
            setIsAuth(true)
            console.log(result)
        }catch(err){
            console.error(err);
        }

    }

  return (
    <div>
          <div className="userName__container">
            <p>Sign In using Google account.</p>
            <button onClick={handleSignIn}>Sign In With Google</button>
          </div>
    </div>
  )
}

export default Auth;