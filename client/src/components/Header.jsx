import React from 'react'
import {Avatar, Button,Dropdown,Navbar,TextInput} from 'flowbite-react'
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import { FaMoon } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const currentUser = useSelector(state =>state.user).currentUser;
  const handleSignOut = async() => {
    try {
      const res = await fetch('/api/user/signout', {
        method : 'POST',
      })
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      }else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar>
      <Navbar.Brand>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'> 
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Personal Blogs</span>
        </Link>
        
      </Navbar.Brand>
      <form>
          <TextInput 
              type='text'
              placeholder='Search'
              rightIcon={ AiOutlineSearch }
              className='hideen lg:inline'
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray'   pill  onClick={() =>dispatch(changeTheme())}>
                <FaMoon />
        </Button>
        {
          currentUser ? (
            <Dropdown arrowIcon={false} inline label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />

            }>
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button gradientDuoTone='purpleToBlue' outline href='/signin'>
              Sign In
            </Button>
          )
        }
        
      </div>
      <Navbar.Collapse>
            <Navbar.Link active ={path === '/'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active ={path === '/about'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active ={path === '/project'}>
                <Link to='/project'>Project</Link>
            </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
