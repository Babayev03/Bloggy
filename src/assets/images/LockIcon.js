import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgLock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Rect width={16} height={10} x={4} y={11} rx={2} ry={2} />
      <Path d="M16.5 11V8h0c0-2.8-.5-5-4.5-5S7.5 5.2 7.5 8h0v3" />
    </G>
  </Svg>
)
export default SvgLock
