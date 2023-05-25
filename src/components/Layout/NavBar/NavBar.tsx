import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../../hooks/AuthContext";
import NavLogo from "../../../assets/logos/upc-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { label: "assig", route: "/", isNew: false },
  { label: "tools", route: "/eines", isNew: true },
  // { label: "searcher", route: "/", isNew: false },
];

// interface Props {
//   isLoggedIn: boolean;
//   handleLogOut: () => void;
// }

export default function NavBar() {
  const { t } = useTranslation();
  const { isLoggedIn, handleLogOut } = useAuth();
  const [isHidden, setIsHidden] = useState(true);

  function toggleClass() {
    setIsHidden(!isHidden);
  }

  return (
    <nav
      aria-label="NavBar"
      className="relative z-20 w-full flex-none text-sm font-semibold leading-6 text-slate-900 mx-auto max-w-container px-4 sm:px-6 lg:px-8"
    >

      {/* Desktop/Tablet NavBar */}
      <div className="relative flex items-center py-[2.125rem]">
        <Link className="mr-auto flex-none text-slate-900" to="/">
          <img src={NavLogo} alt="UPC Logo" width={40} height={40} />
        </Link>
        
        <LanguageSwitcher />

        <div className="hidden lg:flex lg:items-center">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.route}
              className="group rounded-lg border border-transparent px-5 ml-2 py-3 transition-colors dark:text-white hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            >
              <div className="block mt-4 lg:inline-block lg:mt-0">
                {t(`navbar.${link.label}`)}
                {link.isNew && (
                  <span className="ml-2 rounded-full bg-sky-500 px-1.5 py-0.5 text-xs text-white">
                    {t('navbar.new')}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <FiMenu
          className="w-6 h-6 -my-1 ml-6 -mr-1 flex items-center justify-center lg:hidden"
          onClick={toggleClass}
        />

        { isLoggedIn ? (
            <div className="hidden lg:ml-8 lg:flex lg:items-center lg:border-l lg:border-slate-900/15 lg:pl-8">
                <button 
                className="group rounded-lg border border-transparent inline-flex justify-center text-sm font-semibold py-2.5 px-4 -my-2.5 ml-4 bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 hover:dark:bg-zinc-300"
                onClick={handleLogOut}
                >
                  {t('navbar.logOut')} <span aria-hidden="true">→</span>
                </button>
            </div>
          ) : (
          <div className="hidden lg:ml-8 lg:flex lg:items-center lg:border-l lg:border-slate-900/15 lg:pl-8">
            <Link
              className="group rounded-lg border border-transparent inline-flex justify-center text-sm font-semibold py-2.5 px-4 -my-2.5 ml-4 bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 hover:dark:bg-zinc-300"
              to="/login"
            >
              <span>
                {t('navbar.logIn')} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
      )}



      </div>

      {/* Mobile NavBar */}
      <div
        className={`fixed inset-0 flex items-start justify-end overflow-y-auto ${
          isHidden ? "hidden" : ""
        } translate-x-0 lg:hidden`}
      >
        <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm transition-opacity opacity-100"/>

        <div className="z-20 min-h-full w-[min(20rem,calc(100vw-theme(spacing.10)))] py-10 bg-white shadow-2xl ring-1 ring-black/10 transition">

        <IoClose
          className="absolute top-5 right-6 flex h-6 w-6 mt-5 items-center justify-center"
          onClick={toggleClass}
        />
          
          <nav className="divide-y divide-slate-900/10 text-base leading-7 text-slate-900">
            <div className="py-6 px-8"></div>

            <div className="py-6 px-8">
              <div className="-my-2 items-start space-y-2">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.route}
                    onClick={toggleClass}
                    className="block w-full py-2 font-semibold"
                  >
                    <div className="block lg:inline-block lg:mt-0">
                      {t(`navbar.${link.label}`)}
                      {link.isNew && (
                        <span className="ml-2 rounded-full bg-sky-500 px-1.5 py-0.5 text-xs text-white">
                          {t('navbar.new')}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="py-6 px-8">

            { isLoggedIn ? (
              <div className="-my-2 space-y-4">
                <button
                  className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
                  onClick={handleLogOut}
                >
                  <span>
                    {t('navbar.logOut')} <span aria-hidden="true">→</span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="-my-2 space-y-4">
                <Link
                  className="inline-flex justify-center rounded-lg text-sm font-semibold py-3 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full"
                  to="/login"
                  onClick={toggleClass}
                >
                  <span>
                    {t('navbar.logIn')} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            )}
            </div>
          </nav>
        </div>
      </div>

    </nav>
  );
}