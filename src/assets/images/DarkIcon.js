import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SvgDarkIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="100"
    height="100"
    viewBox="0 0 64 64"
    {...props}>
    <G fill="#231F20">
      <Path d="M32 0C18.745 0 8 10.746 8 24c0 9.843 5.928 18.297 14.406 22h19.188C50.072 42.297 56 33.843 56 24 56 10.746 45.255 0 32 0zm9 26a1 1 0 0 1-1-1 2 2 0 0 0-4 0v19h-2V25a2 2 0 0 0-4 0v19h-2V25a2 2 0 0 0-4 0 1 1 0 1 1-2 0 4 4 0 0 1 4-4c1.201 0 2.267.541 3 1.38.733-.839 1.799-1.38 3-1.38s2.267.541 3 1.38A3.974 3.974 0 0 1 38 21a4 4 0 0 1 4 4 1 1 0 0 1-1 1zm4-13c-.742.742-1.687-.313-1.687-.313A15.946 15.946 0 0 0 32 8a1 1 0 1 1 0-2c4.971 0 9.471 2.015 12.729 5.271 0 0 1.013.987.271 1.729zM26 64h12c2.211 0 4-1.789 4-4H22c0 2.211 1.789 4 4 4zM22 48.004V52h20v-4H22zM22 54h20v4H22z" />
    </G>
  </Svg>
);
export default SvgDarkIcon;
