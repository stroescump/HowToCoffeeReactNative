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

{/** TODO: Align Spinner to the middle of the screen */ }
{/** TODO: When opening the Spinner with a preselected dose, scrolling is broken on Android and slightly off on iOS */ }

// --- Figma reference frame ---
const DESIGN_WIDTH = 428;

// Figma text sizes
const FIGMA_SELECTED_SIZE = 140;
const FIGMA_UNSELECTED_SIZE = 80;
const FIGMA_UNIT_SIZE = 32;

const MAX_WHEEL_FRACTION = 1;

const DEFAULT_DOSAGE_VALUES = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];


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
    selectedHorizontalOffset: number;
    itemHeight: number;
    onMeasuredWidth?: (width: number) => void;
};

const SpinnerItem: React.FC<SpinnerItemProps> = ({
    value,
    isSelected,
    onLayout,
    baseFontSize,
    unitFontSize,
    selectedScale,
    selectedHorizontalOffset,
    itemHeight,
    onMeasuredWidth,
}) => {
    const anim = React.useRef(new Animated.Value(isSelected ? 1 : 0)).current;
    const hasReportedWidthRef = React.useRef(false);

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

    const unitMarginLeft = isSelected
        ? baseFontSize * 0.5   // mai mult spațiu când numărul e mărit
        : baseFontSize * 0.2;  // un pic mai mult decât 0.12, dar tot raportat la font

    return (
        <View
            style={[
                styles.item,
                {
                    height: itemHeight,
                    marginRight: isSelected ? selectedHorizontalOffset : 0,
                },
            ]}
            onLayout={(e) => {
                onLayout?.(e);
                const w = e.nativeEvent.layout.width;
                if (!hasReportedWidthRef.current && w > 0) {
                    hasReportedWidthRef.current = true;
                    onMeasuredWidth?.(w);
                }
            }}
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
                        marginLeft: unitMarginLeft,
                    },
                ]}
            >
                g
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

    const isReady = containerHeight != null;

    const [maxItemWidth, setMaxItemWidth] = useState(0);

    const handleItemWidthMeasured = (width: number) => {
        if (width > 0) {
            setMaxItemWidth((prev) => (width > prev ? width : prev));
        }
    };

    // spațiu vertical între cifre (în jurul fontului de bază – cel neselectat)
    const EXTRA_ITEM_SPACING = 4;

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
        selectedHorizontalOffset
    } = React.useMemo(() => {
        const widthScale = screenWidth / DESIGN_WIDTH;

        // 1) Determinăm cât spațiu vertical avem
        const availableHeight = (containerHeight ?? screenHeight) || screenHeight;
        const wheelHeight = availableHeight * MAX_WHEEL_FRACTION;

        // 2) Câte item-uri vrem să fie vizibile aproximativ?
        //    Asta controlează spacing-ul dintre cifrele NEselectate.
        //    Dacă vrei mai compacte => crești la 6–7.
        const TARGET_VISIBLE_ITEMS = 5;
        let itemHeight = wheelHeight / TARGET_VISIBLE_ITEMS;

        // 3) Raportul dintre selected / unselected din Figma (140 / 80)
        const SELECTED_SCALE = FIGMA_SELECTED_SIZE / FIGMA_UNSELECTED_SIZE; // 1.75

        // 4) Limite pentru fontul selectat:
        //    - după înălțime: putem depăși puțin itemHeight pentru că avem padding vizual
        //    - după lățime: permitem să fie ~20% mai mare decât versiunea Figma-scaled
        const MAX_SELECTED_HEIGHT_RATIO = 1; // până la 110% din itemHeight
        const selectedFontMaxByHeight = itemHeight * MAX_SELECTED_HEIGHT_RATIO;

        const selectedFontFromWidth = FIGMA_SELECTED_SIZE * widthScale;
        const selectedFontMaxByWidth = selectedFontFromWidth * 1.2; // +20% față de Figma width-scale

        // font mare final = cel mai mic dintre cele două limite
        const selectedFontSize = Math.min(
            selectedFontMaxByHeight,
            selectedFontMaxByWidth
        );

        // font de bază (unselected) derivat din raportul Figma
        const baseFontSize = selectedFontSize / SELECTED_SCALE;

        // 5) Unit font („g”) – scalat proporțional
        const baseFontFromWidth = FIGMA_UNSELECTED_SIZE * widthScale;
        const unitFontBase = FIGMA_UNIT_SIZE * widthScale;
        const fontScaleFactor = baseFontSize / baseFontFromWidth;
        const unitFontSize = unitFontBase * fontScaleFactor;

        // 6) Padding vertical simetric: item-ul selectat la mijlocul roții
        const verticalPadding = (wheelHeight - itemHeight) / 2;

        // 7) Layout orizontal: scale (SVG) + wheel (numere)
        const SCALE_FRACTION = 0.25; // 25% scale, 75% numere
        const scaleWidth = screenWidth * SCALE_FRACTION;
        const wheelWidth = screenWidth - scaleWidth;

        // 8) Offset orizontal pentru numărul selectat – CALCULAT, nu magic constant
        const DESIRED_OFFSET_FRACTION = 0.10; // vrem cam 10% din wheelWidth
        const SAFE_LEFT_PADDING = 8;

        const desiredOffsetPx = wheelWidth * DESIRED_OFFSET_FRACTION;

        const maxAllowedOffsetPx = Math.max(
            0,
            wheelWidth - maxItemWidth - SAFE_LEFT_PADDING
        );

        const selectedHorizontalOffset = Math.min(desiredOffsetPx, maxAllowedOffsetPx);

        console.log('[DosageSpinner] layout', {
            baseFontSize,
            selectedFontSize,
            unitFontSize,
            itemHeight,
            wheelHeight,
            wheelWidth,
            scaleWidth,
            selectedHorizontalOffset,
        });

        return {
            scaleWidth,
            wheelWidth,
            wheelHeight,
            itemHeight,
            baseFontSize,
            unitFontSize,
            selectedScale: SELECTED_SCALE,
            verticalPadding,
            selectedHorizontalOffset,
        };
    }, [screenWidth, screenHeight, containerHeight, maxItemWidth]);

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

    // scroll inițial la valoarea dorită – doar după ce știm containerHeight-ul real
    useEffect(() => {
        if (hasDoneInitialScroll.current) return;
        if (!listRef.current) return;
        if (!itemHeight || !Number.isFinite(itemHeight)) return;
        if (containerHeight == null) {
            console.log('[DosageSpinner] initialScroll: waiting for containerHeight');
            return;
        }

        const offset = itemHeight * initialIndex;

        console.log('[DosageSpinner] initialScroll', {
            initialIndex,
            itemHeight,
            offset,
            containerHeight,
        });

        listRef.current.scrollToOffset({
            offset,
            animated: false,
        });

        hasDoneInitialScroll.current = true;
    }, [itemHeight, initialIndex, containerHeight]);

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

        // 🔧 Micro-snap: doar pe iOS, doar dacă suntem vizibil între item-uri
        if (Platform.OS === 'ios' && listRef.current && itemHeight > 0) {
            const targetOffset = clamped * itemHeight;
            const delta = Math.abs(offsetY - targetOffset);

            // nu vrem să "corectăm" dacă e practic deja aliniat
            const SNAP_THRESHOLD = itemHeight * 0.5; // 5% din înălțimea itemului

            if (delta > SNAP_THRESHOLD) {
                listRef.current.scrollToOffset({
                    offset: targetOffset,
                    animated: true,
                });
            }
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

                // 1️⃣ Lock-uim containerHeight la PRIMA valoare non-zero
                if (height > 0 && containerHeight == null) {
                    setContainerHeight(height);
                    console.log('📏 Spinner containerHeight (locked):', height, 'screenHeight:', screenHeight);
                }

                // 2️⃣ Lock-uim și Y-ul
                if (containerY == null) {
                    setContainerY(y);
                    console.log('📍 Spinner containerY (locked):', y);
                }
            }}
        >
            {/* Nu randăm nimic până nu avem containerHeight stabil */}
            {!isReady ? null : (
                <>
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
                            decelerationRate={Platform.OS === 'ios' ? 0.993 : 0.979}
                            snapToInterval={itemHeight}
                            snapToAlignment="start"
                            disableIntervalMomentum={false}
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
                                        selectedHorizontalOffset={selectedHorizontalOffset}
                                        itemHeight={itemHeight}
                                        onMeasuredWidth={handleItemWidthMeasured}
                                    />
                                );
                            }}
                        />
                    </View>
                </>
            )}
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
        alignItems: 'baseline',
        justifyContent: 'center',
    },
});

export default DosageSpinner;