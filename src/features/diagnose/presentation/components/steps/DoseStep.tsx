import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import { usePopup } from "@/src/shared/ui/contextproviders/PopupContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type DoseStepProps = {
    doseGrams: number
    onSubmit: (doseGrams: number) => void
};

const R = StringRes.steps.dose
const SPINNER_DOSAGE_VALUES = [...Array(21 - 7 + 1).keys()].map(i => i + 7)

export const DoseStep = ({
    doseGrams,
    onSubmit,
}: DoseStepProps) => {
    const [doseInput, setDoseInput] = useState(doseGrams);
    const { showPopup } = usePopup();
    const { t } = useTranslation();

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

            <View className="absolute flex-row justify-center left-0 right-0 bottom-5 mx-4 gap-2">
                <Button className="flex-[0.4]" text={t(R.buttonNoScale)}
                    onPress={() => {
                        showPopup(
                            t(R.popupNoScaleMessage),
                            t(R.popupNoScaleButtonText))
                    }} />
                <Button className="flex-[0.6]" text={t(StringRes.buttons.continue)}
                    onPress={() => { onSubmit(doseInput) }} />
            </View>
        </View>
    );
};
