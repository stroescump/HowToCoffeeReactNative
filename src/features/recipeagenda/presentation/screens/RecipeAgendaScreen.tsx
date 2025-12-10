import { BaseScreen } from "@/src/shared/ui/components/BaseScreen";
import { useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React from "react";
import {
    FlatList,
    StatusBar,
    Text,
    View
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { BrewRecipe } from "../../domain/models/recipeAgenda";
import { RecipeCard } from "../components/RecipeCard";
import { PALETTE, SPACING, styles } from "./RecipeAgendaStyles";

type Props = {
    recipes: BrewRecipe[];
    onSelectRecipe?: (recipe: BrewRecipe) => void;
    onDeleteRecipe?: (recipeId: string) => void;
    deletingIds?: Set<string>;
};

const RecipeAgendaScreen: React.FC<Props> = ({ recipes, onSelectRecipe, onDeleteRecipe, deletingIds }) => {
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
                        <Swipeable
                            renderRightActions={() => (
                                <View
                                    style={{
                                        width: 140,
                                        backgroundColor: "#DC2626",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderTopRightRadius: 24,
                                        borderBottomRightRadius: 24,
                                    }}
                                >
                                    <Trash2 color="white" size={28} />
                                    <Text style={{ color: "white", marginTop: 6, fontWeight: "700" }}>
                                        {deletingIds?.has(item.id) ? "Deleting..." : "Delete"}
                                    </Text>
                                </View>
                            )}
                            rightThreshold={80}
                            onSwipeableOpen={(direction) => {
                                if (direction === "right") {
                                    onDeleteRecipe?.(item.id);
                                }
                            }}
                        >
                            <RecipeCard
                                recipe={item}
                                accentIndex={index}
                                onPress={() => onSelectRecipe && onSelectRecipe(item)}
                            />
                        </Swipeable>
                    )}
                />
            </View>
        </BaseScreen>
    );
};

export default RecipeAgendaScreen;
