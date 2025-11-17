import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import Button from '../buttons/Button'

type ErrorPopupProps = {
    errorMessage?: string
    onDismiss: () => void
}

const ErrorPopup = ({ errorMessage, onDismiss }: ErrorPopupProps) => {
    const { t } = useTranslation()
    return (
        <View className="self-center items-center flex-col px-6 py-4 rounded-3xl bg-[#F1E9DD]" style={{
            width: '90%',
            maxWidth: 420,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        }}>
            {/* <Image source={require('@/assets/images/error.png')} className='h-40 w-40 mb-4' resizeMode='contain' /> */}
            <Text className='font-[InterRegular] text-2xl m-4'>
                {errorMessage ?? t("defaultErrorTitle")}</Text>
            <Button variant='primary' text={t("defaultErrorButtonText")} width="grow" onPress={onDismiss} />
        </View>
    )
}

export default ErrorPopup