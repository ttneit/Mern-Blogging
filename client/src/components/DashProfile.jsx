import { Label,TextInput,Button, Alert, Spinner } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, uploadBytesResumable ,ref} from 'firebase/storage'
import { app } from '../firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateUserFailure,updateUserSuccess,updateUserStart } from '../redux/user/userSlice';
export default function DashProfile() {
    const currentUser = useSelector(state =>state.user).currentUser;
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const filePickerRef = useRef();
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError,setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccessfull,setUpdateUserSuccess] = useState(null);
    const [updateUserError,setUpdateUserError] = useState(null);
    const [formData,setFormData] = useState({});
    const dispatch = useDispatch();
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
        dispatch(updateUserStart());
        const res = await fetch (`/api/user/updateUser/${currentUser._id}`, {
          method : 'PUT',
          headers : {'Content-Type' : 'application/json'},
          body:JSON.stringify(formData),
        })
        const data = await res.json();
        if(res.ok) {
          dispatch(updateUserSuccess(data));  
          setUpdateUserSuccess("User's profile is updated successully ")
        }else {
          setUpdateUserError(data.message)
          dispatch(updateUserFailure(data.message));
        }
      } catch (error) {
        dispatch(updateUserFailure(error.message));
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
            src={imageFileUrl || currentUser.profilePicture}
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
                defaultValue={currentUser.username}
                id='username'
                onChange={handleChange}
            />
            </div>
            <div>
            <Label value = 'Your Email' />
            <TextInput 
                type='email'
                defaultValue={currentUser.email}
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
            <Button gradientDuoTone='purpleToBlue' type='submit 'outline>
              Update 
            </Button>
        </form>
        <div className='text-red-500 flex justify-between mt-5'>
            <span className='cursor-pointer'> Delete account</span>
            <span className='cursor-pointer'> Sign out</span>
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
    </div>
  )
}
