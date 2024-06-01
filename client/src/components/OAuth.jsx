import { Button } from 'flowbite-react'
import React, { useContext } from 'react'
import {AiFillGoogleCircle} from'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase'
// import { useDispatch } from 'react-redux'
// import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
export default function OAuth() {
  const auth = getAuth(app);
  // const dispatch = useDispatch();
  const userContext = useContext(UserContext)
  const navigate = useNavigate();
  const handleGoogleClick = async(e) =>{
    const provider  = new GoogleAuthProvider()
    provider.getCustomParameters({'prompt':'select_account'})
    try {
      const resultsFromGoogle = await signInWithPopup(auth,provider)
      const res = await fetch('/api/auth/google',{
        method : 'POST',
        headers :{'Content-Type' : 'application/json'},
        body: JSON.stringify({
          name:resultsFromGoogle.user.displayName,
          email:resultsFromGoogle.user.email,
          googlePhotoUrl:resultsFromGoogle.user.photoURL,
        })
      })
      const data = await res.json();
      if(res.ok === true) {
        // dispatch(signInSuccess(data));
        userContext.signInSuccess(data);
        navigate('/');
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle classname='w-6 h-6 mr-2' />
        Continue with Google
    </Button>
  )

  
}
