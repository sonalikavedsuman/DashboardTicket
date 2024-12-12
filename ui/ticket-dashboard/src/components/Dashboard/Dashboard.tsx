import { FlameIcon } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PersonalInfoDrawer } from "./PersonalInfoDrawer";
import { ProjectInfoDrawer } from "./ProjectInfoDrawer";
import { useState } from "react";
import { ClientContentDrawer } from "./ClientContentDrawer";
import { DocumentEditorDrawer } from "./DocumentEditorDrawer";
import { ClientCard } from "./ClientCard";

const DashboardMain = () => {
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false);
  const [isDrawerOpen2, setIsDrawerOpen2] = useState(false);
  const [isDrawerOpen3, setIsDrawerOpen3] = useState(false);
  const [isDrawerOpen4, setIsDrawerOpen4] = useState(false);
  const handleDrawerOpen1 = () => {
    setIsDrawerOpen1(true);
  };

  const handleDrawerClose1 = () => {
    setIsDrawerOpen1(false);
  };

  const handleDrawerOpen2 = () => {
    setIsDrawerOpen2(true);
  };

  const handleDrawerClose2 = () => {
    setIsDrawerOpen2(false);
  };
  const handleDrawerOpen3 = () => {
    setIsDrawerOpen3(true);
  };

  const handleDrawerClose3 = () => {
    setIsDrawerOpen3(false);
  };

  const handleDrawerOpen4 = () => {
    setIsDrawerOpen4(true);
  };

  const handleDrawerClose4 = () => {
    setIsDrawerOpen4(false);
  };

  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });

  const calculateProgress = () => {
    const completedCount = Object.values(completedSteps).filter(Boolean).length;
    return (completedCount / 4) * 100;
  };

  const handleStep1Complete = () => {
    setCompletedSteps((prev) => ({ ...prev, step1: true }));
    handleDrawerClose1();
  };

  const handleStep2Complete = () => {
    setCompletedSteps((prev) => ({ ...prev, step2: true }));
    handleDrawerClose2();
  };

  const handleStep3Complete = () => {
    setCompletedSteps((prev) => ({ ...prev, step3: true }));
    handleDrawerClose3();
  };

  const handleStep4Complete = () => {
    setCompletedSteps((prev) => ({ ...prev, step4: true }));
    handleDrawerClose4();
  };

  return (
    <div className="mt-10 ">
      <div className="my-10">
        <h1 className="font-bold">Dashboard</h1>
        <p className="text-gray-500 font-semibold">
          Some explanation here on overview
        </p>
      </div>
      <div className="border-fuchsia-600 border-2 rounded-lg p-4 w-4/5 ">
        <div className="flex flex-col mb-10">
          <div className="flex flex-row justify-between mb-3">
            <div className="flex justify-start ">
              <FlameIcon className="text-fuchsia-600 mr-2" />
              <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            </div>
            <p>{calculateProgress()}% Completed</p>
          </div>
          <Progress value={calculateProgress()} />
        </div>
        <div className="flex flex-col">
          <RadioGroup defaultValue="option-one">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-5 ">
                <div className="flex items-center space-x-2  ">
                  <RadioGroupItem
                    value="option-one"
                    id="option-one"
                    checked={completedSteps.step1}
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-green-600"> Step 1</p>
                  <p className=" font-semibold text-gray-500">
                    Personal Information
                  </p>
                  <p className=" font-medium text-gray-500">
                    Add your Personal Information
                  </p>
                </div>
              </div>
              <Button
                variant={"secondary"}
                className={`rounded-full ${
                  completedSteps.step1 ? "bg-gray-400" : "bg-green-600"
                } text-white`}
                onClick={handleDrawerOpen1}
                disabled={completedSteps.step1}
              >
                {completedSteps.step1 ? "Completed" : "Start"}
              </Button>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-5 ">
                <div className="flex items-center space-x-2  ">
                  <RadioGroupItem
                    value="option-two"
                    id="option-two"
                    checked={completedSteps.step2}
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-green-600"> Step 2</p>
                  <p className=" font-semibold text-gray-500">
                    Add your First Project
                  </p>
                  <p className="font-medium text-gray-500">Some Description</p>
                </div>
              </div>
              <Button
                variant={"secondary"}
                className={`rounded-full ${
                  completedSteps.step2 ? "bg-gray-400" : "bg-green-600"
                } text-white`}
                onClick={handleDrawerOpen2}
                disabled={completedSteps.step2}
              >
                {completedSteps.step2 ? "Completed" : "Start"}
              </Button>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-5">
                <div className="flex items-center space-x-2  ">
                  <RadioGroupItem
                    value="option-three"
                    id="option-three"
                    checked={completedSteps.step3}
                  />
                </div>
                <div className="mb-4">
                  <p className="text-lg font-bold text-fuchsia-600"> Step 3</p>
                  <p className="font-semibold text-black">
                    Add Content to this client
                  </p>
                  <p className="font-medium text-gray-500">Some Description</p>
                </div>
              </div>
              <Button
                variant={"secondary"}
                className={`rounded-full ${
                  completedSteps.step3 ? "bg-gray-400" : "bg-fuchsia-600"
                } text-white`}
                onClick={handleDrawerOpen3}
                disabled={completedSteps.step3}
              >
                {completedSteps.step3 ? "Completed" : "Start"}
              </Button>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-5">
                <div className="flex items-center space-x-2  ">
                  <RadioGroupItem
                    value="option-fourth"
                    id="option-fourth"
                    checked={completedSteps.step4}
                  />
                </div>
                <div className="mb-4">
                  <div className="flex flex-row">
                    <p className="text-lg font-bold text-fuchsia-600">Step 4</p>
                    <p className="font-medium text-gray-400">
                      (opens after completion of Steps 2 and 3)
                    </p>
                  </div>

                  <p className="font-semibold text-black">
                    Use Document Editor
                  </p>
                  <p className="font-medium text-gray-500">Some Description</p>
                </div>
              </div>
              <Button
                variant={"secondary"}
                className={`rounded-full ${
                  completedSteps.step4 ? "bg-gray-400" : "bg-fuchsia-600"
                } text-white`}
                onClick={handleDrawerOpen4}
                disabled={completedSteps.step4}
              >
                {completedSteps.step4 ? "Completed" : "Start"}
              </Button>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div>
        <div>
          <div className="flex flex-row space-x-7">
            <ClientCard />
          </div>
        </div>
      </div>
      <PersonalInfoDrawer
        isOpen={isDrawerOpen1}
        onClose={handleDrawerClose1}
        onComplete={handleStep1Complete}
        personalInfo={{
          fullName: "",
          email: "",
          phone: "",
          address: "",
        }}
      />
      <ProjectInfoDrawer
        isOpen={isDrawerOpen2}
        onClose={handleDrawerClose2}
        onComplete={handleStep2Complete}
        projectInfo={{
          projectName: "",
          description: "",
          projectNumber: "",
        }}
      />
      <ClientContentDrawer
        isOpen={isDrawerOpen3}
        onClose={handleDrawerClose3}
        onComplete={handleStep3Complete}
        contentInfo={{
          shortName: "",
          detailName: "",
          clientProjectNumber: 0,
        }}
      />
      <DocumentEditorDrawer
        isOpen={isDrawerOpen4}
        onClose={handleDrawerClose4}
        onComplete={handleStep4Complete}
        // documentInfo={{
        //   fullName: "",
        //   email: "",
        //   phone: "",
        //   address: "",
        //   projectName: "",
        //   projectDescription: "",
        //   contentTitle: "",
        //   contentDetails: "",
        // }}
      />
    </div>
  );
};

export default DashboardMain;
