import axios from 'axios';

const API_BASE_URL = 'https://localhost:7210/api';

// Interfaces
export interface PersonalInfo {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

export interface ProjectInfo {
    id?: string;
    projectName: string;
    description: string;
    personalInfoId: string;
}

export interface ClientContent {
    id?: string;
    title: string;
    details: string;
    projectInfoId: string;
}

export interface DocumentEditor {
    id?: string;
    personalInfoId: string;
    projectId: string;
    contentId: string;
}

// API Service
const api = {
    // Personal Info
    createPersonalInfo: async (data: PersonalInfo) => {
        const response = await axios.post(`${API_BASE_URL}/PersonalInfo`, data);
        return response.data;
    },

    // Project Info
    createProjectInfo: async (data: ProjectInfo) => {
        const response = await axios.post(`${API_BASE_URL}/ProjectInfo`, data);
        return response.data;
    },

    // Client Content
    createClientContent: async (data: ClientContent) => {
        const response = await axios.post(`${API_BASE_URL}/ClientContent`, data);
        return response.data;
    },

    // Document Editor
    createDocumentEditor: async (data: DocumentEditor) => {
        const response = await axios.post(`${API_BASE_URL}/DocumentEditor`, data);
        return response.data;
    }
};

export default api;