import React from 'react'
import { animate, motion } from 'framer-motion'
import {Link} from 'react-router-dom'
export default function About() {
  const left_variants = {
    initial :{opacity : 0, x : -200} , 
    animate : {opacity : 1 , x : 0} , 
    exit : {opacity : 0, x:200}
  }
  const right_variants = {
    initial :{opacity : 0, x : 200} , 
    animate : {opacity : 1 , x : 0} , 
    exit : {opacity : 0, x:-200}
  }
  const opacity_trans = {
    initial: { opacity: 0 ,y : 200},
    animate: { opacity: 1 ,y : 0},
    exit: { opacity: 0 }
  };
  return (
    // <div className='min-h-screen flex items-center justify-center' >
    //   <motion.div className='max-w-2xl mx-auto p-3 text-center' initial={{ x: -300 }}
    //     animate={{ x: 0 }}
    //     transition={{ ease: 'easeOut', duration: 2 }}>
    //     <div>
    //     <h1 className='text-3xl font font-semibold text-center my-7'>
    //           About My Blog
    //       </h1>
    //     </div>
    //     <div className='text-md text-gray-500 flex flex-col gap-6'>
    //       <p>
    //           Welcome to my Blog! This blog was followed to Sahand Ghavidel Mern Blog project,
    //           and serves as a personal project to share my thoughts , ideas,and other projects with the
    //           world.
    //       </p>
    //       <p>
    //           On this blog, you'll find weekly articles and tutorials on many topics
    //           such as Coding ,Gaming, Sport , Finance , Data
    //       </p>
    //       <p>
    //           We encourage you to leave comments on our posts and engage with
    //           other readers. You can like other people's comments and reply to
    //           them as well. We believe that a community of learners can help
    //           each other grow and improve.
    //       </p>
    //     </div>

    //   </motion.div>
    // </div>
    
    <div className='max-w-6xl mx-auto p-3'>
      <motion.div className='m-6' variants={opacity_trans} initial='initial' animate='animate' exit='exit' transition={{ ease: "easeOut", duration: 2 }}>
        <h2 className='border-b-2 border-black pb-2 text-3xl'>Overview</h2>
        <div className='text-justify'>
          <p className='mt-6'> Currently, I am a third-year student majoring in Data Science at Ho Chi Minh University of Science,
             with a passion for advancing my career in the field of Data. Throughout my academic journey, 
             I have enrolled in courses related to Data as well as expanding my knowledge of current technologies being utilized. 
             I am particularly interested in designing pipelines for transforming raw data and conducting data analysis steps, as well as visualizing them. 
             In addition to my technical skills, I possess a proactive attitude towards learning new technologies and a strong sense of responsibility towards my work.</p>
        </div>
      </motion.div>
      <motion.div className="m-6"  variants={right_variants} initial='initial' animate='animate' exit='exit' transition={{ ease: "easeOut", duration: 1 }}>
        <h2 className="border-b-2 border-black pb-2 text-3xl">Education</h2>
        <div className="mt-4">
          <div className="flex justify-between font-semibold">
            <span>Bachelor of Information Technology</span>
            <span>Jan 2021 - Present</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>University of Science, VNU-HCM</span>
            <span className="font-semibold">GPA: 3.68/4</span>
          </div>
          <div className="mt-1 italic">
            <span>Major: Data Science</span>
          </div>
        </div>
      </motion.div>
      <motion.div className='m-6'  variants={left_variants} initial='initial' animate='animate' exit='exit' transition={{ ease: "easeOut", duration: 1 }}>
        <h2 className="border-b-2 border-black pb-2 text-3xl">Projects</h2>
        <div>
          <div className="flex justify-between font-semibold">
            <a href="#">The system process and analyze log data from the online recruitment platform</a>
            <span>May 2024 - Jun 2024</span>
          </div>
          <div className="mt-1 pl-4">
            
            <p>Description : The system to process log data from Online Recruitment Application .
               The log data from applications such as website or mobile apps will be sent to Kafka in the middle step before being inserted into the Datalake in Cassandra .
                From raw data in Cassandra , the system build a ETL pipeline to process data then store processed data in MySQL 
            </p>
            <ul className='list-disc list-inside mt-2'>
              <h3 className='mb-2'>Feature</h3>
              <li><a>Crawl data from Online Website through API then store in datalake</a></li>
              <li><a>Develop ETL pipeline to transform raw data then store in data warehouse</a></li>
              <li><a>Create interactive dashboards</a></li>
            </ul>

            <p className='mt-2'>Tech stack : Python , Kafka , PySpark , Cassandra , MySQL
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between font-semibold">
            <a href='#'>The system process and analyze data from the real estate webiste</a>
            <span>Dec 2023 - Jan 2024</span>
          </div>
          <div className="mt-1 pl-4">
            
            <p>Description : The system employs web scraping techniques to gather real-time data from online real estate platform . 
              Through a ETL (Extract, Transform, Load) pipeline, the raw data is cleansed, transformed, and integrated into a structured format, 
              facilitating data analysis steps and visualization through interactive dashboards to see the the real estate market in Ho Chi Minh City
            </p>
            <ul className='list-disc list-inside mt-2'>
              <h3 className='mb-2'>Feature</h3>
              <li><a>Crawl data from Online Website through API then store in datalake</a></li>
              <li><a>Develop ETL pipeline to transform raw data then store in data warehouse</a></li>
              <li><a>Create interactive dashboards</a></li>
            </ul>

            <p className='mt-2'>Tech stack : Pyspark, Cassandra, Microsoft SQL Server, PowerBI
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between font-semibold">
            <a href="#">Football Performance Analysis</a>
            <span>Nov 2023 - Dec 2023</span>
          </div>
          <div className="mt-1 pl-4">
            
            <p>Description :  This project simulates the Data Science process from getting data from many sources to processing the data and using machine learning
            models to make predictions and evaluate football players’s performances by the stats of the players
            </p>
            <ul className='list-disc list-inside mt-2'>
              <h3 className='mb-2'>Responsibility</h3>
              <li><a>Crawl data from Website</a></li>
              <li><a>Process outlier data</a></li>
              <li><a>Analyze data</a></li>
              <li><a>Use Ridge Regression to predict the performance</a></li>
            </ul>

            <p className='mt-2'>Tech stack : Python, Numpy, Scikit-learn, Pandas
            </p>
          </div>
        </div>
        
      </motion.div>
      <div className="m-6">
        <h2 className="border-b-2 border-black pb-2 text-3xl">Skills</h2>
        <div className="mt-4">
          <div className="mt-1">
            <span className='font-semibold'>Programming Language: </span>
            <span>Python, C++, Javascript</span>
          </div>
          <div className="mt-1">
            <span className='font-semibold'>Frameworks: </span>
            <span>ReactJS, NodeJS</span>
          </div>
          <div className="mt-1">
            <span className='font-semibold'>Database: </span>
            <span>Microsoft SQL Server, Apache Cassandra, MySQL, MongoDB</span>
          </div>
          <div className="mt-1">
            <span className='font-semibold'>Tools: </span>
            <span>Tableau, Power BI, Git</span>
          </div>
          <div className="mt-1">
            <span>Having knowledge about Object-oriented programming , Data Structures and Algorithms</span>
          </div>
        </div>
      </div>
      <motion.div className='m-6' variants={left_variants} initial='initial' animate='animate' exit='exit' transition={{ ease: "easeOut", duration: 1 }}>
        <h2 className='border-b-2 border-black pb-2 text-3xl'>Contact</h2>
        <div className='text-justify'>
          <span className='font-semibold'>Email : </span>
          <span>thinhtien1312@gmail.com</span>
        </div>
        <div className='text-justify'>
          <span className='font-semibold'>Phone : </span>
          <span>(+84) 906 407 569</span>
        </div>
        <div className='text-justify'>
          <span className='font-semibold'>Location : </span>
          <span>Ho Chi Minh, Viet Nam</span>
        </div>
        
      </motion.div>
      <motion.div className='max-w-6xl mx-auto p-3' animate={{ x: 10 }} transition={{ ease: "easeOut", duration: 1 }} >
        <span>You want to see more projects : </span>
        <Link to='/projects' className='text-lg  text-teal-500 font-semibold hover:underline text-center'> View all posts</Link>
      </motion.div>
    </div>
    
  )
}
