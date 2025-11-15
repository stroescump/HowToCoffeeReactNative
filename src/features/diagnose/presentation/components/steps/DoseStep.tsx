import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

type DoseStepProps = {
    doseGrams: number;
    hasScale: boolean;
    onSubmit: (doseGrams: number, hasScale: boolean) => void;
    onBack: () => void;
};

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
        <View className="flex-1">
            {/* Foreground content rendered above the background */}
            <View className="flex-1 flex-col">

                {/* Children */}
                <View>

                </View>
            </View>
        </View>
    );
};
