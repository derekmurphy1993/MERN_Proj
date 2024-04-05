import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL})
            })
            const data = await res.json();
            console.log(data)
            dispatch(signInSuccess(data));
            nav('/')
        } catch (error) {
            console.log('could not sing in with google')
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg
    uppercase hover:opacity-90'>
         Sign In With Google</button>
  )
}