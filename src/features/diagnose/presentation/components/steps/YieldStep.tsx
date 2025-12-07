import { StringRes } from "@/src/i18n/strings";
import Button from "@/src/shared/ui/components/buttons/Button";
import { Spinner } from "@/src/shared/ui/components/features/diagnose/dosageSpinner/Spinner";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const DEFAULT_YIELD = 36

type YieldStepProps = {
    yieldGrams?: number
    onSubmit: (yieldGrams: number) => void
};

const SPINNER_YIELD_VALUES = [...Array(61 + 1).keys()].map(i => i)

export const YieldStep = ({
    yieldGrams,
    onSubmit,
}: YieldStepProps) => {
    const [yieldInput, setYieldInput] = useState(yieldGrams ?? DEFAULT_YIELD);
    const { t } = useTranslation();

    return (
        <View className="flex-1 relative">
            <View className="absolute inset-0">
                <View className="flex-1 bg-[#F1E9DD] gap-2">
                    <View className="flex-1 bg-[#FF5210] rounded-b-[40px]" />
                    <View className="flex-1 bg-[#FC9401] rounded-t-[40px]" />
                </View>
            </View>
            <View className="flex-1">
                <Spinner
                    values={SPINNER_YIELD_VALUES}
                    unitOfMeasurement="g"
                    initialValue={yieldInput}
                    onChange={(value) => setYieldInput(value)}
                />
            </View>

            <View className="absolute flex-row justify-center left-0 right-0 bottom-5 mx-4 gap-2">
                <Button className="flex-1" text={t(StringRes.buttonContinue)}
                    onPress={() => { onSubmit(yieldInput) }} />
            </View>
        </View>
    );
};
