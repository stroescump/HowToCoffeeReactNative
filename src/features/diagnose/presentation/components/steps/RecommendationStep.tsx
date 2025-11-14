import React from 'react';
import { Text, View } from 'react-native';
import { DiagnoseAnswersDraft } from '../../../domain/entities/DiagnoseAnswers';
import { isCompleteDiagnoseAnswers } from "../../../domain/usecases/AreAnswersCompleted";

function useRecommendation(answersDraft: DiagnoseAnswersDraft) {
  if (!isCompleteDiagnoseAnswers(answersDraft)) {
    // aici TS știe că answersDraft E INCOMPLET
    throw new Error("Cannot compute recommendation from incomplete answers.");
  }

  // 🔥 de aici încolo answersDraft e smart-cast la DiagnoseAnswers (non-nullable)
  const answers = answersDraft;

  // answers.coffeeType, answers.doseGrams, etc → toate non-null
}

const RecommendationStep = () => {
  return (
    <View>
      <Text>RecommendationStep</Text>
    </View>
  )
}

export default RecommendationStep