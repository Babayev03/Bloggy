import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgLogOut = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={26}
    height={26}
    {...props}
  >
    <Path
    //   stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 16.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3.063M11 12h10m0 0-2.5-2.5M21 12l-2.5 2.5"
    />
  </Svg>
)
export default SvgLogOut
