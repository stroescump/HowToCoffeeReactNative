// SafeAreaColorContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SafeAreaColorContextValue = {
  color: string;
  setColor: (next: string) => void;
};

const SafeAreaColorContext = createContext<SafeAreaColorContextValue | undefined>(
  undefined,
);

type SafeAreaColorProviderProps = {
  initialColor: string;
  children: ReactNode;
};

export function SafeAreaColorProvider({
  initialColor,
  children,
}: SafeAreaColorProviderProps) {
  if (!initialColor) {
    throw new Error(
      "SafeAreaColorProvider requires a non-empty `initialColor` prop.",
    );
  }

  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setColor(initialColor);
  }, [initialColor]);

  const value = useMemo(
    () => ({
      color,
      setColor,
    }),
    [color],
  );

  return (
    <SafeAreaColorContext.Provider value={value}>
      {children}
    </SafeAreaColorContext.Provider>
  );
}

/** Strict hook — MUST be inside provider */
export function useSafeAreaColor(): SafeAreaColorContextValue {
  const ctx = useContext(SafeAreaColorContext);
  if (!ctx) {
    throw new Error(
      "useSafeAreaColor must be used within a SafeAreaColorProvider",
    );
  }
  return ctx;
}

/**
 * Pentru componente care pot fi în / în afara provider-ului
 * (ex: BaseScreen – se folosește peste tot în app).
 */
export function useSafeAreaColorOptional():
  | SafeAreaColorContextValue
  | undefined {
  return useContext(SafeAreaColorContext);
}