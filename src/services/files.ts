import { FileLink } from "../components/Accordion/Files";
import { DirectoryLink } from "../components/Accordion/Directories";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface Section {
  name: string;
  title: string;
  files: FileLink[],
  dirs:  DirectoryLink[];
}



export const uploadFile = async (file: File, url: string, signal: AbortSignal): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const access_token = localStorage.getItem('access_token');
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`, // JWT Token
      },
      body: formData,
      signal: signal, // AbortSignal option
    });

    if (response.status === 403) {
      // console.log("Error with path (user-related)");
    }

    if (!response.ok && response.status !== 201) {
      throw new Error('Failed to upload file');
    }

  } catch (error: any) {
    if (error.name === 'AbortError') {
      // console.log('File upload cancelled');
    } else {
      throw new Error('Failed to upload file');
    }
  }
};


export const newFolder = async (url: string, folderName: string): Promise<any> => {
  try {
    const access_token = localStorage.getItem("access_token"); 
    const response = await fetch(`${BASE_URL}/${url}/${folderName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`, // JWT Token
      }
    });

    if (response.status === 403) {
      // console.log("Error URL ...");
    }

    if (response.status === 401) {
      // console.log("Session terminated (Expired (or invalid) TOKEN)");
      throw new Error("[FOLDER] Session terminated");
    }

    if (!response.ok && response.status !== 201) {
      throw new Error("[FOLDER]!!!! Failed to create a new folder");
    }

    

  } catch (error: any) {
    // console.log(error);
    throw new Error("Failed to create a new folder file");
  }
};



export const getSections = async (path: string): Promise<Section[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Resource not found');
    }
    // console.log(data);
    return data;
  } catch (error) {
    // console.error(error);
    throw new Error(`API request failed: ${error}`);
  }
};


export const deleteResource = async (path: string): Promise<void> => {
  try {
    const access_token = localStorage.getItem("access_token"); 
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`, // JWT Token
      }
    });

    if (response.status === 403) {
      // console.log("Error URL ...");
    }

    if (response.status === 401) {
      // console.log("Session terminated (Expired (or invalid) TOKEN)");
      throw new Error("[DELETE RESOURCE] Session terminated");
    }

    if (!response.ok && response.status !== 201) {
      throw new Error("[DELETE RESOURCE] Failed to delete the resource");
    }

  } catch (error) {
    // console.log(error);
    throw new Error('Failed to delete the resource');
  }
};
