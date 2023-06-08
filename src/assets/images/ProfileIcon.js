import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <G stroke="#000" strokeWidth={2}>
      <Path d="M17 8A5 5 0 1 1 7 8a5 5 0 0 1 10 0Z" />
      <Path
        strokeLinecap="round"
        d="M3 21c.957-3.076 3.42-4 9-4s8.043.924 9 4"
      />
    </G>
  </Svg>
)
export default SvgComponent
