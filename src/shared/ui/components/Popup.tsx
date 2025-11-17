import WonderingManSvg from '@/assets/images/wondering-man.svg'
import React from 'react'
import { Text, View } from 'react-native'
import Button from './buttons/Button'

type PopupProps = {
    popupTitle: string
    popupButtonDescription: string
    onDismiss: () => void
}

// parses **bold** inside the string into nested <Text> pieces
const renderMarkedText = (text: string) => {
    // Split into: [normal, **bold**, normal, **bold**, ...]
    const parts = text.split(/(\*\*[^*]+\*\*)/g)

    return parts.map((part, index) => {
        const match = part.match(/^\*\*([^*]+)\*\*$/)

        if (match) {
            // bold segment
            return (
                <Text
                    key={index}
                    className="font-[InterBold] tracking-[-0.6] text-xl"
                >
                    {match[1]}
                </Text>
            )
        }

        // normal segment
        if (!part) return null

        return (
            <Text
                key={index}
                className="font-[InterRegular] tracking-[-0.6] text-xl"
            >
                {part}
            </Text>
        )
    })
}

const Popup = ({ popupTitle, popupButtonDescription, onDismiss }: PopupProps) => {
    return (
        <View
            className="self-center mx-[6%] items-center flex-col px-6 py-6 rounded-3xl bg-[#F1E9DD]"
            style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
            }}
        >
            <WonderingManSvg className="h-40 w-40 mb-4 justify-center" resizeMode="contain" />

            {/* Outer Text wraps the inline pieces so it behaves as a single paragraph */}
            <Text className="my-4">
                {renderMarkedText(popupTitle)}
            </Text>

            <Button
                variant="primary"
                text={popupButtonDescription}
                onPress={onDismiss}
            />
        </View>
    )
}

export default Popup