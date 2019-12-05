import React from 'react'
import { animated, useSpring } from 'react-spring'
import _ from 'lodash'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import FillFavIcon from './FillFavIcon'
import { blue } from './consts'

const s = _.range(40).map(v => _.range(40))

/**
 * original path by Material-ui/icons
 *      from '@material-ui/icons/FavoriteBorderOutlined'
 * https://material-ui.com/components/material-icons/
 */
const FavButton = () => {
  const innerCircleSpring = useSpring({
    delay: 500,
    from: { r: 0, strokeWidth: 3 },
    to: async next => {
      await next({ r: 5, strokeWidth: 3 })
      await next({ r: 5, strokeWidth: 0 })
    },
    config: { mass: 1, tension: 300, friction: 20, clamp: true },
  })

  const outerCircleSpring = useSpring({
    delay: 600,
    from: { r: 0, strokeWidth: 1 },
    to: async next => {
      await next({ r: 15, strokeWidth: 1 })
      await next({ r: 15, strokeWidth: 0 })
    },
    config: { mass: 1, tension: 300, friction: 20, clamp: true },
  })

  return (
    <animated.svg
      className="svg-root"
      focusable
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fontSize="2rem"
    >
      <FillFavIcon />

      <animated.circle
        strokeWidth={innerCircleSpring.strokeWidth}
        stroke={blue}
        fill="none"
        cx={12}
        cy={10}
        r={innerCircleSpring.r}
      />
      <animated.circle
        strokeWidth={outerCircleSpring.strokeWidth}
        stroke={blue}
        fill="none"
        cx={12}
        cy={10}
        r={outerCircleSpring.r}
      />

      {s.map((row, index) => {
        return (
          <g fill="none" stroke="red" strokeWidth={0.1} key={index}>
            {row.map(col => (
              <rect width={1} height={1} x={col} y={index} key={col} />
            ))}
          </g>
        )
      })}
    </animated.svg>
  )
}

export default FavButton
