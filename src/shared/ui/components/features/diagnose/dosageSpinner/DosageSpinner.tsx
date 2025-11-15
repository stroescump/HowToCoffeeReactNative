import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    StyleSheet,
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

const MAX_WHEEL_FRACTION = 1;

const DEFAULT_DOSAGE_VALUES = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

// Ce fracțiune din înălțimea unui item are voie să ocupe fontul SELECTAT.
const SELECTED_FONT_ITEM_FRACTION = 1.3;

type DosageSpinnerProps = {
    values?: number[];
    initialValue?: number;
    onChange?: (value: number) => void;
    gapCenter?: number | null;
};

type SpinnerItemProps = {
    value: number;
    isSelected: boolean;
    onLayout?: (event: any) => void;
    baseFontSize: number;
    unitFontSize: number;
    selectedScale: number;
    horizontalOffsetFraction: number;
    wheelWidth: number;
    itemHeight: number;
};

const SpinnerItem: React.FC<SpinnerItemProps> = ({
    value,
    isSelected,
    onLayout,
    baseFontSize,
    unitFontSize,
    selectedScale,
    horizontalOffsetFraction,
    wheelWidth,
    itemHeight
}) => {
    const anim = React.useRef(new Animated.Value(isSelected ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(anim, {
            toValue: isSelected ? 1 : 0,
            friction: 7,
            tension: 55,
            useNativeDriver: false,
        }).start();
    }, [isSelected, anim]);

    const animatedScale = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, selectedScale],
    });

    const animatedOpacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 1],
    });

    const baseUnitMargin = 4;
    const animatedUnitMarginLeft = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [
            baseUnitMargin,
            baseUnitMargin + (baseFontSize * (selectedScale - 1)) / 2,
        ],
    });

    const horizontalOffset = wheelWidth * horizontalOffsetFraction;

    return (
        <View
            style={[
                styles.item,
                {
                    height: itemHeight,
                },
                isSelected && {
                    marginRight: horizontalOffset,
                },
            ]}
            onLayout={onLayout}
        >
            <Animated.Text
                style={[
                    {
                        fontFamily: "InterBold",
                        fontSize: baseFontSize,
                        opacity: animatedOpacity,
                        transform: [{ scale: animatedScale }],
                    },
                ]}
            >
                {value}
            </Animated.Text>
            <Animated.Text
                style={[
                    {
                        fontFamily: "InterSemiBold",
                        fontSize: unitFontSize,
                        opacity: animatedOpacity,
                        marginLeft: animatedUnitMarginLeft,
                    },
                ]}
            >
                grams
            </Animated.Text>
        </View>
    );
};

export const DosageSpinner: React.FC<DosageSpinnerProps> = ({
    values = DEFAULT_DOSAGE_VALUES,
    initialValue = 10,
    onChange,
    gapCenter,
}) => {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const [containerHeight, setContainerHeight] = useState<number | null>(null);
    const [containerY, setContainerY] = useState<number | null>(null);

    // spațiu vertical între cifre (în jurul fontului de bază – cel neselectat)
    const EXTRA_ITEM_SPACING = 8;

    // determinăm indexul inițial
    const initialIndex = (() => {
        const candidateIndex = values.indexOf(initialValue);
        return candidateIndex === -1 ? 0 : candidateIndex;
    })();

    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const selectedIndexRef = useRef(initialIndex);
    const listRef = useRef<FlatList<number>>(null);

    // guard: facem auto-scroll inițial o singură dată
    const hasDoneInitialScroll = useRef(false);

    // memo pentru layout + fonturi
    const {
        scaleWidth,
        wheelWidth,
        wheelHeight,
        itemHeight,
        baseFontSize,
        unitFontSize,
        selectedScale,
        verticalPadding,
    } = React.useMemo(() => {
        const widthScale = screenWidth / DESIGN_WIDTH;

        const baseFontFromWidth = FIGMA_UNSELECTED_SIZE * widthScale;
        const unitFontFromWidth = FIGMA_UNIT_SIZE * widthScale;

        const SELECTED_SCALE = FIGMA_SELECTED_SIZE / FIGMA_UNSELECTED_SIZE;

        const idealItemHeight = baseFontFromWidth * 1.1 + EXTRA_ITEM_SPACING;

        const availableHeight = (containerHeight ?? screenHeight) || screenHeight;
        const maxWheelHeight = availableHeight * MAX_WHEEL_FRACTION;

        const MIN_VISIBLE_ITEMS = 5;
        let visibleItems = Math.floor(maxWheelHeight / idealItemHeight);

        if (visibleItems < MIN_VISIBLE_ITEMS) {
            visibleItems = MIN_VISIBLE_ITEMS;
        }
        if (visibleItems % 2 === 0) {
            visibleItems += 1;
        }

        const wheelHeight = maxWheelHeight;
        const itemHeight = wheelHeight / visibleItems;
        console.log('🛞 wheelHeight =', wheelHeight);

        const maxSelectedFontSize = itemHeight * SELECTED_FONT_ITEM_FRACTION;

        const baseFontSize =
            maxSelectedFontSize > 0
                ? Math.min(baseFontFromWidth, maxSelectedFontSize / SELECTED_SCALE)
                : baseFontFromWidth;

        const fontScaleFactor = baseFontSize / baseFontFromWidth;
        const unitFontSize = unitFontFromWidth * fontScaleFactor;

        const verticalPadding = (wheelHeight - itemHeight) / 2;

        const SCALE_FRACTION = 0.25;
        const scaleWidth = screenWidth * SCALE_FRACTION;
        const wheelWidth = screenWidth - scaleWidth;

        return {
            scaleWidth,
            wheelWidth,
            wheelHeight,
            itemHeight,
            baseFontSize,
            unitFontSize,
            selectedScale: SELECTED_SCALE,
            verticalPadding,
        };
    }, [screenWidth, screenHeight, containerHeight]);

    const snapToIndex = (index: number) => {
        if (!listRef.current || !itemHeight) return;

        const clamped = Math.max(0, Math.min(index, values.length - 1));
        const offset = clamped * itemHeight;

        listRef.current.scrollToOffset({
            offset,
            animated: true,
        });
    };

    // notify onChange când se schimbă selecția
    useEffect(() => {
        if (!onChange) return;
        const value = values[selectedIndex];
        if (value != null) {
            onChange(value);
        }
    }, [selectedIndex, onChange, values]);

    // scroll inițial la valoarea dorită
    useEffect(() => {
        if (hasDoneInitialScroll.current) return;
        if (!listRef.current) return;
        if (!itemHeight) return;

        const offset = itemHeight * initialIndex;

        listRef.current.scrollToOffset({
            offset,
            animated: false,
        });

        hasDoneInitialScroll.current = true;
    }, [itemHeight, initialIndex]);

    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const rawIndex = offsetY / itemHeight;
        const index = Math.round(rawIndex);
        const clamped = Math.max(0, Math.min(index, values.length - 1));

        if (clamped !== selectedIndexRef.current) {
            selectedIndexRef.current = clamped;
            setSelectedIndex(clamped);
        }
    };

    const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const rawIndex = offsetY / itemHeight;
        const index = Math.round(rawIndex);
        const clamped = Math.max(0, Math.min(index, values.length - 1));

        if (clamped !== selectedIndexRef.current) {
            selectedIndexRef.current = clamped;
            setSelectedIndex(clamped);
        }

        const targetOffset = clamped * itemHeight;

        // Snap DOAR dacă suntem suficient de departe ca să merite
        const SNAP_THRESHOLD = itemHeight * 0.1;
        if (Math.abs(targetOffset - offsetY) > SNAP_THRESHOLD) {
            snapToIndex(clamped);
        }
    };

    // Dimensiuni Figma pentru SVG-ul scalei
    const VIEWBOX_HEIGHT = 618;
    const LONG_GRADATION_Y = 308;
    const linePosInSvg = LONG_GRADATION_Y / VIEWBOX_HEIGHT;

    let gradationMarginTop = 0;

    if (
        gapCenter != null &&
        containerY != null &&
        containerHeight != null &&
        wheelHeight > 0
    ) {
        const localGapCenter = gapCenter - containerY;

        const clampedLocalGap = Math.max(0, Math.min(localGapCenter, containerHeight));

        const gapFraction = clampedLocalGap / containerHeight;

        const lineFractionInWheelComputed =
            (containerHeight * gapFraction -
                (containerHeight - wheelHeight) / 2) /
            wheelHeight;

        gradationMarginTop =
            wheelHeight * (lineFractionInWheelComputed - linePosInSvg);

        console.log(
            '🎯 localGapCenter =',
            localGapCenter,
            'gapFraction =',
            gapFraction,
            'gradationMarginTop =',
            gradationMarginTop
        );
    }

    return (
        <View
            style={[styles.root, { width: screenWidth }]}
            onLayout={(e) => {
                const { height, y } = e.nativeEvent.layout;
                if (height > 0 && height !== containerHeight) {
                    setContainerHeight(height);
                    console.log('📏 Spinner containerHeight:', height, 'screenHeight:', screenHeight);
                }
                if (y !== containerY) {
                    setContainerY(y);
                    console.log('📍 Spinner containerY:', y);
                }
            }}
        >
            {/* Stânga: meter */}
            <View
                style={[
                    styles.svgContainer,
                    {
                        width: scaleWidth,
                        height: wheelHeight,
                        marginTop: gradationMarginTop,
                    },
                ]}
            >
                <DosageScaleFrame width={scaleWidth} height={wheelHeight} />
            </View>

            {/* Dreapta: numeric wheel */}
            <View
                style={[
                    styles.wheelContainer,
                    {
                        width: wheelWidth,
                        height: wheelHeight,
                    },
                ]}
            >
                <FlatList
                    ref={listRef}
                    data={values}
                    keyExtractor={(item) => item.toString()}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={Platform.OS === 'ios' ? 'fast' : 0.98}
                    onScroll={handleScroll}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    scrollEventThrottle={16}
                    ListHeaderComponent={
                        <View style={{ height: verticalPadding }} />
                    }
                    ListFooterComponent={
                        <View style={{ height: verticalPadding }} />
                    }
                    getItemLayout={(_, index) => ({
                        length: itemHeight,
                        offset: itemHeight * index,
                        index,
                    })}
                    renderItem={({ item, index }) => {
                        const isSelected = index === selectedIndex;

                        return (
                            <SpinnerItem
                                value={item}
                                isSelected={isSelected}
                                onLayout={undefined}
                                baseFontSize={baseFontSize}
                                unitFontSize={unitFontSize}
                                selectedScale={selectedScale}
                                horizontalOffsetFraction={50 / (DESIGN_WIDTH * 0.75)}
                                wheelWidth={wheelWidth}
                                itemHeight={itemHeight}
                            />
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
        justifyContent: 'center',
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
        justifyContent: 'center',
    },
});

export default DosageSpinner;