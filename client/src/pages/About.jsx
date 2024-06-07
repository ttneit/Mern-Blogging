import React from 'react'
import { motion } from 'framer-motion'
export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center' >
      <motion.div className='max-w-2xl mx-auto p-3 text-center' initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ ease: 'easeOut', duration: 2 }}>
        <div>
        <h1 className='text-3xl font font-semibold text-center my-7'>
              About My Blog
          </h1>
        </div>
        <div className='text-md text-gray-500 flex flex-col gap-6'>
          <p>
              Welcome to my Blog! This blog was followed to Sahand Ghavidel Mern Blog project,
              and serves as a personal project to share my thoughts , ideas,and other projects with the
              world.
          </p>
          <p>
              On this blog, you'll find weekly articles and tutorials on many topics
              such as Coding ,Gaming, Sport , Finance , Data
          </p>
          <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
          </p>
        </div>

      </motion.div>
    </div>
  )
}
