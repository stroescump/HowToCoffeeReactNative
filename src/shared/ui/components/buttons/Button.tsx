import React, { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  /** Accept Tailwind/nativewind className for layout or extra styling */
  className?: string;
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    textColor: string;
    hasShadow: boolean;
    borderWidth?: number;
    borderColor?: string;
  }
> = {
  primary: {
    backgroundColor: "#010101",
    textColor: "#FFFFFF",
    hasShadow: true,
  },
  secondary: {
    backgroundColor: "transparent",
    textColor: "#FFFFFF",
    hasShadow: false,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  ghost: {
    backgroundColor: "transparent",
    textColor: "#010101",
    hasShadow: false,
  },
};

export default function Button({
  text,
  onPress,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const theme = VARIANT_STYLES[variant];
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      android_ripple={{
        color: "rgba(255,255,255,0.15)",
        borderless: false,
      }}
      className={`${className}`} 
      style={[
        styles.base,
        {
          backgroundColor: theme.backgroundColor,
          borderWidth: theme.borderWidth,
          borderColor: theme.borderColor,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: theme.textColor }]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "stretch",
    minHeight: 60,
    paddingHorizontal: 24,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: "InterSemiBold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});