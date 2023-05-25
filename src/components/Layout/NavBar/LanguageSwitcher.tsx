import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import CAFlag from "../../../assets/flags/CA.png";
import ESFlag from "../../../assets/flags/ES.png";
import USFlag from "../../../assets/flags/US.png";

const languages = [
  { code: "ca", label: "Català", flag: CAFlag },
  { code: "es", label: "Español", flag: ESFlag },
  { code: "en", label: "English", flag: USFlag },
];

export default function LanguageSwitcher() {
  const [selectLanguage, setSelectLanguage] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem("language") || languages[0].code
  );
  const { i18n } = useTranslation();

  function toggleLanguage() {
    setSelectLanguage(!selectLanguage);
  }

  function handleLanguageSelection(languageCode: string) {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
    toggleLanguage();
  }

  return (
    <div className="relative">
      <button
        onClick={toggleLanguage}
        type="button"
        data-dropdown-toggle="language-dropdown-menu"
        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {languages.map((language) => (
          <React.Fragment key={language.code}>
            {selectedLanguage === language.code && (
              <img className="rounded-full h-4 w-4 mr-2" src={language.flag} alt={language.label} />
            )}
          </React.Fragment>
        ))}
        {languages.find((language) => language.code === selectedLanguage)?.label}
      </button>

      {selectLanguage && (
        <div
          className="absolute my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <ul className="py-2 font-medium" role="none">
            {languages.map((language) => (
              <li key={language.code}>
                <button
                  onClick={() => handleLanguageSelection(language.code)}
                  className="block px-4 w-full  py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="inline-flex justify-start items-center">
                    <img
                      className="rounded-full h-4 w-4 mr-2"
                      src={language.flag}
                      alt={language.label}
                    />
                    {language.label}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}