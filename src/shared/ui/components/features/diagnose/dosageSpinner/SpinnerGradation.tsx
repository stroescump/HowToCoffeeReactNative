// SpinnerGradation.tsx
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type DosageScaleFrameProps = {
  width?: number;
  height?: number;
};

const DESIGN_WIDTH = 112;
const DESIGN_HEIGHT = 618;

export const SpinnerGradation: React.FC<DosageScaleFrameProps> = ({
  width = DESIGN_WIDTH,
  height = DESIGN_HEIGHT,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      // foarte important: păstrăm coordonatele originale
      viewBox={`0 0 ${DESIGN_WIDTH} ${DESIGN_HEIGHT}`}
    >
      <G id="Meter Gradation">
        <Path d="M16 198H55C55.5523 198 56 198.448 56 199C56 199.552 55.5523 200 55 200H16V198Z" fill="#010101" />
        <Path d="M16 220H55C55.5523 220 56 220.448 56 221C56 221.552 55.5523 222 55 222H16V220Z" fill="#010101" />
        <Path d="M16 242H55C55.5523 242 56 242.448 56 243C56 243.552 55.5523 244 55 244H16V242Z" fill="#010101" />
        <Path d="M16 264H55C55.5523 264 56 264.448 56 265C56 265.552 55.5523 266 55 266H16V264Z" fill="#010101" />
        <Path d="M16 286H55C55.5523 286 56 286.448 56 287C56 287.552 55.5523 288 55 288H16V286Z" fill="#010101" />
        <Path d="M16 308H95C95.5523 308 96 308.448 96 309C96 309.552 95.5523 310 95 310H16V308Z" fill="#010101" />
        <Path d="M16 330H55C55.5523 330 56 330.448 56 331C56 331.552 55.5523 332 55 332H16V330Z" fill="#010101" />
        <Path d="M16 352H55C55.5523 352 56 352.448 56 353C56 353.552 55.5523 354 55 354H16V352Z" fill="#010101" />
        <Path d="M16 374H55C55.5523 374 56 374.448 56 375C56 375.552 55.5523 376 55 376H16V374Z" fill="#010101" />
        <Path d="M16 396H55C55.5523 396 56 396.448 56 397C56 397.552 55.5523 398 55 398H16V396Z" fill="#010101" />
        <Path d="M16 418H55C55.5523 418 56 418.448 56 419C56 419.552 55.5523 420 55 420H16V418Z" fill="#010101" />
      </G>
    </Svg>
  );
};