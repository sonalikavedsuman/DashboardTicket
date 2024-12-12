import { ContactRound } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="bg-blue-200 flex flex-row justify-between ">
      <Image src="/Images/logo.png" alt="logo" width="80" height="50"/>
      <div className="flex flex-row p-5">
        <ContactRound className="text-black mr-8 w-8 h-8 " />
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
