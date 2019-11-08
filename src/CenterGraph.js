import { animated, useSpring } from 'react-spring'
import React from 'react'
import { r, vh50, vw50, redSkeleton } from './consts'
import { getRadian } from './utility'

const centerGraphMaxHeight = 40
const centerGraphMinHeight = 7
const innerCircleR = Math.floor(r / 3)

/**
 * @param centerGraphItems
 * @param delay
 * @param threshold
 * @param getRotate
 * @returns {React.FunctionComponent}
 */
const CenterGraph = ({ centerGraphItems, delay, threshold, getRotate }) => {
  const centerGraphSpring1 = useSpring({
    delay,
    from: { random: 0, opacity: 0 },
    to: async next => {
      while (true) {
        await next({
          random: Math.random(),
          opacity: 1,
        })
        await next({
          random: 0,
          opacity: 1,
        })
      }
    },
    config: { mass: 2, tension: 4000, friction: 150, clamp: true },
  })

  return (
    <>
      {centerGraphItems.map(angle => {
        return (
          <animated.rect
            key={angle}
            opacity={centerGraphSpring1.opacity}
            width={1}
            height={centerGraphSpring1.random.interpolate(x => {
              const diff = Math.abs(angle - threshold)

              const result = centerGraphMaxHeight * ((30 - diff) / 30) * x

              return result > centerGraphMinHeight
                ? result
                : centerGraphMinHeight
            })}
            x={vw50 + innerCircleR * Math.cos(getRadian(angle))}
            y={vh50 - innerCircleR * Math.sin(getRadian(angle))}
            fill={redSkeleton}
            transform={`rotate(${getRotate(angle)} ${vw50 +
              innerCircleR * Math.cos(getRadian(angle))}  ${vh50 -
              innerCircleR * Math.sin(getRadian(angle))})`}
          />
        )
      })}
    </>
  )
}

export default CenterGraph
