import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { FaHome } from 'react-icons/fa';
import { BsBriefcaseFill } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb'
import { CgNotes } from 'react-icons/cg'
import { Transition } from '@headlessui/react';

interface Props {
  assignatura: string;
}

interface TabIcon {
  label: string;
  subRoute: string;
  icon: React.ReactNode;
}

const TabItems: TabIcon[] = [
  { label: 'Info', subRoute: 'informacio', icon: <FaHome className='mr-2' />},
  { label: 'Teoria', subRoute: 'teoria', icon: <CgNotes className='mr-2' />},
  { label: 'Pràctiques', subRoute: 'practiques', icon: <TbSubtask className='mr-2' />},
  { label: 'Projecte', subRoute: 'projecte', icon: <BsBriefcaseFill className='mr-2' />}
]

export default function TabGroupDropdown({ assignatura }: Props) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const pathname: string = location.pathname;

  const activeIndex = useMemo(() => {
    return TabItems.findIndex((tab) => pathname.includes(tab.subRoute));
  }, [pathname]);

  if (activeIndex !== activeTab) {
    setActiveTab(activeIndex);
  }

  if (activeTab === -1) {
    return  null
  }

  const handleClick = () => { setShowDropdown(!showDropdown) }

  return (
    <>
      <div className="flex justify-center space-x-4">
        <button 
          id="dropdownDefaultButton" 
          className="space-x-4 text-white bg-myBlue-600 hover:bg-myBlue-600 justify-between font-medium rounded-full w-80 text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          type="button"
          onClick={handleClick}
        >
          <div className="flex items-center">
            {TabItems[activeIndex].icon}
            {t(`assig.tabGroup.${TabItems[activeIndex].label}`)}
          </div>
          <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>


      <Transition
        show={showDropdown}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform scale-300 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >

        <div className="flex justify-center space-x-4">
          <div id="dropdown" className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {TabItems.map((tab, index) => (
                <li
                  id={`${assignatura}-${tab.subRoute}`}
                  key={index}
                >
                  <Link
                    key={index} 
                    to={`/${assignatura}/${encodeURIComponent(tab.subRoute)}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setActiveTab(index);
                      handleClick();
                    }}
                  >
                    <div className="flex items-center">
                      {tab.icon}
                      {t(`assig.tabGroup.${tab.label}`)}
                    </div> 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Transition>
    </>
  );
}