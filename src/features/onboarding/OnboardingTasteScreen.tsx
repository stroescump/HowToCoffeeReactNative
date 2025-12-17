import {
  AcidityPreference,
  BitternessPreference,
  DrinkStyle,
  TastePrefs,
} from "@/src/shared/domain/tastePrefs";
import { postTastePrefs } from "@/src/shared/services/tastePrefsApi";
import { createSkippedTastePrefs, setTastePrefs } from "@/src/shared/services/tastePrefsStore";
import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import Button from "@/src/shared/ui/components/buttons/Button";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type StepKey = "intro" | "acidity" | "bitterness" | "drinkStyle";

type ChoiceOption<T extends string> = { value: T; label: string };

const acidityOptions: ChoiceOption<AcidityPreference>[] = [
  { value: "LIKES", label: "I enjoy bright, fruity coffee (fresh, lively)" },
  { value: "NEUTRAL", label: "I'm not sure / neutral" },
  { value: "DISLIKES", label: "I prefer round, chocolatey coffee (less sharp)" },
];

const bitternessOptions: ChoiceOption<BitternessPreference>[] = [
  { value: "DISLIKES", label: "Very sensitive to bitterness" },
  { value: "NEUTRAL", label: "Depends" },
  { value: "LIKES", label: "I don't mind bitterness" },
];

const drinkStyleOptions: ChoiceOption<DrinkStyle>[] = [
  { value: "ESPRESSO_STRAIGHT", label: "Straight espresso" },
  { value: "WITH_MILK", label: "Espresso with milk" },
  { value: "DEPENDS", label: "It depends / mix it up" },
];

export function OnboardingTasteScreen() {
  const router = useRouter();
  const [step, setStep] = useState<StepKey>("intro");
  const [acidity, setAcidity] = useState<AcidityPreference | null>(null);
  const [bitterness, setBitterness] = useState<BitternessPreference | undefined>();
  const [drinkStyle, setDrinkStyle] = useState<DrinkStyle | undefined>();
  const [busy, setBusy] = useState(false);

  const stepIndex = useMemo(() => ["intro", "acidity", "bitterness", "drinkStyle"].indexOf(step), [step]);

  const persistAndExit = async (prefs: TastePrefs) => {
    setBusy(true);
    await setTastePrefs(prefs);
    postTastePrefs(prefs);
    setBusy(false);
    router.replace("/");
  };

  const handleSkipAll = async () => {
    if (busy) return;
    const prefs = createSkippedTastePrefs();
    await persistAndExit(prefs);
  };

  const handleNext = async () => {
    if (step === "intro") {
      setStep("acidity");
      return;
    }
    if (step === "acidity") {
      setStep("bitterness");
      return;
    }
    if (step === "bitterness") {
      setStep("drinkStyle");
      return;
    }

    if (!acidity) return;
    const prefs: TastePrefs = {
      acidityPreference: acidity,
      bitternessPreference: bitterness,
      drinkStyle,
      createdAtMillis: Date.now(),
    };
    await persistAndExit(prefs);
  };

  const handleBack = () => {
    if (step === "intro") {
      router.replace("/");
      return;
    }
    if (step === "acidity") {
      setStep("intro");
      return;
    }
    if (step === "bitterness") {
      setStep("acidity");
      return;
    }
    setStep("bitterness");
  };

  const nextDisabled =
    busy ||
    (step === "acidity" && !acidity) ||
    (step === "intro" && false);

  const renderStepContent = () => {
    if (step === "intro") {
      return (
        <View className="flex-1 justify-center px-6">
          <Text className="text-5xl tracking-[-3px] font-[InterBlack] mb-4 leading-tight">
            Quick taste setup (30-60s)
          </Text>
          <Text className="text-lg font-[InterMedium] mb-8 text-black/80">
            Calibrate acidity, bitterness, and espresso style so we can tune recommendations.
            You can always change this later.
          </Text>
          <View className="flex-row gap-3">
            <Button
              className="flex-1"
              text="Start"
              onPress={handleNext}
              disabled={busy}
            />
            <Button
              className="flex-1"
              variant="ghost"
              text="Skip"
              onPress={handleSkipAll}
              disabled={busy}
            />
          </View>
        </View>
      );
    }

    if (step === "acidity") {
      return (
        <StepShell
          title="How do you feel about acidity?"
          subtitle="Tell us how much brightness you enjoy in your espresso."
          step={stepIndex}
          onSkip={handleSkipAll}
        >
          <OptionList
            options={acidityOptions}
            selected={acidity ?? undefined}
            onSelect={setAcidity}
          />
        </StepShell>
      );
    }
    if (step === "bitterness") {
      return (
        <StepShell
          title="Bitterness sensitivity"
          subtitle="Optional - pick what sounds closest."
          step={stepIndex}
          onSkip={handleSkipAll}
        >
          <OptionList
            options={bitternessOptions}
            selected={bitterness}
            onSelect={setBitterness}
          />
        </StepShell>
      );
    }
    return (
      <StepShell
        title="Your usual espresso style"
        subtitle="Optional - this helps us tune recipes."
        step={stepIndex}
        onSkip={handleSkipAll}
      >
        <OptionList
          options={drinkStyleOptions}
          selected={drinkStyle}
          onSelect={setDrinkStyle}
        />
      </StepShell>
    );
  };

  return (
    <BaseScreen showHeader={false} disablePadding>
      <View className="flex-1 bg-[#F5EAD7]">
        <View className="px-6 pt-6 flex-row justify-between items-center">
          <Text className="text-base uppercase tracking-[4px] font-[InterSemiBold]">
            Taste Lab
          </Text>
          <TouchableOpacity onPress={handleSkipAll} disabled={busy}>
            <Text className="text-lg font-[InterBold] underline decoration-dotted">
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          bounces={false}
        >
          {renderStepContent()}
        </ScrollView>

        <View className="px-6 pb-8">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-[InterSemiBold]">
              Step {stepIndex} / 3
            </Text>
            {busy && <Text className="text-sm font-[InterMedium]">Saving...</Text>}
          </View>
          <View className="flex-row gap-3">
            <Button
              className="flex-1"
              variant="ghost"
              text="Back"
              onPress={handleBack}
              disabled={busy}
            />
            <Button
              className="flex-1"
              text={step === "intro" ? "Start" : step === "drinkStyle" ? "Finish" : "Next"}
              onPress={handleNext}
              disabled={nextDisabled}
            />
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}

type OptionListProps<T extends string> = {
  options: ChoiceOption<T>[];
  selected?: T | null;
  onSelect: (value: T) => void;
};

function OptionList<T extends string>({ options, selected, onSelect }: OptionListProps<T>) {
  return (
    <View className="gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            className={`rounded-2xl border-2 px-4 py-4 ${isSelected ? "bg-black border-black" : "bg-white border-black/30"}`}
            onPress={() => onSelect(opt.value)}
          >
            <Text
              className={`text-xl font-[InterBold] ${isSelected ? "text-white" : "text-black"}`}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

type StepShellProps = {
  title: string;
  subtitle: string;
  step: number;
  children: React.ReactNode;
  onSkip: () => void;
};

function StepShell({ title, subtitle, step, children, onSkip }: StepShellProps) {
  return (
    <View className="px-6 pt-10">
      <Text className="text-4xl font-[InterBlack] tracking-[-2px] mb-3 leading-tight">
        {title}
      </Text>
      <Text className="text-lg font-[InterMedium] text-black/75 mb-8">
        {subtitle}
      </Text>
      <View className="mb-8">
        <View className="h-2 rounded-full bg-black/10">
          <View
            className="h-2 rounded-full bg-black"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </View>
      </View>
      {children}
      <TouchableOpacity className="mt-8" onPress={onSkip}>
        <Text className="text-base font-[InterBold] underline decoration-dotted">
          Skip setup, use defaults
        </Text>
      </TouchableOpacity>
    </View>
  );
}
