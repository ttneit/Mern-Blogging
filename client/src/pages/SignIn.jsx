import { Label,TextInput,Button, Spinner ,Alert} from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
export default function SignIn() {
  const [formData,setFormData] = useState({})
  const navigate = useNavigate()
  // const [loading,setLoading] = useState(false)
  // const [errorMessage,setErrorMessage] = useState(null)
  const dispatch  = useDispatch();
  const {loading,error : errorMessage} = useSelector(state =>state.user)
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id] :e.target.value.trim()})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.password || !formData.email ) {
      // return setErrorMessage('Please fill out all fields')
      return dispatch(signInFailure('Please fill out all fields'));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false) {
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if(res.ok === true) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Personal Blogs</span>
          </Link>
          <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
            <Label>Email</Label>
            <TextInput 
                type='email'
                placeholder='Email'
                id='email'
                onChange={handleChange}
            />
            </div>
            <div>
            <Label>Password</Label>
            <TextInput 
                type='password'
                placeholder='***********'
                id='password'
                onChange={handleChange}
            />
            </div>
            <Button gradientDuoTone='purpleToBlue' type= 'submit' outline disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'> Loading...</span>
                  </>
                ) : 'Sign In'
              }
            </Button>
          
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
              errorMessage && (
                <Alert className='mt-5' color='failure'>
                  {errorMessage}
                </Alert>
              )
            }
        </div>
        
      </div>
    </div>
    
  )
}
