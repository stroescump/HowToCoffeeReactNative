import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type GrindSettingSpinnerProps = {
  value?: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
};

export const GrindSettingSpinner: React.FC<GrindSettingSpinnerProps> = ({
  value,
  onChange,
  min = 0,
  max = 20,
}) => {
  // Generate values from min → max in 0.1 increments
  const options = [];
  for (let v = min; v <= max; v += 0.1) {
    options.push(v.toFixed(1));
  }

  return (
    <View style={{ position: "relative", marginTop: 4 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: "flex-end",
        }}
      >
        {options.map((option) => {
          const isSelected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={{
                alignItems: "center",
                marginRight: 20,
              }}
            >
              {/* Number above line */}
              <Text
                style={{
                  fontSize: isSelected ? 16 : 14,
                  fontWeight: isSelected ? "700" : "400",
                  color: isSelected ? "#010101" : "rgba(0,0,0,0.6)",
                  marginBottom: 6,
                }}
              >
                {option}
              </Text>

              {/* Line */}
              <View
                style={{
                  width: 2,
                  height: isSelected ? 28 : 16,
                  backgroundColor: isSelected ? "#010101" : "rgba(0,0,0,0.3)",
                  borderRadius: 1,
                }}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      </View>
  );
};