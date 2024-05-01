import React, { useEffect, useState } from 'react'
import { useLocation,Link } from 'react-router-dom'
import { HiArrowSmRight,    HiUser,HiDocumentText,HiOutlineUserGroup } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function DashSidebar() {
    const location = useLocation();
    const currentUser = useSelector(state => state.user).currentUser;
    const dispatch = useDispatch();
    const [tab,setTab]= useState('');
    useEffect(()=>{
      const urlParams =new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    },[location.search]);
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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                  <Sidebar.Item href="/dashboard?tab=profile" label= {currentUser.isAdmin ? 'Admin' : 'User'} icon={HiUser} active = {tab === 'profile'} labelColor='dark' as='div'>
                      Profile
                  </Sidebar.Item>
                </Link>
                {
                  currentUser.isAdmin && (
                    <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item href="/dashboard?tab=posts" icon={HiDocumentText} active = {tab === 'posts'} labelColor='dark' as='div'>
                      Posts
                    </Sidebar.Item>
                    </Link>
                  )
                }
                {
                  currentUser.isAdmin && (
                    <Link to='/dashboard?tab=users'>
                    <Sidebar.Item href="/dashboard?tab=users" icon={HiOutlineUserGroup} active = {tab === 'users'} labelColor='dark' as='div'>
                      Users
                    </Sidebar.Item>
                    </Link>
                  )
                }
                
                <Sidebar.Item className='cursor-pointer' onClick={handleSignOut} icon={HiArrowSmRight}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
