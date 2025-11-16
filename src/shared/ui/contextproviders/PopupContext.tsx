import ErrorPopup from "@/src/shared/ui/components/errorhandling/ErrorPopup";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { View } from "react-native";

type PopupContextValue = {
  showError: (message?: string) => void;
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
  const [message, setMessage] = useState<string | undefined>();

  const showError = (msg?: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <PopupContext.Provider value={{ showError, hide }}>
      {children}

      {visible && (
        <View className="absolute w-full h-full justify-center bg-[#010101]/50">
          <ErrorPopup
            errorMessage={message}
            onDismiss={hide}
          />
        </View>
      )}
    </PopupContext.Provider>
  );
};