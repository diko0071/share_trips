'use client'

import { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  isLoginFormOpen: boolean;
  openLoginForm: (redirectUrl?: string) => void;
  closeLoginForm: () => void;
  redirectUrl: string;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  isGoogleLoading: boolean;
  setGoogleLoading: (loading: boolean) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('/'); 
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const openLoginForm = (url: string = '/') => {
    setRedirectUrl(url);
    setIsLoginFormOpen(true);
  };
  const closeLoginForm = () => setIsLoginFormOpen(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup, isLoginFormOpen, openLoginForm, closeLoginForm, redirectUrl, isLoading, setLoading: setIsLoading, isGoogleLoading, setGoogleLoading: setIsGoogleLoading }}> 
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};