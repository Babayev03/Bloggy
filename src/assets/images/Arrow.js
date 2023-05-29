import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      // stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.25 12.274h15M10.3 18.299l-6.05-6.024L10.3 6.25"
    />
  </Svg>
);
export default SvgArrow;