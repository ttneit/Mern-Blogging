import React, { useContext } from 'react'
// import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'
import { UserContext } from '../context/userContext'
export default function OnlyRouteForAdmin() {
    // const currentUser = useSelector(state => state.user).currentUser   
    const userContext = useContext(UserContext) 
  return (userContext.currentUser && userContext.currentUser.isAdmin ) ? <Outlet /> : <Navigate to='/signin'/>
}
