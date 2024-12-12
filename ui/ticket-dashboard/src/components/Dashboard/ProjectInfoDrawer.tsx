"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ProjectInfoProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  projectInfo?: {
    projectName: string;
    description: string;
    projectNumber: string;
  };
}

export function ProjectInfoDrawer({ isOpen, onClose, onComplete, projectInfo }: ProjectInfoProps) {
  const [formData, setFormData] = useState(projectInfo || {
    projectName: "",
    description: "",
    projectNumber:"",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get personalInfoId from localStorage
      const personalInfoId = localStorage.getItem('personalInfoId');
      
      if (!personalInfoId) {
        toast.error('Please complete personal information first');
        return;
      }

      const response = await axios.post('https://localhost:7210/api/ProjectInfo', 
        {
          projectName: formData.projectName,
          description: formData.description,
          projectNumber: formData.projectNumber,
          personalInfoId: personalInfoId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          httpsAgent: new (require('https').Agent)({  
            rejectUnauthorized: false
          })
        }
      );

      if (response.data) {
        // Store projectId for later use
        localStorage.setItem('projectInfoId', response.data.id);
        toast.success('Project information saved successfully!');
        onComplete();
        onClose();
      }
    } catch (error) {
      console.error('Error saving project information:', error);
      toast.error('Failed to save project information');
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const isFormValid = () => {
    return (
      formData.projectName.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.projectNumber.trim() !== ''
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Project Information</DrawerTitle>
            <DrawerDescription>
              Fill in your project details below.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                placeholder="Enter your project name"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter project description"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectNum">Number of Projects</Label>
              <Input
                id="projectNum"
                value={formData.projectNumber}
                onChange={(e) =>
                  setFormData({ ...formData, projectNumber: e.target.value })
                }
                placeholder="Number of Projects"
                required
                disabled={loading}
              />
            </div>
            <DrawerFooter>
              <Button 
                type="submit" 
                disabled={loading || !isFormValid()}
                className={loading ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {loading ? 'Saving...' : 'Save changes'}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" disabled={loading}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}