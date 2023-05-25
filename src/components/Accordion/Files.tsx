import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiLinkAlt } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { deleteResource } from "../../services/files";
import { useAuth } from "../../hooks/AuthContext";
import Dropzone from "./Dropzone";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface FileLink {
  label: string;
  href: string;
}

interface Props {
  pathname: string;
  sectionName: string;
  files: FileLink[];
  handleRefetch: () => void;
}

export default function Files({ pathname, sectionName, files, handleRefetch }: Props) {
  const { t } = useTranslation();
  const { isLoggedIn, handleLogOut } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [fileHref, setFileHref] = useState<string>('');

  return (
    <>
      { showDeleteModal && 
        <div 
        id="popup-modal" 
        className="fixed z-50 p-4 overflow-x-hidden overflow-y-auto flex items-center justify-center inset-0 bg-opacity-50 backdrop-filter backdrop-blur-sm"
      >
          <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white outline-gray-800 rounded-lg shadow dark:bg-gray-700">
                  <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal"
                    onClick={() => setShowDeleteModal(false)}
                  >
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center">
                      <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{t('assig.section.modal.msg')}</h3>
                      <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                        onClick={async () => {
                          try {
                            await deleteResource(fileHref);
                          } catch (error) {
                            // We could do something in here more complex ...
                            handleLogOut()
                          }
                          setShowDeleteModal(false);
                          handleRefetch();
                        }}
                      >
                        {t('assig.section.modal.accept')}
                      </button>
                      <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={() => setShowDeleteModal(false)}
                      >
                        {t('assig.section.modal.cancel')}
                      </button>
                  </div>
              </div>
          </div>
      </div>
    }

      <dt className="text-sm font-medium text-gray-500">{t('assig.section.files.title')}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

        { files.length > 0 ? (
          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
            {files.map((file, index) => (
              <li 
                key={`${file.label}-${index}`}
                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
              >
                <div className="flex w-0 flex-1 items-center">
                  <BiLinkAlt className="h-4 w-4 flex-shrink-0 text-blue-500"/>
                  <span className="ml-2 w-0 flex-1 truncate">{file.label}</span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href={`${BASE_URL}/${file.href}`}
                    download
                    className="flex items-center font-medium text-blue-600 hover:text-blue-500"
                  >
                    <FiDownload className="mr-2"/>
                    {t('assig.section.files.download')}
                  </a>
                </div>

                { isLoggedIn &&
                  <button
                    onClick={() => {
                      setShowDeleteModal(true);
                      setFileHref(file.href);
                    }}
                  >
                    <FaTrashAlt className='ml-2 text-red-600'/>
                  </button>
                }

              </li>
            ))}
          </ul>
        ) : (
          <div className="flex p-4 mb-4 text-sm text-blue-600 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{t('assig.section.files.info')}</span>
            </div>
          </div>
        )
      }
      </dd>

      { isLoggedIn && 
        < Dropzone 
          pathname={pathname}
          sectionName={sectionName}
          handleRefetch={handleRefetch}
        />
      }

    </>
  );
}