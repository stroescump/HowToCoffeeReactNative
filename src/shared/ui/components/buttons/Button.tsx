import { FONTS } from "@/src/shared/ui/tokens/typography";
import React, { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success" | "danger";
type ButtonFont = "regular" | "italic" | "black" | "bold" | "light" | "medium";

export type ButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  /** Accept Tailwind/nativewind className for layout or extra styling */
  className?: string;
  disabled?: boolean;
  cornerRadius?: number;
  fontSize?: number;
  lineHeight?: number;
  font?: ButtonFont;
  backgroundColor?: string;
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
  success: {
    backgroundColor: "#2FBF4A",
    textColor: "#FFFFFF",
    hasShadow: true,
  },
  danger: {
    backgroundColor: "#E53935",
    textColor: "#FFFFFF",
    hasShadow: true,
  },
};

export default function Button({
  text,
  onPress,
  variant = "primary",
  className = "",
  disabled = false,
  cornerRadius = 999,
  fontSize = 18,
  lineHeight,
  font = "bold",
  backgroundColor,
}: ButtonProps) {
  const resolvedFont = (() => {
    if (font === "italic") return FONTS.regular;
    return FONTS[font];
  })();
  const theme = VARIANT_STYLES[variant];
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      disabled={disabled}
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
          backgroundColor: backgroundColor ?? theme.backgroundColor,
          borderWidth: theme.borderWidth,
          borderColor: theme.borderColor,
          borderRadius: cornerRadius,
        },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: theme.textColor,
            fontSize,
            lineHeight,
            fontFamily: resolvedFont,
          },
        ]}
      >
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
  disabled: {
    opacity: 0.6,
  },
});
