
import React , {lazy } from 'react'
import { Routes, Route } from "react-router-dom";

import App from './App'; //composant 
import  Jewellery from "./Jewellery"
import  Fashion from "./Fashion"
import  Electronic from "./Electronic"
import  PayPage from "./PayPage"
import CreationUser from './CreationUser'
import LoginForm from './LoginForm'
import Sports from './Sports'
import Jeux from './Jeux'
import Cmande from './Cmande'






export default function RoutesComponent() {
  return (
    <div> 
      <Routes>
      <Route path="/App" element={<App/>}></Route>
      <Route path="/Electronic" element={<Electronic/>}></Route>
      <Route path="/Fashion" element={<Fashion/>}></Route>
      <Route path="/Jewellery" element={<Jewellery/>}></Route>
      <Route path="/PayPage" element={<PayPage/>}></Route>
      <Route path="/CreationUser" element={<CreationUser/>}></Route>
      <Route path="/Sports" element={<Sports/>}></Route>
      <Route path="/Jeux" element={<Jeux/>}></Route>
      <Route path="/Cmande" element={<Cmande/>}></Route>



      
      <Route path="/LoginForm" element={<LoginForm/>}></Route>
      
      
      <Route path="/*" element={<App/>}></Route>
      </Routes>
    </div>
  )
}