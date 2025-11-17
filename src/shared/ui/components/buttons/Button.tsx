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
  { backgroundColor: string; textColor: string; hasShadow: boolean }
> = {
  primary: {
    backgroundColor: "#010101",
    textColor: "#FFFFFF",
    hasShadow: true,
  },
  secondary: {
    backgroundColor: "#010101",
    textColor: "#FFFFFF",
    hasShadow: false,
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
        { backgroundColor: theme.backgroundColor },
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
    fontFamily: "InterRegular",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});