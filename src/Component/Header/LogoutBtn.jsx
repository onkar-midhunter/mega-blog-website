import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {

  const dispatch = useDispatch();
  const logOutHandler = () =>{
    authService.logout().then(() =>{
      dispatch(logout());
    }).catch((err)=>{
      console.log("error comes whrn logout:: error::",err)
    })
  }
  return (
   <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logOutHandler}
    >Logout</button>
  )
}

export default LogoutBtn