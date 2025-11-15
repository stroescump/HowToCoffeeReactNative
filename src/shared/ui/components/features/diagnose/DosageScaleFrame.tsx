// ScaleMeterFrame.tsx
import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const DosageScaleFrame = (props: { width?: number; height?: number }) => {
  const { width = 200, height = 400 } = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 428 618"
    >
      <Defs>
        <ClipPath id="clip0_292_327">
          <Rect width="428" height="618" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0_292_327)">
        {/* === Paste ONLY the static stuff here === */}
        {/* This is your <g id="Meter Gradation"> block */}
        <G id="Meter Gradation">
          <Path d="M16 198H55C55.5523 198 56 198.448 56 199C56 199.552 55.5523 200 55 200H16V198Z" fill="#010101" />
          <Path d="M16 220H55C55.5523 220 56 220.448 56 221C56 221.552 55.5523 222 55 222H16V220Z" fill="#010101" />
          <Path d="M16 242H55C55.5523 242 56 242.448 56 243C56 243.552 55.5523 244 55 244H16V242Z" fill="#010101" />
          {/* …all the other gradation paths… */}
        </G>

        {/* If you have other static decor, put it here too.
           DO NOT paste the "7 grams / 8 grams / …" text paths. */}
      </G>
    </Svg>
  );
};