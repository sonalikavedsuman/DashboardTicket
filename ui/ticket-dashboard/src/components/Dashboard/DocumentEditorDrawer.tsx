"use client";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Interfaces
interface PersonalInfo {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface ProjectInfo {
  id: string;
  projectName: string;
  description: string;
  personalInfoId: string;
}

interface ClientContent {
  id: string;
  shortName: string;
  detailName: string;
  projectInfoId: string;
}

interface DocumentData {
  id: string;
  personalInfo: PersonalInfo;
  projectInfo: ProjectInfo;
  clientContent: ClientContent;
}

interface DocumentEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface IdsForm {
  personalInfoId: string;
  projectInfoId: string;
  clientContentId: string;
}

interface IdOptions {
  personalInfoIds: PersonalInfo[];
  projectInfoIds: ProjectInfo[];
  clientContentIds: ClientContent[];
}

export function DocumentEditorDrawer({
  isOpen,
  onClose,
  onComplete,
}: DocumentEditorDrawerProps) {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<IdsForm>({
    personalInfoId: '',
    projectInfoId: '',
    clientContentId: ''
  });
  const [idOptions, setIdOptions] = useState<IdOptions>({
    personalInfoIds: [],
    projectInfoIds: [],
    clientContentIds: []
  });

  // Table columns
  const columns: ColumnDef<DocumentData>[] = [
    {
      accessorFn: (row) => row.personalInfo?.fullName ?? 'N/A',
      header: "Full Name",
    },
    {
      accessorFn: (row) => row.personalInfo?.email ?? 'N/A',
      header: "Email",
    },
    {
      accessorFn: (row) => row.personalInfo?.phone ?? 'N/A',
      header: "Phone",
    },
    {
      accessorFn: (row) => row.personalInfo?.address ?? 'N/A',
      header: "Address",
    },
    {
      accessorFn: (row) => row.projectInfo?.projectName ?? 'N/A',
      header: "Project Name",
    },
    {
      accessorFn: (row) => row.projectInfo?.description ?? 'N/A',
      header: "Project Description",
    },
    {
      accessorFn: (row) => row.clientContent?.shortName ?? 'N/A',
      header: "Short Name",
    },
    {
      accessorFn: (row) => row.clientContent?.detailName ?? 'N/A',
      header: "Detail Name",
    },
  ];

  const fetchAllIds = async () => {
    try {
      const [personalResponse, projectResponse, clientResponse] = await Promise.all([
        axios.get('https://localhost:7210/api/PersonalInfo'),
        axios.get('https://localhost:7210/api/ProjectInfo'),
        axios.get('https://localhost:7210/api/ClientContent')
      ]);

      setIdOptions({
        personalInfoIds: personalResponse.data,
        projectInfoIds: projectResponse.data,
        clientContentIds: clientResponse.data
      });

      console.log('Fetched options:', {
        personal: personalResponse.data,
        project: projectResponse.data,
        client: clientResponse.data
      });
    } catch (error) {
      console.error('Error fetching IDs:', error);
      toast.error('Failed to fetch ID options');
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveIds = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://localhost:7210/api/DocumentEditor', formData);
      
      if (response.data) {
        setSavedIds([formData.personalInfoId, formData.projectInfoId, formData.clientContentId]);
        toast.success('IDs saved successfully');
        await fetchAllDocuments();
      }
    } catch (error) {
      console.error('Error saving IDs:', error);
      toast.error('Failed to save IDs');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDocuments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7210/api/DocumentEditor');
      if (Array.isArray(response.data)) {
        setDocuments(response.data);
        console.log('Fetched documents:', response.data);
      } else {
        console.error('Invalid data format:', response.data);
        toast.error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAllIds();
      fetchAllDocuments();
    }
  }, [isOpen]);

  const handleComplete = () => {
    try {
      onComplete();
      toast.success('Document information saved successfully');
      onClose();
    } catch (error) {
      console.error('Error completing step:', error);
      toast.error('Failed to complete step');
    }
  };

  const table = useReactTable({
    data: documents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Document Information</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          {/* Form for ID selection */}
          <div className="mb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="personalInfoId">Personal Info</Label>
                <Select
                  value={formData.personalInfoId}
                  onValueChange={(value) => handleSelectChange(value, 'personalInfoId')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Personal Info" />
                  </SelectTrigger>
                  <SelectContent>
                    {idOptions.personalInfoIds.map((info) => (
                      <SelectItem key={info.id} value={info.id}>
                        {info.fullName} - {info.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectInfoId">Project Info</Label>
                <Select
                  value={formData.projectInfoId}
                  onValueChange={(value) => handleSelectChange(value, 'projectInfoId')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Project Info" />
                  </SelectTrigger>
                  <SelectContent>
                    {idOptions.projectInfoIds.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.projectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientContentId">Client Content</Label>
                <Select
                  value={formData.clientContentId}
                  onValueChange={(value) => handleSelectChange(value, 'clientContentId')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Client Content" />
                  </SelectTrigger>
                  <SelectContent>
                    {idOptions.clientContentIds.map((content) => (
                      <SelectItem key={content.id} value={content.id}>
                        {content.shortName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Save IDs and Refresh buttons */}
          <div className="mb-4">
            <Button 
              variant="default"
              onClick={handleSaveIds}
              disabled={loading || !formData.personalInfoId || !formData.projectInfoId || !formData.clientContentId}
              className="mr-2"
            >
              {loading ? 'Saving...' : 'Save IDs'}
            </Button>
            <Button 
              variant="outline"
              onClick={fetchAllDocuments}
              disabled={loading}
            >
              Refresh Data
            </Button>
          </div>

          {/* Display saved IDs */}
          {savedIds.length > 0 && (
            <div className="mb-4 p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">Saved IDs:</h3>
              <div className="text-sm">
                {savedIds.map((id, index) => (
                  <span key={id} className="mr-2">
                    {id}{index < savedIds.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Data Table */}
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length === 0 ? (
                      <TableRow>
                        <TableCell 
                          colSpan={columns.length} 
                          className="text-center h-24"
                        >
                          No documents found
                        </TableCell>
                      </TableRow>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <Button 
            variant="default"
            onClick={handleComplete}
            disabled={documents.length === 0}
          >
            Complete
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}