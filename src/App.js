import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomerRouters from "./routers/CustomerRouters.jsx";
import './App.css';
import HotelDashboard from "./hotel-dashboard/HotelDashboard.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<CustomerRouters />} ></Route>
        <Route path='/hotel-dashboard' element={<HotelDashboard />} ></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;