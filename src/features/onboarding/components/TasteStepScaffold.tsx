import React from "react";
import { Text, View } from "react-native";
import Button from "@/src/shared/ui/components/buttons/Button";

type TasteStepScaffoldProps = {
  title: string;
  visual: React.ReactNode;
  slider: React.ReactNode;
  ctaText: string;
  onCta: () => void;
  ctaDisabled?: boolean;
  headerSlot?: React.ReactNode;
};

export function TasteStepScaffold({
  title,
  visual,
  slider,
  ctaText,
  onCta,
  ctaDisabled,
  headerSlot,
}: TasteStepScaffoldProps) {
  return (
    <View className="flex-1">
      <View className="flex-1 px-4 pt-6">
        <Text className="text-base uppercase tracking-[3px] font-[InterSemiBold] text-black/70">
          {title}
        </Text>
        {headerSlot ? <View className="mt-4">{headerSlot}</View> : null}
        <View className="flex-1 justify-center py-6">{visual}</View>
        <View>{slider}</View>
      </View>
      <View className="pb-8 pt-4">
        <Button className="mx-4" text={ctaText} onPress={onCta} disabled={ctaDisabled} />
      </View>
    </View>
  );
}
