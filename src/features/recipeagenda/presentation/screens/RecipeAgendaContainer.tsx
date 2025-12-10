import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { deleteBrewRecipe } from "../../data/brewRecipeApi";
import { BrewRecipe } from "../../domain/models/recipeAgenda";
import { useBrewRecipes } from "../hooks/useBrewRecipes";
import RecipeAgendaScreen from "./RecipeAgendaScreen";
import { PALETTE } from "./RecipeAgendaStyles";

const RecipeAgendaContainer: React.FC = () => {
    const { data, isLoading, error } = useBrewRecipes();
    const [recipes, setRecipes] = useState<BrewRecipe[]>([]);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (data) {
            setRecipes(data);
        }
    }, [data]);

    const handleDelete = async (recipeId: string) => {
        if (deletingIds.has(recipeId)) return;
        setDeletingIds((prev) => new Set(prev).add(recipeId));
        try {
            await deleteBrewRecipe(recipeId);
            setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
        } catch (err) {
            // optional: surface error to user; noop for now
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(recipeId);
                return next;
            });
        }
    };

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

    return (
        <RecipeAgendaScreen
            recipes={recipes}
            deletingIds={deletingIds}
            onDeleteRecipe={handleDelete}
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
