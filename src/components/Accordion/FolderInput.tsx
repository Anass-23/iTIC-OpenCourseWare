import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFolderPlus } from "react-icons/bs";
import { useAuth } from "../../hooks/AuthContext";
import { newFolder } from "../../services/files";

interface Props {
  pathname: string;
  sectionName: string;
  handleRefetch: () => void;
}

export default function FolderInput({ pathname, sectionName, handleRefetch }: Props) {
  const { t } = useTranslation();
  const { handleLogOut } = useAuth();
  const [folderName, setFolderName] = useState<string>("");

  const handleFolderCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    let url: string = pathname;
  
    if (pathname.endsWith("/teoria") && pathname.split("/teoria").length === 2) {
      url = `${url}/${sectionName}`;
    }

    try {
      await newFolder(url, folderName);
      handleRefetch();
      setFolderName('');

    } catch (error: any) {
      // console.error(error);
      handleLogOut();
    }
  };

return (
    <form onSubmit={handleFolderCreate} className="mt-2">
      <label
        htmlFor="crear"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        {t('assig.section.modal.accept')}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsFolderPlus
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400"
          />
        </div>
        <input
          type="text"
          id="crear-directori"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder={t('assig.section.upload.inputPlaceholder') as string}
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-myBlue-600 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t('assig.section.upload.msgButton')}
        </button>
      </div>
    </form>
  );
}