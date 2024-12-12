"use client";
import { useState } from "react";
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
import { toast } from "react-hot-toast"; // For notifications

interface PersonalInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  personalInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export function PersonalInfoDrawer({ isOpen, onClose, onComplete, personalInfo }: PersonalInfoDrawerProps) {
  const [formData, setFormData] = useState(personalInfo || {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to create personal info
      const response = await axios.post('https://localhost:7210/api/PersonalInfo', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        createdAt: new Date().toISOString()
      });
      

      // Store the ID for later use
      localStorage.setItem('personalInfoId', response.data.id);
      
      // Show success message
      toast.success('Personal information saved successfully!');
      
      // Call the onComplete callback
      onComplete();
      
      // Close the drawer
      onClose();
    } catch (error) {
      console.error('Error saving personal information:', error);
      toast.error('Failed to save personal information');
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.address.trim() !== ''
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Personal Information</DrawerTitle>
            <DrawerDescription>
              Fill in your personal information below.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter your phone number"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter your address"
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