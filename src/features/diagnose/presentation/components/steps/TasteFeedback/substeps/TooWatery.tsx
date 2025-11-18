import MaskedView from '@react-native-masked-view/masked-view'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, View } from 'react-native'
import { TastePageOf } from './TasteFeedbackSubpage'
import { containerArtworkStyle, containerTextStyle, outerContainerStyle, tasteDescriptionStyle, tasteTitleStyle } from './styles/constants'

type TooWateryDetails = TastePageOf<"watery">
type TooWateryProps = {
  tooWateryDetails: TooWateryDetails
}

const TooWatery = ({ tooWateryDetails }: TooWateryProps) => {
  const { image, tasteTitleRes, tasteDescriptionRes } = tooWateryDetails
  const { t } = useTranslation()
  return (
    <View className={outerContainerStyle}>
      <View className={`${containerArtworkStyle} bg-[#00FFF7] p-6`}>
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
        <View className='flex-1 flex-col'>
          <View className='flex-1 bg-black rounded-t-full' />
          <View className='flex-1 bg-black rounded-t-full' />
        </View>
      </View>
      <View className={containerTextStyle}>
        <View className='flex-1 flex-col'>
          <Text className={tasteTitleStyle} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={2}>{t(tasteTitleRes)}</Text>
          <Text className={tasteDescriptionStyle} adjustsFontSizeToFit minimumFontScale={0.4} numberOfLines={2}>{t(tasteDescriptionRes)}</Text>
        </View>
        <View className='flex-1 bg-[#00FFF7] rounded-tl-full'></View>
      </View>
    </View>
  )
}

export default TooWatery