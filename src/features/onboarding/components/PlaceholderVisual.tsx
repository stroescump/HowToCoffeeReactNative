import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VisualSpec } from "../types";

export function PlaceholderVisual({ shape, color, accentColor, label }: VisualSpec) {
  return (
    <View className="flex-1 items-center justify-center">
      <View style={styles.stack}>
        <View style={[styles.accent, { backgroundColor: accentColor ?? "#000000" }]} />
        {shape === "triangle" ? (
          <View style={[styles.triangle, { borderBottomColor: color }]} />
        ) : (
          <View style={[styles.shape, shapeStyles[shape], { backgroundColor: color }]} />
        )}
      </View>
      <Text className="mt-5 text-base font-[InterSemiBold] text-black">{label}</Text>
      <Text className="text-xs font-[InterMedium] text-black/50">
        TODO: replace with imagery
      </Text>
    </View>
  );
}

const SHAPE_SIZE = 220;

const styles = StyleSheet.create({
  stack: {
    alignItems: "center",
    justifyContent: "center",
  },
  shape: {
    width: SHAPE_SIZE,
    height: SHAPE_SIZE,
    borderRadius: 32,
  },
  accent: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 24,
    right: -18,
    top: -18,
    opacity: 0.7,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: SHAPE_SIZE / 2,
    borderRightWidth: SHAPE_SIZE / 2,
    borderBottomWidth: SHAPE_SIZE,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});

const shapeStyles = StyleSheet.create({
  circle: {
    borderRadius: SHAPE_SIZE / 2,
  },
  square: {
    borderRadius: 28,
  },
  diamond: {
    borderRadius: 26,
    transform: [{ rotate: "45deg" }],
  },
  pill: {
    width: SHAPE_SIZE,
    height: SHAPE_SIZE * 0.6,
    borderRadius: 999,
  },
});
