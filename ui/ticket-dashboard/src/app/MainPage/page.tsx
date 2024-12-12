"use client"
import Dashboard from '@/components/Dashboard/Dashboard'
import Header from '@/components/HomePage/Header'
import Sidebar from '@/components/HomePage/Sidebar'
import Ticket from '@/components/Ticket/Ticket'
import React,{useState} from 'react'

const MainPage = () => {
    const [activePage, setActivePage] = useState("Home");

  return (
    <div>
        <Header/>
        <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="mr-10 bg-blue-200 w-1/5 ">
        <Sidebar setActivePage={setActivePage} />
      </div>

      {/* Main Content */}
      <div className="w-4/5">
        {activePage === "Dashboard" && <Dashboard />}
        {activePage === "Ticket" && <div><Ticket/></div>} 
      </div>
    </div>
    </div>
  )
}

export default MainPage

