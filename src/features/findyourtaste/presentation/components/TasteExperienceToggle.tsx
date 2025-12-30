import { USER_EXPERIENCE, UserExperience } from "@/src/shared/domain/tastePrefs";
import React from "react";
import { Pressable, Text, View } from "react-native";

type TasteExperienceToggleProps = {
  value: UserExperience;
  onChange: (value: UserExperience) => void;
  disabled?: boolean;
};

const EXPERIENCE_LABELS: Record<UserExperience, string> = {
  [USER_EXPERIENCE.BEGINNER]: "Beginner",
  [USER_EXPERIENCE.ADVANCED]: "Advanced",
};

export function TasteExperienceToggle({
  value,
  onChange,
  disabled = false,
}: TasteExperienceToggleProps) {
  const experienceOptions = Object.values(USER_EXPERIENCE) as UserExperience[];

  return (
    <View className="gap-3">
      <Text className="text-lg font-[InterBold] text-black">
        Experience level
      </Text>
      <View className="rounded-full bg-black/10 p-1 flex-row">
        {experienceOptions.map((option) => {
          const selected = value === option;
          return (
            <Pressable
              key={option}
              disabled={disabled}
              onPress={() => onChange(option)}
              className={`flex-1 items-center rounded-full py-2 ${
                selected ? "bg-black" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-sm font-[InterBold] ${
                  selected ? "text-white" : "text-black/70"
                }`}
              >
                {EXPERIENCE_LABELS[option]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
