import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

type AnimatedSwapProps = {
  index: number;
  items: React.ReactNode[];
  className?: string;
};

export function AnimatedSwap({ index, items, className = "" }: AnimatedSwapProps) {
  const opacities = useRef(items.map((_, i) => new Animated.Value(i === index ? 1 : 0)))
    .current;
  const scales = useRef(items.map((_, i) => new Animated.Value(i === index ? 1 : 0.96)))
    .current;
  const previousIndex = useRef(index);

  useEffect(() => {
    const prev = previousIndex.current;
    if (prev === index) return;

    Animated.parallel([
      Animated.timing(opacities[prev], {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(scales[prev], {
        toValue: 0.96,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacities[index], {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(scales[index], {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();

    previousIndex.current = index;
  }, [index, opacities, scales]);

  return (
    <View className={`flex-1 ${className}`} style={styles.container}>
      {items.map((item, i) => (
        <Animated.View
          key={`swap-${i}`}
          style={[
            StyleSheet.absoluteFillObject,
            { opacity: opacities[i], transform: [{ scale: scales[i] }] },
          ]}
        >
          {item}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
