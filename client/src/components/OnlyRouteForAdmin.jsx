import React from 'react'
import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'
export default function OnlyRouteForAdmin() {
    const currentUser = useSelector(state => state.user).currentUser    
  return (currentUser && currentUser.isAdmin ) ? <Outlet /> : <Navigate to='/signin'/>
}
