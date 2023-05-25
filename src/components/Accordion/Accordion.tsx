import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import Directories, { DirectoryLink } from './Directories';
import Files, { FileLink } from './Files';

interface Props {
  pathname: string;
  sectionName: string;
  title: string;
  numItems: number;
  files: FileLink[];
  directories: DirectoryLink[];
  defaultOpen: boolean;
  handleBreadcrumbClick: (href: string, label: string) => void;
  handleRefetch: () => void;
}

const Accordion = ({ pathname, sectionName, title, numItems, files, directories, defaultOpen = true, handleBreadcrumbClick, handleRefetch}: Props ) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border mx-auto  border-gray-200 rounded-md mb-4 mt-4 max-w-7xl">
      <button
        onClick={toggleAccordion}
        className="inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-blue-600"
        >
        
        {!isOpen && <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        }

        {isOpen && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        }   

        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
        </svg>
        {t(`assig.section.name.${title}`)}
        <span className="inline-flex items-center py-0.5 px-2 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
        {numItems}
        </span>
      </button>
      
      <Transition
        show={isOpen}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="">
          <div className="mx-auto p-6 lg:px-8 sm:px-2 xs:p-1 w-100 overflow-hidden transition-[height] duration-300">
            <div className="pb-4">
              <div className="py-5 sm:gap-4">
                <Files 
                  files={files}
                  pathname={pathname}
                  sectionName={sectionName}
                  handleRefetch={handleRefetch}
                />

                <Directories 
                    directories={directories}
                    pathname={pathname}
                    sectionName={sectionName}
                    handleRefetch={handleRefetch}
                    handleBreadcrumbClick={handleBreadcrumbClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Accordion;