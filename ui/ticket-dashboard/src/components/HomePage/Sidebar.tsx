"use client";
import React from "react";
import { LayoutPanelLeft, Ticket } from "lucide-react";
import { Button } from "../ui/button";

interface HomeProps {
  setActivePage: (page: string) => void; // Explicitly typing the prop
}

const Sidebar: React.FC<HomeProps> = ({ setActivePage }) => {
  return (
    <div className="ml-5 mt-10 ">
      <Button
        variant="ghost"
        className="w-60 flex flex-row justify-start rounded-full mb-4 "
        onClick={() => setActivePage("Dashboard")}
      >
        <LayoutPanelLeft className="text-pink-700 fill-pink-700 " />
        <p className="text-black font-bold text-xl">Dashboard</p>
      </Button>

      <Button
        variant="ghost"
        className="w-60 flex flex-row justify-start rounded-full mb-4"
        onClick={() => setActivePage("Ticket")}
      >
        <Ticket className="text-blue-500 fill-blue-500" />
        <p className="text-blue-400 font-bold text-xl">Ticket Preview</p>
      </Button>

      
    </div>
  );
};

export default Sidebar;
