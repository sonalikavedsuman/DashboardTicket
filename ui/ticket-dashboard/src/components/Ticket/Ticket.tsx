import { Button } from "@/components/ui/button";
import { Cross1Icon, DotFilledIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FlameIcon,
  Ticket,
  PhoneIcon,
  TicketCheckIcon,
  ChevronDown,
  ChevronUp,
  ChevronsUpDownIcon,
  PlusIcon,
} from "lucide-react"; // Import icons
import { Checkbox } from "../ui/checkbox";

const TicketPreviewMain1 = () => {
  return (
    <div className="bg-white pt-5 pl-5">
      <div id="header" className="flex flex-row justify-between pb-4">
        <div className="flex flex-row gap-2">
          <Button
            variant={"secondary"}
            className="text-green-400 font-extrabold text-xl h-6 w-6"
          >
            &#928;
          </Button>
          <p className="font-bold">Ticket preview</p>
        </div>
        <div className="flex flex-row gap-2 pr-28">
          <Button variant={"outline"} className="border-black">
            View Full Details
          </Button>
          <Cross1Icon className="mt-2" />
        </div>
      </div>
      <div id="main">
        <div
          id="section1"
          className="border-2 border-gray-200 rounded-lg p-4 w-11/12 flex flex-col"
        >
          <div className="flex flex-row justify-between border-b-2 pb-2">
            <div className="flex flex-row gap-6">
              <p className="font-bold text-lg">#TC-196</p>
              <p className="font-medium text-gray-800 text-lg">
                Defective Item Received
              </p>
            </div>
            <Button
              variant={"default"}
              className="mr-10 bg-sky-600 rounded-full"
            >
              Open
            </Button>
          </div>
          <div className="flex flex-row justify-evenly mt-5">
            <div className=" flex flex-col items-center justify-center border-r-2 pr-52">
              <p className=" font-semibold mb-1">Ticket Type</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="rounded-full">
                    <FlameIcon className="font-semibold " />
                    <p className="font-semibold">Incident</p>
                    <ChevronDown className="font-semibold" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>Incident1</DropdownMenuItem>
                  <DropdownMenuItem>Incident2</DropdownMenuItem>
                  <DropdownMenuItem>Incident13</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col items-center justify-center border-r-2 pr-52">
              <p className="font-semibold">Priority</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="rounded-full bg-rose-100"
                  >
                    <DotFilledIcon className="font-semibold text-rose-500" />
                    <p className="font-semibold text-rose-500">High</p>
                    <ChevronUp className="font-semibold text-rose-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>Low</DropdownMenuItem>
                  <DropdownMenuItem>Medium</DropdownMenuItem>
                  <DropdownMenuItem>High</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <p className="font-semibold ml-3">Assigned to</p>
              <div className="flex flex-row ">
                <p className="text-purple-500 w-8 h-8 rounded-full bg-black pt-1 pl-1 ">
                  FK
                </p>
                <p className="ml-2 mt-1">Bagus Fikri</p>
              </div>
            </div>
          </div>
        </div>
        <div id="section2">
          <p className="py-10 text-xl font-semibold">Ticket Activity</p>

          <div>
            
              <div className="flex flex-row ">
               
                  <Ticket
                    className={`h-8 w-8   bg-slate-300 rounded-full p-2`}
                  />
               
               
                  <FlameIcon
                    className={`h-8 w-8  bg-red-500 rounded-full p-2`}
                  />
                
                
                  <PhoneIcon
                    className={`h-8 w-8   bg-blue-500 rounded-full p-2`}
                  />
               \
                <div className="flex flex-col ml-3 mb-5">
                  <div className="flex flex-row">
                    <p className="text-gray-500">
                      
                    </p>
                    <p className="font-bold ml-1">descrp</p>
                  </div>
                  <p className="text-gray-500 text-xs">tue 11 dec 2023</p>
                </div>
              </div>
          
          </div>
          <div className="flex flex-row mb-8">
            <div className="rounded-full bg-black text-white h-8 w-8 pl-1 pt-1">
              <ChevronsUpDownIcon className="h-5 w-5 pt-1 pl-1" />
            </div>
            <p className="font-bold ml-3 my-1">View More Activity</p>
          </div>
        </div>
        <div id="section3" className="border-t-2 mr-10">
          <div className="flex flex-row justify-between mt-8">
            <p className="font-semibold text-medium">
              2 Upcoming Task
            </p>
            <Button variant={"secondary"}>
              <PlusIcon />
              <p className="font-semibold">Add New task</p>
            </Button>
          </div>
          
            <div className="flex items-center space-x-4" >
              <Checkbox className=" text-red-800"  />
              <label
                className="flex flex-col leading-none peer-disabled:cursor-not-allowed  ml-8"
              >
                <p className="text-md font-medium mt-8">V1</p>
                <p className="text-sm font-semibold text-gray-500 mt-3">
                  Due date 14 dec 2023
                </p>
              </label>
            </div>
            <div className="flex items-center space-x-4" >
              <Checkbox className=" text-red-800"  />
              <label
                className="flex flex-col leading-none peer-disabled:cursor-not-allowed  ml-8"
              >
                <p className="text-md font-medium mt-8">V2</p>
                <p className="text-sm font-semibold text-gray-500 mt-3">
                  Due date 14 dec 2023
                </p>
              </label>
            </div>
        </div>
      </div>
      <div id="footer">
        <div className="bg-green-600 h-8 text-white mr-10 mt-10 ">
          <div className="flex flex-row justify-around pt-1">
            
              <TicketCheckIcon className="" />
            <p className="uppercase font-light ">
             Ticket 192 has been updated
            </p>
            <Cross1Icon className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPreviewMain1;
