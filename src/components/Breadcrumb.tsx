import { RiHomeLine } from 'react-icons/ri';
import { CgMore } from 'react-icons/cg';

interface Props {
  id: string;
  section: string;
  path: string[];
}

export default function BreadCrumb({ id, section, path }: Props) {
  const MAX_LINKS = 3; // 4

  return (
    <nav
      className="py-5 mx-auto flex items-center justify-center mr-2 overflow-scroll"
      aria-label="Breadcrumb"
    > 
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a href={`/${id}/${section}`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <RiHomeLine className="w-4 h-4 mr-2"/>
            {id}
          </a>
        </li>

        {path.slice(0, MAX_LINKS - 1).map((p, i) => {
          const isLast = i === path.length - 1;
          const href = `/${id}/${section}/${path.slice(0, i + 1).join('/')}`;

          if (section === "teoria" && i === 0) {
            return null;
          }

          return (
            <li key={p}>
              <div className="flex items-center">
                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-400">
                    {decodeURIComponent(p).slice(0, 10)}{decodeURIComponent(p).length > 10 && "..."}
                  </span>
                ) : (
                  <a href={href} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {decodeURIComponent(p).slice(0, 10)}{decodeURIComponent(p).length > 10 && "..."}
                  </a>
                )}
              </div>
            </li>
          );
        })}


        {/* {path.length > MAX_LINKS - 1 && ( */}
        {path.length > MAX_LINKS && (
        
          <li>
            <CgMore className="text-gray-400 w-4 h-4 ml-2 mr-2"/>
          </li>
        )}
        
        {path.length > MAX_LINKS - 1 && (
          <li>
            <div className="flex items-center">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-400">
                {decodeURIComponent(path[path.length - 1]).slice(0, 10)}{path[path.length -1].length > 10 && "..."}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}