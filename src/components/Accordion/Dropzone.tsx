import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFileEarmark } from "react-icons/bs";
import { useAuth } from "../../hooks/AuthContext";
import { uploadFile } from "../../services/files";

interface Props {
  pathname: string;
  sectionName: string;
  handleRefetch: () => void;
}

export default function Dropzone ({ pathname, sectionName, handleRefetch }: Props) {
  const { t } = useTranslation();
  const { handleLogOut } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [cancelController, setCancelController] = useState<AbortController | null>(null);


  const handleFileUpload = async (files: FileList) => {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const controller = new AbortController();
        setCancelController(controller);

        let url: string = pathname;
        
        if (pathname.endsWith("/teoria") && pathname.split("/teoria").length === 2) {
          url = `${url}/${sectionName}`;
        }

        try {
          setUploading(true);
          await uploadFile(file, url, controller.signal);
          // console.log(`File ${i + 1} uploaded successfully`);
        } catch (error: any) {
          if (error.name === "AbortError") {
            // If more than 1 file and one file is aborted the following files
            // still will be uploaded! 
            // console.log(`Upload of file ${i + 1} cancelled`);
          } else {
            handleLogOut();
            break;
          }
          // handleLogOut();
          // break;
        } finally {
          setCancelController(null);
        }
      }

      setUploading(false);
      handleRefetch();
    }
  };

  const handleCancelUpload = () => {
    if (cancelController) {
      cancelController.abort();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  return (
    <div
      className="py-5 flex flex-col items-center justify-center w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-6 pb-6 ">
          <BsFileEarmark className="w-10 h-10 mb-3 text-gray-400" />
          <p className="m-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-blue-500">{t('assig.section.upload.msg')}</span> {t('assig.section.upload.msgExtra')}
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleInputChange}
          multiple
        />
      </label>

      {uploading && (
        <div className="mt-2 flex flex-row items-center justify-center">
          <button disabled type="button" className="py-2.5 px-5 mr-2 bg-white font-medium rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            {t('assig.section.upload.msgUplading')} ...
          </button>
          
          <button type="button" className="py-2.5 px-5 mr-2 font-medium bg-red-600 text-white rounded-lg border border-gray-200 hover:bg-red-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            onClick={handleCancelUpload}
          >
            {t('assig.section.upload.msgCancel')}
          </button>
        </div>
      )}
    </div>
  );
};