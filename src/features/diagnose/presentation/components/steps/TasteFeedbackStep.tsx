import React from 'react'
import { Text, View } from 'react-native'

type TasteFeedbackStepProps = {
  onSubmit: () => void
}

const TasteFeedbackStep = ({ onSubmit }: TasteFeedbackStepProps) => {
  return (
    <View>
      <Text>TasteFeedbackStep</Text>
    </View>
  )
}

export default TasteFeedbackStep