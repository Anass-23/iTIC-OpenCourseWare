import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from "react";
import { FaHome } from 'react-icons/fa';
import { BsBriefcaseFill } from 'react-icons/bs';
import { TbSubtask } from 'react-icons/tb';
import { CgNotes } from 'react-icons/cg';

interface Props {
  assignatura: string
}

interface TabIcon {
  label: string,
  subRoute: string,
  icon: React.ReactNode
}

const TabItems: TabIcon[] = [
  { label: 'Info', subRoute: 'informacio', icon: <FaHome />},
  { label: 'Teoria', subRoute: 'teoria', icon: <CgNotes />},
  { label: 'Pràctiques', subRoute: 'practiques', icon: <TbSubtask />},
  { label: 'Projecte', subRoute: 'projecte', icon: <BsBriefcaseFill />}
]

export default function TabGroup ({ assignatura }: Props) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(-1);
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

    return (
        <div className="flex justify-center space-x-4">
          
          <div className="flex bg-myBlue-500 rounded-full p-2 m-2 shadow-md overflow-x-scroll">
            
            {TabItems.map((tab, index) => (
              <div
                id={`${assignatura}-${tab.subRoute}`}
                key={index}
                className={`flex outline-none font-sans font-semibold rounded-full px-4 py-2 ${
                  activeTab === index
                    ? 'bg-white text-myBlue-600 tab-color-transition'
                    : 'text-white hover:bg-myBlue-400'
                } ${index !== 0 ? 'ml-2' : ''} ${
                  index !== TabItems.length - 1 ? 'mr-2' : ''
                }`}
                onClick={() => setActiveTab(index)}
              >
                <Link
                  key={index} 
                  to={`/${assignatura}/${encodeURIComponent(tab.subRoute)}`}
                >
                  <div className="flex items-center">
                    {tab.icon}
                    <span className="ml-2">{t(`assig.tabGroup.${tab.label}`)}</span>
                  </div>
                </Link>
              </div>
            ))}

          </div>

        </div>
    );
}