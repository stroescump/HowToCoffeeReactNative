import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type DoseStepProps = {
    doseGrams?: number;
    hasScale?: boolean;
    onSubmit: (doseGrams: number, hasScale: boolean | undefined) => void;
    onBack: () => void;
};

const SPINNER_DOSAGE_VALUES = [...Array(21 - 7 + 1).keys()].map(i => i + 7)

export const DoseStep = ({
    doseGrams,
    hasScale,
    onSubmit,
    onBack,
}: DoseStepProps) => {
    const [doseInput, setDoseInput] = useState(
        doseGrams != null ? String(doseGrams) : "",
    );
    const [localHasScale, setLocalHasScale] = useState(hasScale);
    const { t } = useTranslation(["diagnose", "common"]);

    useEffect(() => {
        setDoseInput(doseGrams != null ? String(doseGrams) : "");
    }, [doseGrams]);

    useEffect(() => {
        setLocalHasScale(hasScale);
    }, [hasScale]);

    const parsedDose = useMemo(() => Number(doseInput), [doseInput]);
    const canSubmit = !Number.isNaN(parsedDose) && parsedDose > 0;

    function handleSubmit() {
        if (!canSubmit) return;
        onSubmit(parsedDose, localHasScale);
    }

    return (
        <View className="flex-1 relative">
            <View className="absolute inset-0">
                <View className="flex-1 bg-[#F1E9DD] gap-2">
                    <View className="flex-1 bg-[#FC9401] rounded-b-[40px]" />
                    <View className="flex-1 bg-[#FF5210] rounded-t-[40px]" />
                </View>
            </View>
            <View className="flex-1">
                <Spinner
                    values={SPINNER_DOSAGE_VALUES}
                    unitOfMeasurement="g"
                    initialValue={parsedDose || doseGrams || 18}
                    onChange={(value) => setDoseInput(String(value))}
                />
            </View>
        </View>
    );
};
