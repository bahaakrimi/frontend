
import React , {lazy } from 'react'
import { Routes, Route } from "react-router-dom";

import App from './App'; //composant 
import  Jewellery from "./Jewellery"
import  Fashion from "./Fashion"
import  Electronic from "./Electronic"
import  PayPage from "./PayPage"

const App = lazy(()=> import("./App") )



export default function RoutesComponent() {
  return (
    <div>
      <Routes>
      <Route path="/App" element={<App/>}></Route>
      <Route path="/Electronic" element={<Electronic/>}></Route>
      <Route path="/Fashion" element={<Fashion/>}></Route>
      <Route path="/Jewellery" element={<Jewellery/>}></Route>
      <Route path="/PayPage" element={<PayPage/>}></Route>
      <Route path="/*" element={<App/>}></Route>
      </Routes>
    </div>
  )
}