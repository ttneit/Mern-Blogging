import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { HiArrowSmRight,    HiUser } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';

export default function DashSidebar() {
    const location = useLocation();
    const currentUser = useSelector(state => state.currentUser);
    const [tab,setTab]= useState('');
    useEffect(()=>{
      const urlParams =new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    },[location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Sidebar.Item href="/dashboard?tab=profile" label= {'User'} icon={HiUser} active = {tab === 'profile'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                <Sidebar.Item href='#' icon={HiArrowSmRight}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
