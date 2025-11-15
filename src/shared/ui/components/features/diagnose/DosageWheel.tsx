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

    const EXTRA_ITEM_SPACING = 8; // spațiu vertical între cifre

    // determinăm indexul inițial
    const initialIndex = (() => {
        const candidateIndex = values.indexOf(initialValue);
        return candidateIndex === -1 ? 0 : candidateIndex;
    })();

    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const selectedIndexRef = useRef(initialIndex);
    const listRef = useRef<FlatList<number>>(null);

    // înălțimea efectivă măsurată a unui item (folosită pentru calculul scroll-ului)
    const [measuredItemHeight, setMeasuredItemHeight] = useState<number | null>(null);

    // memo pentru toate măsurătorile de layout și font
    const {
        scaleWidth,
        wheelWidth,
        wheelHeight,
        itemHeight,
        selectedFontSize,
        unselectedFontSize,
        unitFontSize,
        verticalPadding,
    } = React.useMemo(() => {
        // scale de lățime raportat la design-ul Figma
        const widthScale = screenWidth / DESIGN_WIDTH;

        const selectedFontBase = FIGMA_SELECTED_SIZE * widthScale;
        const unselectedFontBase = FIGMA_UNSELECTED_SIZE * widthScale;
        const unitFontBase = FIGMA_UNIT_SIZE * widthScale;

        // înălțimea de bază a unui item, derivată din fontul selectat + ceva spațiu
        const baseItemHeight = selectedFontBase + EXTRA_ITEM_SPACING;
        const rawWheelHeight = baseItemHeight * VISIBLE_ITEMS;

        // folosim înălțimea containerului dacă o avem, altfel fallback pe înălțimea ecranului
        const availableHeight = (containerHeight ?? screenHeight) || screenHeight;
        const maxWheelHeight = availableHeight * MAX_WHEEL_FRACTION;

        // dacă roata e prea înaltă, scalăm totul uniform
        const scaleFactor =
            rawWheelHeight > maxWheelHeight
                ? maxWheelHeight / rawWheelHeight
                : 1;

        const itemHeight = baseItemHeight * scaleFactor;
        const wheelHeight = itemHeight * VISIBLE_ITEMS;

        // padding pentru a centra vizual item-ul din mijloc
        const verticalPadding = (wheelHeight - itemHeight) / 2;

        // layout orizontal: fracție pentru scală și restul pentru roată
        const SCALE_FRACTION = 0.25;
        const scaleWidth = screenWidth * SCALE_FRACTION;
        const wheelWidth = screenWidth - scaleWidth;

        return {
            scaleWidth,
            wheelWidth,
            wheelHeight,
            itemHeight,
            selectedFontSize: selectedFontBase * scaleFactor,
            unselectedFontSize: unselectedFontBase * scaleFactor,
            unitFontSize: unitFontBase * scaleFactor,
            verticalPadding,
        };
    }, [screenWidth, screenHeight, containerHeight]);

    // înălțimea efectivă de calcul pentru scroll (folosim cea măsurată dacă există)
    const effectiveItemHeight = measuredItemHeight ?? itemHeight;

    // anunțăm în exterior când se schimbă selecția
    useEffect(() => {
        if (!onChange) return;
        const value = values[selectedIndex];
        if (value != null) {
            onChange(value);
        }
    }, [selectedIndex, onChange, values]);

    // logica de scroll: nu o atingem, doar folosim effectiveItemHeight
    const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const rawIndex = offsetY / effectiveItemHeight;
        const index = Math.round(rawIndex);
        const clamped = Math.max(0, Math.min(index, values.length - 1));

        if (clamped !== selectedIndexRef.current) {
            selectedIndexRef.current = clamped;
            setSelectedIndex(clamped);
        }
    };

    const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        const rawIndex = offsetY / effectiveItemHeight;
        const index = Math.round(rawIndex);
        const clamped = Math.max(0, Math.min(index, values.length - 1));

        if (clamped !== selectedIndexRef.current) {
            selectedIndexRef.current = clamped;
            setSelectedIndex(clamped);
        }
    };

    return (
        <View
            style={[styles.root, { width: screenWidth }]}
            onLayout={(e) => {
                const h = e.nativeEvent.layout.height;
                if (h > 0 && h !== containerHeight) {
                    setContainerHeight(h);
                }
            }}
        >
            {/* Left: meter, ancorat la stânga */}
            <View
                style={[
                    styles.svgContainer,
                    {
                        width: scaleWidth,
                        height: wheelHeight,
                    },
                ]}
            >
                <DosageScaleFrame width={scaleWidth} height={wheelHeight} />
            </View>

            {/* Middle: numeric wheel, centrat în coloana lui */}
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
                    decelerationRate={0.87}
                    onScroll={handleScroll}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                        paddingVertical: verticalPadding,
                    }}
                    getItemLayout={(_, index) => ({
                        length: effectiveItemHeight,
                        offset: effectiveItemHeight * index,
                        index,
                    })}
                    renderItem={({ item, index }) => {
                        const isSelected = index === selectedIndex;

                        // măsurăm înălțimea DOAR pentru primul item
                        const onItemLayout =
                            index === 0
                                ? (event: any) => {
                                    if (measuredItemHeight == null) {
                                        setMeasuredItemHeight(
                                            event.nativeEvent.layout.height,
                                        );
                                    }
                                }
                                : undefined;

                        return (
                            <View style={styles.item} onLayout={onItemLayout}>
                                <Text
                                    style={[
                                        styles.itemText,
                                        {
                                            fontSize: isSelected
                                                ? selectedFontSize
                                                : unselectedFontSize,
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
