import React from 'react'
import {Footer} from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom'
export default function FooterComponent() {
  return (
    <Footer container>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'> 
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Personal Blogs</span>
              </Link>
            </div>
            <div>
              <Footer.Title title='About'/>
              <Footer.LinkGroup col>
                <Footer.Link href='#' >Other projects</Footer.Link>
                <Footer.Link href='#' >Personal project</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Connect'/>
              <Footer.LinkGroup col>
                <Footer.Link href='#' >Github</Footer.Link>
                <Footer.Link href='#' >Linkedin</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal'/>
              <Footer.LinkGroup col>
                <Footer.Link href='#' >Privacy</Footer.Link>
                <Footer.Link href='#' >Terms and Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright by='Me' year = {new Date().getFullYear()} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
        </div>
        </div>
        </div>
        
    </Footer>
  )
}
