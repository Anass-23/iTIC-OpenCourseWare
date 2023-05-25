import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import TabGroup from "../components/TabGroup"
import TabGroupDropdown from "../components/TabGroupDropdown";
import Accordion from "../components/Accordion/Accordion";
// import BreadCrumb from "../components/Breadcrumb";
import { FileLink } from "../components/Accordion/Files";
import { DirectoryLink } from "../components/Accordion/Directories";
import { getSections } from '../services/files';
import NotFound from "./NotFound";

interface Section {
  name: string;
  title: string;
  files: FileLink[],
  dirs:  DirectoryLink[];
}

interface HistoryItem {
  href: string;
  label: string;
}

export default function Course() {
  const location = useLocation();
  const [sections, setSections] = useState<Section[]>([]);
  const [refetch, setRefetch]   = useState<boolean>(false);
  const [history, setHistory]   = useState<HistoryItem[]>([]);
  const [error, setError]       = useState<boolean>(false);

  const handleBreadcrumbClick = (href: string, label: string) => {
    const newHistory: HistoryItem[] = [...history, { href, label }];
    setHistory(newHistory);
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const pathname: string = location.pathname;
        const response = await getSections(pathname);
        setSections(response);
        setError(false);
      } catch (error) {
        // console.log(error);
        setError(true);
      }
    };

    fetchSections();
  }, [location, refetch]);

  const handleRefetch = () => {
    setRefetch(!refetch);
  }

  if (error) {
    return  <NotFound />
  }

  return (
    <main>
    
    <div className="hidden sm:block">
      <TabGroup assignatura={location.pathname.split('/')[1]} />
    </div>

    <div className="sm:hidden">
      <TabGroupDropdown assignatura={location.pathname.split('/')[1]} />
    </div>

    {/* No aporta gaire utilitat, problemes en versió Phone tmb */}
    {/* <BreadCrumb history={history} /> */} 

    {sections
    .sort((a, b) => (b.files.length + b.dirs.length) - (a.files.length + a.dirs.length))
    .map((section, index) => (
        <div key={index} id={`${section.title}-${index}`} className="px-10">
        <Accordion
            key={index}
            pathname={location.pathname}
            sectionName={section.name}
            title={section.title}
            numItems={section.files.length + section.dirs.length}
            defaultOpen={index === 0}
            files={section.files}
            directories={section.dirs}
            handleBreadcrumbClick={handleBreadcrumbClick}
            handleRefetch={handleRefetch}
        />
        </div>
    ))}
  </main>
  );
}
