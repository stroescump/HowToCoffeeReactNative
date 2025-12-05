import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StatusBar,
    View
} from "react-native";
import { EspressoRecipe } from "../../domain/models/recipeAgenda";
import { RecipeCard } from "../components/RecipeCard";
import { PALETTE, SPACING, styles } from "./RecipeAgendaStyles";

type Props = {
    recipes: EspressoRecipe[];
    onSelectRecipe?: (recipe: EspressoRecipe) => void;
};

const RecipeAgendaScreen: React.FC<Props> = ({ recipes, onSelectRecipe }) => {
    const router = useRouter();
    return (
        <BaseScreen safeAreaBgColor={PALETTE.background} onBack={() => { router.back() }}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={{ height: SPACING * 2 }} />}
                    renderItem={({ item, index }) => (
                        <RecipeCard
                            recipe={item}
                            accentIndex={index}
                            onPress={() => onSelectRecipe && onSelectRecipe(item)}
                        />
                    )}
                />
            </View>
        </BaseScreen>
    );
};

export default RecipeAgendaScreen;