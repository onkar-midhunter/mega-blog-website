import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth';
import { logout } from '../../store/authSlice';
import { LogOut } from 'lucide-react';

function LogoutBtn() {
  const dispatch = useDispatch();
  
  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    }).catch((err) => {
      console.log("error comes when logout:: error::", err)
    })
  }
  
  return (
    <button
      className='flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg'
      onClick={logOutHandler}
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  )
}

export default LogoutBtn