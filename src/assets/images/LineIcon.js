import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLine = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    transform="rotate(90)"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 21V3"
    />
  </Svg>
);
export default SvgLine;
