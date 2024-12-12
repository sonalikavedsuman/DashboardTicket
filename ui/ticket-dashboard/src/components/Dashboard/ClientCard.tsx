import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface CardProps {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   description?: string;
// }

export function ClientCard() {
  return (
    <div className="flex flex-row space-x-6 mt-5">
        <Card className="flex flex-col w-60 h-36">
            <CardHeader className="bg-blue-100 h-1/6">
              <CardTitle className="pt-2">
                <div className=" text-white bg-sky-500 h-8 w-8  rounded-full ">
                  <p className="pt-2 pl-1 font-thin">TS</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-5/6 mt-5">
              <p className="font-bold">TechInnovate Solutions</p>
              <p className="text-zinc-500">4 Projects</p>
            </CardContent>
          </Card>
          <Card className="flex flex-col w-60 h-36 ">
            <CardHeader className="bg-red-50 h-1/6">
              <CardTitle className="pt-2">
                <div className="text-slate-500 bg-white rounded-full h-8 w-8">
                  <p className="text-[8px]  pt-3  font-thin">ecofusion</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-5/6 mt-5">
              <p className="font-bold">EcoFusion Innovations</p>
              <p className="text-zinc-500">13 Projects</p>
            </CardContent>
          </Card>
    </div>
    
  );
}