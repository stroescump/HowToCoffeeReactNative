import MaskedView from '@react-native-masked-view/masked-view'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, View } from 'react-native'
import { TastePageOf } from './TasteFeedbackSubpage'
import { containerArtworkStyle, containerTextStyle, outerContainerStyle, tasteDescriptionStyle, tasteTitleStyle } from './styles/constants'

type BitterType = TastePageOf<"bitter">
type BitterProps = {
  bitterDetails: BitterType
}

const Bitter = ({ bitterDetails }: BitterProps) => {
  const { image, tasteTitleRes, tasteDescriptionRes } = bitterDetails
  const { t } = useTranslation()
  return (
    <View className={outerContainerStyle}>
      <View className={containerArtworkStyle}>
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
      </View>
      <View className={containerTextStyle}>
        <View className='flex-1 flex-col'>
          <Text className={tasteTitleStyle}>{t(tasteTitleRes)}</Text>
          <Text className={tasteDescriptionStyle}>{t(tasteDescriptionRes)}</Text>
        </View>
        <View className='flex-1 bg-[#E6E7EE] rounded-tl-full' />
      </View>
    </View>
  )
}



export default Bitter