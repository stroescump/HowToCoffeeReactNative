import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { DosageScaleFrame } from './DosageScaleFrame';

// --- Figma reference frame ---
const DESIGN_WIDTH = 428;

// Figma text sizes
const FIGMA_SELECTED_SIZE = 140;
const FIGMA_UNSELECTED_SIZE = 80;
const FIGMA_UNIT_SIZE = 32;

const VISIBLE_ITEMS = 5;
const MAX_WHEEL_FRACTION = 1;

const DEFAULT_DOSAGE_VALUES = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

type DosageWheelProps = {
    values?: number[];
    initialValue?: number;
    onChange?: (value: number) => void;
};

export const DosageWheel: React.FC<DosageWheelProps> = ({
    values = DEFAULT_DOSAGE_VALUES,
    initialValue = 10,
    onChange,
}) => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const [containerHeight, setContainerHeight] = useState<number | null>(null);
    const EXTRA_ITEM_SPACING = 8; // px vizuali între cifre

    // Scale fonts from Figma based on screen width
    const widthScale = screenWidth / DESIGN_WIDTH;
    const selectedFontRaw = FIGMA_SELECTED_SIZE * widthScale;
    const unselectedFontRaw = FIGMA_UNSELECTED_SIZE * widthScale;
    const unitFontRaw = FIGMA_UNIT_SIZE * widthScale;

    // Base item height derived from the selected font; keep enough room to avoid clipping
    const itemHeightRaw = selectedFontRaw + EXTRA_ITEM_SPACING;
    const wheelHeightRaw = itemHeightRaw * VISIBLE_ITEMS;
    const availableHeight = containerHeight ?? screenHeight;
    const maxWheelHeight = availableHeight * MAX_WHEEL_FRACTION;

    // If the raw wheel is too tall, scale everything down uniformly
    const uniformScale =
        wheelHeightRaw > maxWheelHeight
            ? maxWheelHeight / wheelHeightRaw
            : 1;

    const ITEM_HEIGHT = itemHeightRaw * uniformScale;
    const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

    // Final font sizes for selected / unselected / unit
    const itemFontSizeSelected = selectedFontRaw * uniformScale;
    const itemFontSize = unselectedFontRaw * uniformScale;
    const unitFontSize = unitFontRaw * uniformScale;

    // Horizontal layout:
    // - 25% of width for the scale on the left
    // - remaining space for the wheel
    const SCALE_FRACTION = 0.25;
    const SCALE_WIDTH = screenWidth * SCALE_FRACTION;
    const WHEEL_WIDTH = screenWidth - SCALE_WIDTH;

    // Center the middle item: padding = (containerHeight - itemHeight) / 2
    const verticalPadding = (WHEEL_HEIGHT - ITEM_HEIGHT) / 2;

    const candidateIndex = values.indexOf(initialValue);
    const initialIndex = candidateIndex === -1 ? 0 : candidateIndex;

    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const selectedIndexRef = useRef(initialIndex);
    const listRef = useRef<FlatList<number>>(null);

    const [measuredItemHeight, setMeasuredItemHeight] = useState<number | null>(null);
    const EFFECTIVE_ITEM_HEIGHT = measuredItemHeight ?? ITEM_HEIGHT;

    // Keep external world informed when selection changes
    useEffect(() => {
        if (!onChange) return;
        const value = values[selectedIndex];
        if (value != null) {
            onChange(value);
        }
    }, [selectedIndex, onChange, values]);

    // Scroll to initial value on mount / layout change
    // useEffect(() => {
    //     if (!listRef.current) return;
    //     listRef.current.scrollToOffset({
    //         offset: initialIndex * ITEM_HEIGHT,
    //         animated: false,
    //     });
    // }, [initialIndex, ITEM_HEIGHT]);

    const handleScroll = (
        e: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const rawIndex = offsetY / EFFECTIVE_ITEM_HEIGHT;
        const index = Math.round(rawIndex);
        const clamped = Math.max(0, Math.min(index, values.length - 1));

        if (clamped !== selectedIndexRef.current) {
            selectedIndexRef.current = clamped;
            setSelectedIndex(clamped);
        }
    };

    const handleMomentumScrollEnd = (
        e: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const rawIndex = offsetY / EFFECTIVE_ITEM_HEIGHT;
        const index = Math.round(rawIndex);
        const clamped = Math.max(0, Math.min(index, values.length - 1));

        if (clamped !== selectedIndexRef.current) {
            selectedIndexRef.current = clamped;
            setSelectedIndex(clamped);
        }
    };

    return (
        <View style={[styles.root,
        { width: screenWidth },
        ]}
            onLayout={(e) => {
                const h = e.nativeEvent.layout.height;
                if (h > 0 && h !== containerHeight) {
                    setContainerHeight(h);
                }
            }}
        >
            {/* Left: meter, anchored to the left side */}
            <View
                style={[
                    styles.svgContainer,
                    {
                        width: SCALE_WIDTH,
                        height: WHEEL_HEIGHT,
                    },
                ]}
            >
                <DosageScaleFrame width={SCALE_WIDTH} height={WHEEL_HEIGHT} />
            </View>

            {/* Middle: numeric wheel, centered in its own column */}
            <View
                style={[
                    styles.wheelContainer,
                    {
                        width: WHEEL_WIDTH,
                        height: WHEEL_HEIGHT,
                    },
                ]}
            >
                <FlatList
                    ref={listRef}
                    data={values}
                    keyExtractor={(item) => item.toString()}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={0.87}
                    onScroll={handleScroll}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                        paddingVertical: verticalPadding,
                    }}
                    getItemLayout={(_, index) => ({
                        length: EFFECTIVE_ITEM_HEIGHT,
                        offset: EFFECTIVE_ITEM_HEIGHT * index,
                        index,
                    })}
                    renderItem={({ item, index }) => {
                        const isSelected = index === selectedIndex;

                        // handler de layout doar pentru primul item
                        const onItemLayout =
                            index === 0
                                ? (event: any) => {
                                    if (measuredItemHeight == null) {
                                        setMeasuredItemHeight(event.nativeEvent.layout.height);
                                    }
                                }
                                : undefined;

                        return (
                            <View
                                style={styles.item}
                                onLayout={onItemLayout}
                            >
                                <Text
                                    style={[
                                        styles.itemText,
                                        {
                                            fontSize: isSelected
                                                ? itemFontSizeSelected
                                                : itemFontSize,
                                            opacity: isSelected ? 1 : 0.4,
                                        },
                                    ]}
                                >
                                    {item}
                                </Text>
                                <Text
                                    style={[
                                        styles.itemUnit,
                                        {
                                            fontSize: unitFontSize,
                                            opacity: isSelected ? 1 : 0.4,
                                        },
                                    ]}
                                >
                                    grams
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // centrează scale + wheel în zona primită
    },
    svgContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    wheelContainer: {
        overflow: 'hidden',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // center the number+unit horizontally
    },
    itemText: {
        fontWeight: '600',
        textAlign: 'center',
    },
    itemUnit: {
        marginLeft: 4,
    },
});

export default DosageWheel;
