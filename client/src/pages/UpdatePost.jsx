import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, uploadBytesResumable ,ref} from 'firebase/storage'
import {app} from '../firebase'
import {CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate,useParams} from 'react-router-dom';
import { UserContext } from '../context/userContext';
export default function UpdatePost() {
    // const currentUser = useSelector(state =>state.user).currentUser;
    const userContext = useContext(UserContext)
    const [file,setFile] = useState(null);
    const [imageUploadProgress,setImageUploadProgress] =useState(null);
    const [imageUploadError,setImageUploadError] =useState(null);
    const [formData,setFormData] = useState({});
    const [publishError,setPublishError] = useState(null);
    const navigate = useNavigate();
    const {postId} = useParams();
    useEffect(() => {
        try {
            const fetchPosts = async() => {
                const res = await fetch(`/api/post/getpost/${postId}`)
                const data = await res.json();
                if(!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if(res.ok) {
                    setPublishError(null);
                    setFormData(data);
                }
            }
            fetchPosts();
            
        } catch (error) {
            console.log(error.message);
        }
    },[postId]);

    const handleUploadImage = async () => {
        try {
            if(!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime()+'-'+file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,file); 
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress  = 
                        (snapshot.bytesTransferred / snapshot.totalBytes) *100 ;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error ) => {
                    setImageUploadError(error.message);
                    setImageUploadProgress(null);
                },
                () =>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({...formData,image : downloadURL });
                    })
                }
            )
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };
    const handleFormData = async(e) => {
        
    }
    const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await fetch (`/api/post/update/${postId}/${userContext.currentUser._id}`, {
            method:'PUT',
            headers:{'Content-Type' :'application/json'},
            body:JSON.stringify(formData),
        })
        console.log(res);
        const data = await res.json();
        
        if(!res.ok) {
            setPublishError(data.message);
            return;
        }else{
            setPublishError(null);
            navigate(`/post/${data.slug}`);
        }
    } catch (error) {
        
    }
    }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type ='text' placeholder='Title' required id = 'title' className='flex-1' onChange={(e) =>setFormData({ ...formData, title: e.target.value })} value={formData.title}/>
               <Select onChange={(e) =>setFormData({ ...formData, category: e.target.value })} value={formData.category}>
                    <option value='uncategorized' > Uncategorized</option>
                    <option value='Coding' > Coding</option>
                    <option value='Sport' > Sport</option>
                    <option value='finance' > Finance</option>
                    <option value='gaming' > Gaming</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center jusitfy-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled = {imageUploadProgress}>
                    {
                        imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar value ={imageUploadProgress} text= {`${imageUploadProgress || 0} %`} />
                        </div>
                        ) : 'Upload image'
                    }
                </Button>

            </div>
            {
                imageUploadError && (
                    <Alert color='failure' >
                        {imageUploadError}
                    </Alert>
                )
            }
            {
                formData.image  && (
                    <img src = {formData.image} alt='upload' className='w-full h-72 object-cover' />
                )
            }
            <ReactQuill theme='snow' placeholder='Write something ... ' className='h-72 mb-12' required onChange={(value) => setFormData({...formData,content :value})} value={formData.content}
            modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link", "image", "video"],
                    ["code-block"],
                    ["clean"],
                  ],
                },
                clipboard: {
                  matchVisual: false,
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
              ]}/>
            <Button type='submit' gradientDuoTone='purpleToPink' >
                Edit post
            </Button>
            {
                publishError && <Alert color='failure' className='mt-5'>{publishError}</Alert>
            }
        </form>
    </div>
  )
}
