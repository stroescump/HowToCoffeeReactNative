import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type AuthTextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & Pick<
  TextInputProps,
  "secureTextEntry" | "keyboardType" | "autoCapitalize" | "autoCorrect"
>;

export function AuthTextField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = "none",
  autoCorrect = false,
}: AuthTextFieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-lg font-[InterBold] text-black/80">
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        className="border border-black/20 rounded-xl px-3 py-2 text-base text-black"
        placeholderTextColor="rgba(0,0,0,0.4)"
      />
    </View>
  );
}
