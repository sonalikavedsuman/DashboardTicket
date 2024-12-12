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

interface ClientContentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  contentInfo?: {
    shortName: string;
    detailName: string;
    clientProjectNumber: number;
  };
}

export function ClientContentDrawer({
  isOpen,
  onClose,
  onComplete,
  contentInfo,
}: ClientContentDrawerProps) {
  const [formData, setFormData] = useState(
    contentInfo || {
      shortName: "",
      detailName: "",
      clientProjectNumber:0,
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get projectInfoId from localStorage
      const projectInfoId = localStorage.getItem('projectInfoId');
      
      if (!projectInfoId) {
        toast.error('Please complete project information first');
        return;
      }

      const response = await axios.post('https://localhost:7210/api/ClientContent', 
        {
          shortName: formData.shortName,
          detailName: formData.detailName,
          clientProjectNumber: formData.clientProjectNumber,
          projectInfoId: projectInfoId
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
        localStorage.setItem('contentId', response.data.id);
        toast.success('Content saved successfully!');
        onComplete();
        onClose();
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const isFormValid = () => {
    return (
      formData.shortName.trim() !== '' &&
      formData.detailName.trim() !== ''
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Content Information</DrawerTitle>
            <DrawerDescription>
              Fill in your content details below.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                value={formData.shortName}
                onChange={(e) =>
                  setFormData({ ...formData, shortName: e.target.value })
                }
                placeholder="Enter Short Name"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detailName">Detail Name</Label>
              <Input
                id="detailName"
                value={formData.detailName}
                onChange={(e) =>
                  setFormData({ ...formData, detailName: e.target.value })
                }
                placeholder="Enter Detail Name"
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