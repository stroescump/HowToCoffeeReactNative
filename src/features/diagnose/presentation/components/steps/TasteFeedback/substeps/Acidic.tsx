import MaskedView from '@react-native-masked-view/masked-view'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, View } from 'react-native'
import { TasteFeedbackSubpageType } from './TasteFeedbackSubpage'
import { containerArtworkStyle, containerTextStyle, outerContainerStyle, tasteDescriptionStyle, tasteTitleStyle } from './styles/constants'

type AcidicDetails = TasteFeedbackSubpageType<"acidic">
type AcidicProps = {
  acidicDetails: AcidicDetails
}

const Acidic = ({ acidicDetails }: AcidicProps) => {
  const { image, tasteTitleRes, tasteDescriptionRes } = acidicDetails
  const { t } = useTranslation()

  return (
    <View className={outerContainerStyle}>
      <View className={`${containerArtworkStyle} bg-[#1AFF66] p-6`}>
        <MaskedView
          maskElement={
            <View className='flex-1'>
              <View className='flex-1 flex-row'>
                <View className='flex-1 rounded-b-full bg-black' />
                <View className='flex-1 rounded-b-full bg-black' />
              </View>
              <View className='flex-1 flex-row'>
                <View className='flex-1 rounded-t-full bg-black' />
                <View className='flex-1 rounded-t-full bg-black' />
              </View>
            </View>
          }
        >
          <Image
            source={image}
            className='w-full h-full'
            resizeMode='cover'
          />
        </MaskedView>
        <View className='flex-1 bg-black rounded-tl-full rounded-br-full' />
        <View className='flex-1 bg-black rounded-tr-full rounded-bl-full' />
      </View>
      <View className={containerTextStyle}>
        <View className='flex-1 flex-col'>
          <Text className={tasteTitleStyle} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={2}>{t(tasteTitleRes)}</Text>
          <Text className={tasteDescriptionStyle} adjustsFontSizeToFit minimumFontScale={0.6} numberOfLines={4}>{t(tasteDescriptionRes)}</Text>
        </View>
        <View className='flex-1 bg-[#1AFF66] rounded-tl-full'></View>
      </View>
    </View>
  )
}

export default Acidic