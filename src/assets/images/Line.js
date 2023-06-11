import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View} from 'react-native';

const SvgLine = props => (
  <View style={{width: 100, height: 1}}>
    <Svg width={100} height={15} viewBox="0 0 132 15" {...props}>
      <Path stroke="#000" d="M0 .5h132" />
    </Svg>
  </View>
);
export default SvgLine;
