
import { useEffect, useState } from "react";

import { createBrowserRouter, RouterProvider, useNavigate,Outlet } from "react-router-dom";
import Dashboard from '../view/Dashboard/index';
import DetailPage from "../view/DetailPage/index";
import Register from "../view/register/index";
import Login from "../view/login";
import Sell from '../view/sell'
import {auth } from './firebase'
import {  onAuthStateChanged } from "firebase/auth";

import Profile from "../component/Profile.js";
const router = createBrowserRouter([
  {

    path: "/",
    element: <Layout/>,
    children:[
      
      {

        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/DetailPage/:productId",
        element: <DetailPage />,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/sell',
        element: <Sell/>,
      },
    
      {
        path: '/profile',
        element: <Profile/>,
      },
   

    ]
  },
  
 
]);
function Layout(){
const navigate = useNavigate()
const [user, setUser] = useState()
useEffect (()=>{
  onAuthStateChanged(auth,(user)=>{
    setUser(user)
  })
},[])
useEffect(() => {
const {pathname} = window.location;
if(user){
  if(pathname === '/login' || pathname === '/register')
 { navigate ('/')}
}else{
  if(pathname==='/sell'){
    navigate('/login')
  }
}


}, [window.location.pathname,user])
  return(


    <div>
      
    <Outlet/></div>
  )
}
function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
