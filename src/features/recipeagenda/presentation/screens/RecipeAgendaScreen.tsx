import { StringRes } from '@/src/i18n/strings'
import { BaseScreen } from '@/src/shared/ui/components/BaseScreen'
import { PopupProvider } from '@/src/shared/ui/contextproviders/PopupContext'
import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'

const RecipeAgendaScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();

    function handleBack() {
        router.back()
    }

    return (
        <PopupProvider>
            <BaseScreen
                title={t(StringRes.recipeAgenda.title)}
                onBack={handleBack}
            >
                <Text>Placeholder</Text>
            </BaseScreen>
        </PopupProvider >
    )
}

export default RecipeAgendaScreen