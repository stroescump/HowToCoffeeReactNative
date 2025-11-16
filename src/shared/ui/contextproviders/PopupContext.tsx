import React, { createContext, ReactNode, useContext, useState } from "react";
import { View } from "react-native";
import Popup from "../components/Popup";

type PopupContextValue = {
  showPopup: (popupTitle: string, popupButtonDescription: string) => void;
  hide: () => void;
};

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error("usePopup must be used within PopupProvider");
  }
  return ctx;
};

type PopupProviderProps = {
  children: ReactNode;
};

export const PopupProvider = ({ children }: PopupProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [popupButtonDescription, setPopupButtonDescription] = useState<string>("");
  const [popupTitle, setPopupTitle] = useState<string>("");

  const showPopup = (popupTitle: string, msg: string) => {
    setPopupButtonDescription(msg);
    setPopupTitle(popupTitle);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <PopupContext.Provider value={{ showPopup, hide }}>
      {children}

      {visible && (
        <View className="absolute w-full h-full justify-center bg-[#010101]/50">
          <Popup
            popupTitle={popupTitle}
            popupButtonDescription={popupButtonDescription}
            onDismiss={hide}
          />
        </View>
      )}
    </PopupContext.Provider>
  );
};