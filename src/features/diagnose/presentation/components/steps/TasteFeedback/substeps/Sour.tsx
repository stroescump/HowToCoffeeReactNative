import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TasteFeedbackSubpageType } from './TasteFeedbackSubpage';
import { containerArtworkStyle, containerTextStyle, outerContainerStyle, tasteDescriptionStyle, tasteTitleStyle } from './styles/constants';

type SourProps = {
    sourDetails: TasteFeedbackSubpageType<"SOUR">
}

const Sour = ({ sourDetails }: SourProps) => {
    const { t } = useTranslation();
    const { tasteTitleRes, tasteDescriptionRes } = sourDetails;
    return (
        <View className={outerContainerStyle}>
            <View className={containerArtworkStyle}>
                <View className='flex-1 flex-row gap-2'>
                    <View className='flex-1 flex-col gap-2'>
                        <View className=' flex-1 bg-[#FFD700] rounded-t-full rounded-bl-full' />
                        <View className=' flex-1 bg-[#FFD700] rounded-b-full rounded-tl-full' />
                    </View>
                    <View className='flex-1 flex-col gap-2'>
                        <View className=' flex-1 bg-[#FFD700] rounded-t-full rounded-br-full' />
                        <View className=' flex-1 bg-[#FFD700] rounded-b-full rounded-tr-full' />
                    </View>
                </View>
            </View>
            <View className={containerTextStyle}>
                <View className='flex-1 flex-col'>
                    <Text className={tasteTitleStyle} adjustsFontSizeToFit minimumFontScale={0.6}>{t(tasteTitleRes)}</Text>
                    <Text className={tasteDescriptionStyle} adjustsFontSizeToFit minimumFontScale={0.6}>{t(tasteDescriptionRes)}</Text>
                </View>
                <View className='flex-1 bg-[#FFD700] rounded-tl-full' />
            </View>
        </View>
    )
}

export default Sour