import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'
import {motion} from 'framer-motion'
import { UserContext } from '../context/userContext'
import AnimatedPage from './AnimatedPage'
export default function Home() {
  const [posts,setPosts] = useState([]);
  const userContext = useContext(UserContext)
  const [loading ,setLoading] = useState(userContext.loading)
  useEffect(()=> {
    const fetchPosts = async() => {
      setLoading(true)
      try {
        const res = await fetch(`/api/post/getposts?limit=6`)
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false)
      }
    };
    fetchPosts();
  },[]);
  const Spinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
    </div>
  );
  return (
    <AnimatedPage>
      <div>
      <motion.div className='flex flex-col gap-6  lg:p-28 p-3 max-w-6xl mx-auto' animate={{ x: 50 }} transition={{ ease: "easeOut", duration: 1 }}>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my blog</h1>
        <p className='text-gray-500 text-lg sm:text-lg'>On this blog, you'll find weekly articles and tutorials on many topics
              such as Coding ,Gaming, Sport , Finance , Data</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'> View all posts</Link>
      </motion.div>
      

      <motion.div
        className='max-w-6xl mx-auto p-3 flex flex-col gap-6 py-7'
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        {loading ? (
          <Spinner></Spinner>
        ) : (
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent posts</h2>
              <div className='flex flex-wrap gap-4 items-center justify-center'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link to='/search' className='text-lg text-teal-500 hover:underline text-center'>
                View all posts
              </Link>
            </div>
          )
        )}
      </motion.div>
    </div>
    </AnimatedPage>
    
  )
}
