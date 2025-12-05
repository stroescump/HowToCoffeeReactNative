import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useEspressoRecipes } from "../hooks/useEspressoRecipes";
import RecipeAgendaScreen from "./RecipeAgendaScreen";
import { PALETTE } from "./RecipeAgendaStyles";

const RecipeAgendaContainer: React.FC = () => {
    const router = useRouter();
    const { data, isLoading, error, refetch } = useEspressoRecipes();

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: PALETTE.background,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    if (error != null) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: PALETTE.background,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                }}
            >
                <Text style={{ color: "white", marginBottom: 8 }}>Failed to load recipes.</Text>
                <Text style={{ color: "gray", fontSize: 12 }}>
                    {(error as Error)?.message ?? "Unknown error"}
                </Text>
                {/* add a retry button if you want */}
            </View>
        );
    }

    const recipes = data ?? [];

    return (
        <RecipeAgendaScreen
            recipes={recipes}
            onSelectRecipe={(recipe) => {
                // router.push({
                //   pathname: "/recipeAgenda/detail",
                //   params: { id: recipe.id },
                // });
            }}
        />
    );
};

export default RecipeAgendaContainer;