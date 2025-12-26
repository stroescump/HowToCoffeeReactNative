import React from "react";
import { Pressable, Text } from "react-native";

type AuthLinkProps = {
  text: string;
  onPress: () => void;
  align?: "left" | "center";
};

export function AuthLink({ text, onPress, align = "left" }: AuthLinkProps) {
  return (
    <Pressable onPress={onPress}>
      <Text
        className={`text-base text-black/70 underline ${align === "center" ? "text-center" : ""}`}
      >
        {text}
      </Text>
    </Pressable>
  );
}
