import { Label,TextInput,Button, Alert, Spinner, Modal } from 'flowbite-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable ,ref} from 'firebase/storage'
import { app } from '../firebase';
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import { updateUserFailure,updateUserSuccess,updateUserStart,deleteUserStart,deleteUserSuccess,deleteUserFailure ,signOutSuccess} from '../redux/user/userSlice';
import { UserContext } from '../context/userContext';
export default function DashProfile() {
    // const currentUser = useSelector(state =>state.user).currentUser;
    // const error = useSelector(state =>state.user).error;
    // const loading = useSelector(state =>state.user).loading;
    const userContext = useContext(UserContext);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError,setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccessfull,setUpdateUserSuccess] = useState(null);
    const [updateUserError,setUpdateUserError] = useState(null);
    const [formData,setFormData] = useState({});
    const [showModal,setShowModal] = useState(false);
    // const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
      };
    const handleSubmit = async(e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0 ) {
        return
      }
      if (imageFileUploading ) {
        setUpdateUserError('No changes made')
        return ;
      }
      try {
        // dispatch(updateUserStart());
        userContext.updateUserStart();
        const res = await fetch (`/api/user/updateUser/${currentUser._id}`, {
          method : 'PUT',
          headers : {'Content-Type' : 'application/json'},
          body:JSON.stringify(formData),
        })
        const data = await res.json();
        if(res.ok) {
          // dispatch(updateUserSuccess(data));  
          userContext.updateUserSuccess(data)
          setUpdateUserSuccess("User's profile is updated successully ")
        }else {
          setUpdateUserError(data.message)
          // dispatch(updateUserFailure(data.message));
          userContext.updateUserFailure(data.message)
        }
      } catch (error) {
        // dispatch(updateUserFailure(error.message));
        userContext.updateUserFailure(error.message)
        setUpdateUserError(error.message)
      }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    };
    useEffect(() =>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
    const uploadImage = async(e) =>{
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress  = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100 ;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error ) => {
                setImageFileUploadError('Could not upload image(File must be less than 2MB');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                    setImageFileUrl(downloadURL);
                    setFormData({...formData,profilePicture: downloadURL});
                    setImageFileUploading(false);
                })
            }
        )
    }
  const handleDeleteUser = async(e) => {
    setShowModal(false);
    try {
      // dispatch(deleteUserStart());
      userContext.deleteUserStart();
      const res = await fetch(`/api/user/deleteUser/${userContext.currentUser._id}`,{
        method : 'DELETE',
      });
      const data = await res.json();
      if(res.ok) {
        // dispatch(deleteUserSuccess(data));  
        userContext.deleteUserSuccess(data);
      }else { 
        // dispatch(deleteUserSuccess(data.message));
        userContext.deleteUserSuccess(data);
      }
    } catch (error) {
      // dispatch(deleteUserFailure(error.message));
      userContext.deleteUserSuccess(data);
    }
  };
  const handleSignOut = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method : 'POST',
      })
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      }else {
        // dispatch(signOutSuccess());
        userContext.signOutSuccess();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>
            Profile
        </h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
            <input type= 'file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} className='hidden'/>
            <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || userContext.currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
            <div>
            <Label value = 'Your Username' />
            <TextInput 
                type='text'
                defaultValue={userContext.currentUser.username}
                id='username'
                onChange={handleChange}
            />
            </div>
            <div>
            <Label value = 'Your Email' />
            <TextInput 
                type='email'
                defaultValue={userContext.currentUser.email}
                id='email'
                onChange={handleChange}
            />
            </div>
            <div>
            <Label value = 'Your Password' />
            <TextInput 
                type='password'
                defaultValue={''}
                id='password'
                onChange={handleChange}
            />
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit 'outline disabled = {userContext.loading || imageFileUploading}>
              {userContext.loading ? 'Loading...' : ' Update'} 
            </Button>
            {
              userContext.currentUser.isAdmin && (
                <Link to ='/create-post'>
                  <Button gradientDuoTone='purpleToBlue' type='button' className='w-full'>
                    Create post 
                  </Button>
                </Link>
              )
            }
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span onClick = { () => setShowModal(true)}className='cursor-pointer' > Delete account</span>
            <span onClick={handleSignOut} className='cursor-pointer'> Sign out</span>
        </div>
        {
          updateUserSuccessfull && (
            <Alert color='success' className='mt-5'>
              {updateUserSuccessfull}
            </Alert>
          )
        }
        {
          updateUserError && (
            <Alert color='failure' className='mt-5'>
              {updateUserError}
            </Alert>
          )
        }
        {
          userContext.error && (
            <Alert color='failure' className='mt-5'>
              {userContext.error}
            </Alert>
          )
        }
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body >
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account? </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
                  Yes, I'm sure
                </Button>
                <Button color='gray ' onClick={() => setShowModal(false)}>
                  No,Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  )
}
