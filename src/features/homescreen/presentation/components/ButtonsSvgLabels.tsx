import React from "react";
import { Text as SvgText, TSpan } from "react-native-svg";

export type ButtonLabelConfig = {
  label: string;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  letterSpacing?: number;
  uppercase?: boolean;
  lineHeight?: number;
};

export type BuiltLabel = {
  lines: string[];
  fontSize: number;
  fontFamily: string;
  fill: string;
  letterSpacing: number;
  lineHeight: number;
};

export type LabelPosition = {
  x: number;
  y: number;
};

export function buildLabelFromText(
  text: string,
  config: ButtonLabelConfig | undefined,
): BuiltLabel {
  const lines = text.split("\n");

  const fontSize = config?.fontSize ?? 20;
  const lineHeight = config?.lineHeight ?? fontSize;

  return {
    lines,
    fontSize,
    fontFamily: config?.fontFamily ? config?.fontFamily : "",
    fill: config?.fill ?? "#000000",
    letterSpacing: config?.letterSpacing ?? 0,
    lineHeight,
  };
}

export function renderLabel(
  built: BuiltLabel,
  pos: LabelPosition,
  keyPrefix: string,
) {
  const linesCount = built.lines.length;
  const totalHeight = (linesCount - 1) * built.lineHeight;

  const baselineCorrection = built.fontSize * 0.25;

  const startY = pos.y - totalHeight / 2 + baselineCorrection;

  return (
    <SvgText
      x={pos.x}
      y={startY}
      fontSize={built.fontSize}
      fontFamily={built.fontFamily}
      fill={built.fill}
      textAnchor="middle"
      letterSpacing={built.letterSpacing}
    >
      {built.lines.map((line, idx) => (
        <TSpan
          key={`${keyPrefix}-${idx}`}
          x={pos.x}
          y={startY + idx * built.lineHeight}
        >
          {line}
        </TSpan>
      ))}
    </SvgText>
  );
}
