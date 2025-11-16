import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

export type ButtonVariant = "primary" | "ghost";

export type ButtonProps = {
  text: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  color?: string;
};

// Figma constraints
const MAX_WIDTH = 186;
const MAX_HEIGHT = 80;

const BASE_FONT_SIZE = 22;
const BASE_LINE_HEIGHT = 26;

// Din analiza ta: 2 linii + padding = max 80 height
const MAX_VERTICAL_PADDING_FOR_TWO_LINES = Math.floor(
  (MAX_HEIGHT - 2 * BASE_LINE_HEIGHT) / 2
);

// 🎨 variant map
const VARIANT_STYLES: Record<
  ButtonVariant,
  { backgroundColor: string; textColor: string }
> = {
  primary: {
    backgroundColor: "#010101",
    textColor: "#FFFFFF",
  },
  ghost: {
    backgroundColor: "transparent",
    textColor: "#010101",
  },
};

export default function Button({
  text,
  onPress,
  variant = "primary",
}: ButtonProps) {
  const { width } = useWindowDimensions();

  const buttonWidth = Math.min(MAX_WIDTH, width * 0.45);

  const horizontalPadding = Math.min(24, width * 0.06);

  const verticalPadding = Math.min(
    MAX_VERTICAL_PADDING_FOR_TWO_LINES,
    width * 0.035
  );

  const handlePress = onPress;
  const theme = VARIANT_STYLES[variant];

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.base,
        {
          width: buttonWidth,
          height: MAX_HEIGHT,
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          backgroundColor: theme.backgroundColor,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        style={[
          styles.label,
          {
            color: theme.textColor,
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
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: BASE_FONT_SIZE,
    lineHeight: BASE_LINE_HEIGHT,
    fontFamily: "InterRegular",
    textAlign: "center",
  },
});