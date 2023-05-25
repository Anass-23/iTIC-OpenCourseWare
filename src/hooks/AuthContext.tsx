import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BASE_URL = process.env.REACT_APP_BASE_URL;

type AuthContextType = {
  isLoggedIn: boolean;
  handleLogIn: (access_token: string) => void;
  handleLogOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");


  // useEffect(() => {
  //   // IMPROVEMENT (TODO?) => We could check to BASE_URL/auth/check if TOKEN (still valid)  
  //   const access_token = localStorage.getItem("access_token");
  //   setIsLoggedIn(!!access_token);
  // }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        try {
          const response = await fetch(`${BASE_URL}/auth/check`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
  
          if (response.ok) {
            // console.log(response.status);
            // const data = await response.json();
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            localStorage.removeItem('access_token'); // TOKEN caducat (o invàlid si es modifica des del LocalStorage)
          }
        } catch (error) {
          // console.log(error);
          setIsLoggedIn(false);
        }
      }
    };
  
    checkTokenValidity();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogIn = (access_token: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("access_token", access_token);
    setMessage("verifiedOk");
};

const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
    setMessage("sessionOut");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogIn, handleLogOut }}>
      {message && (
        <div className="z-50 fixed w-full bottom-10 left-0 right-0 flex justify-center">
          <div className="bg-green-500 text-white text-center py-2 px-4 rounded-full bg-opacity-90 w-4/5">
            <p>{t(`login.${message}`)}</p>
          </div>
        </div>
      )}

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};