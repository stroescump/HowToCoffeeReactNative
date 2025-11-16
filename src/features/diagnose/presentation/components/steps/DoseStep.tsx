import PrimaryButton from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import React, { useState } from "react";
import { View } from "react-native";

type DoseStepProps = {
    doseGrams: number
    onSubmit: (doseGrams: number) => void
};

const SPINNER_DOSAGE_VALUES = [...Array(21 - 7 + 1).keys()].map(i => i + 7)

export const DoseStep = ({
    doseGrams,
    onSubmit,
}: DoseStepProps) => {
    const [doseInput, setDoseInput] = useState(doseGrams);
    const { showError } = usePopup();

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
                    initialValue={doseGrams}
                    onChange={(value) => setDoseInput(value)}
                />
            </View>

            <View className="absolute flex-row justify-center left-0 right-0 bottom-5 gap-2">
                <PrimaryButton titleRes="diagnose:steps.dose.buttonNoScale"
                    onPress={() => { showError() }} />
                <PrimaryButton titleRes="common:buttons.continue"
                    onPress={() => { onSubmit(doseInput) }} />
            </View>
        </View>
    );
};
