import React, { useContext } from 'react'
import {useSelector} from 'react-redux'
import {Outlet,Navigate} from 'react-router-dom'
import { UserContext } from '../context/userContext'
export default function PrivateRoute() {
    // const currentUser = useSelector(state => state.user).currentUser    
    const userContext = useContext(UserContext)
  return userContext.currentUser ? <Outlet /> : <Navigate to='/signin'/>
}
