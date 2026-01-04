import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { PALETTE, styles } from "../styles/coffeePlacesNearbyStyles";

type Props = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
};

export function StateView({
  title,
  body,
  actionLabel,
  onAction,
  isLoading,
}: Props) {
  return (
    <View style={styles.stateContainer}>
      {isLoading ? <ActivityIndicator color={PALETTE.accent} /> : null}
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateBody}>{body}</Text>
      {actionLabel && onAction ? (
        <Pressable style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
