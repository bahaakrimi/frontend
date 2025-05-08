
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
import Cart from './Cart'
import  Tel from './Tel'
import Foot from './Foot'
import Pc from './Pc'
import Raquettes from './Raquettes'
import HandGripDesMains from './HandGripDesMains'
import Playstation from './Playstation'
import  Nintendo from './Nintendo'
import Xbox from './Xbox'
import Tshirt from './Tshirt'
import Jhumka from './Jhumka'
import Neklesh from './Neklesh'
import Kangan  from './Kangan'
import Women from './Women '
import Tshirt2 from './Tshirt2'
import Panier from './Panier'
import A from './A'

import Getcomandlist from './Getcomandlist'
import GetProduit from './GetProduit'
import Userlist from './Userlist'






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
      <Route path="/Cart" element={<Cart/>}></Route>
      <Route path="/Tshirt" element={<Tshirt/>}></Route>
      <Route path="/Kangan" element={<Kangan/>}></Route>
      <Route path="/Tshirt2" element={<Tshirt2/>}></Route>
      <Route path="/Panier" element={<Panier/>}></Route>
      <Route path="/GetProduit" element={<GetProduit/>}></Route>
      <Route path="/Userlist" element={<Userlist/>}></Route>
      <Route path="/A" element={<A/>}></Route>
    
      
      <Route path="/Getcomandlist" element={<Getcomandlist/>}></Route>
      

      <Route path="/Pc" element={<Pc/>}></Route>
      <Route path="/Tel" element={<Tel/>}></Route>
      <Route path="/Foot" element={<Foot/>}></Route>
      <Route path="/Raquettes" element={<Raquettes/>}></Route>
      <Route path="/Playstation" element={<Playstation/>}></Route>
      <Route path="/Raquettes" element={<Raquettes/>}></Route>
      <Route path="/Xbox" element={<Xbox/>}></Route>
      <Route path="/Neklesh" element={<Neklesh/>}></Route>
      <Route path="/Women" element={<Women/>}></Route>

      <Route path="/Jhumka" element={<Jhumka/>}></Route>
      <Route path="/HandGripDesMains" element={<HandGripDesMains/>}></Route>
      <Route path="/Nintendo" element={<Nintendo/>}></Route>





      
      <Route path="/LoginForm" element={<LoginForm/>}></Route>
      
      
      <Route path="/*" element={<App/>}></Route>
      </Routes>
    </div>
  )
}