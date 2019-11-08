import { animated } from 'react-spring'
import React from 'react'
import { r, vh50, vw50 } from './consts'

const circumference = r * 2 * Math.PI

const circlePath = `M ${vw50},${vh50 - r}
a ${r} ${r} 0 0 1 0,${r * 2}
a ${r} ${r} 0 0 1 0,-${r * 2}`

const Meter = ({ percentage, color }) => {
  return (
    <animated.path
      strokeWidth="5"
      strokeDasharray={percentage.interpolate(x => {
        if (x <= 100) {
          return ` ${(circumference / 100) * x} , ${circumference -
            (circumference / 100) * x} `
        }
        if (x <= 200) {
          return `0 , ${(circumference / 100) * (x - 100)} , ${circumference -
            (circumference / 100) * (x - 100)} `
        }

        return `${(circumference / 100) * (x - 200)} , ${circumference -
          (circumference / 100) * (x - 200)} `
      })}
      stroke={color}
      fill="none"
      d={circlePath}
    />
  )
}

export default Meter
