import React from 'react'
import _ from 'lodash'
import { animated, useSpring } from 'react-spring'
import { getRadian } from './utility'
import {
  blue,
  deepPink,
  deepPurple,
  deepTeal,
  pink,
  purple,
  teal,
} from './consts'

const getColor = angle => {
  switch (angle) {
    case 0:
      return pink
    case 50:
      return blue
    case 100:
      return purple
    case 150:
      return teal
    case 200:
      return deepPurple
    case 250:
      return deepPink
    case 300:
      return deepTeal
    default:
      return pink
  }
}

const lineLength = 2
const fireworksAngles = _.range(7).map(v => v * 50)
const fire1CenterX = 0
const fire1CenterY = 0
const fire2CenterX = 22
const fire2CenterY = 17
const fire3CenterX = 5
const fire3CenterY = 22

const useFireworksSpring = delay => {
  return useSpring({
    delay,
    from: {
      inner: 0,
      outer: 2,
    },
    to: {
      inner: 10,
      outer: 10,
    },
    config: {
      mass: 10,
      tension: 1000,
      friction: 20,
      clamp: true,
    },
  })
}

const Fireworks = () => {
  const spring1 = useFireworksSpring(600)
  const spring2 = useFireworksSpring(800)
  const spring3 = useFireworksSpring(1000)

  return (
    <>
      {fireworksAngles.map(angle => {
        const radian = getRadian(angle)

        return (
          <React.Fragment key={angle}>
            <animated.line
              className="firework1"
              x1={spring1.inner.interpolate(
                v => fire1CenterX + (v + lineLength) * Math.cos(radian),
              )}
              y1={spring1.inner.interpolate(
                v => fire1CenterY + (v + lineLength) * Math.sin(radian),
              )}
              x2={spring1.outer.interpolate(
                v => fire1CenterX + (v + lineLength) * Math.cos(radian),
              )}
              y2={spring1.outer.interpolate(
                v => fire1CenterY + (v + lineLength) * Math.sin(radian),
              )}
              stroke={getColor(angle)}
              strokeWidth="1"
            />
            <animated.line
              className="firework2"
              x1={spring2.inner.interpolate(
                v => fire2CenterX + (v + lineLength) * Math.cos(radian),
              )}
              y1={spring2.inner.interpolate(
                v => fire2CenterY + (v + lineLength) * Math.sin(radian),
              )}
              x2={spring2.outer.interpolate(
                v => fire2CenterX + (v + lineLength) * Math.cos(radian),
              )}
              y2={spring2.outer.interpolate(
                v => fire2CenterY + (v + lineLength) * Math.sin(radian),
              )}
              stroke={getColor(angle)}
              strokeWidth="1"
            />
            <animated.line
              className="firework3"
              x1={spring3.inner.interpolate(
                v => fire3CenterX + (v + lineLength) * Math.cos(radian),
              )}
              y1={spring3.inner.interpolate(
                v => fire3CenterY + (v + lineLength) * Math.sin(radian),
              )}
              x2={spring3.outer.interpolate(
                v => fire3CenterX + (v + lineLength) * Math.cos(radian),
              )}
              y2={spring3.outer.interpolate(
                v => fire3CenterY + (v + lineLength) * Math.sin(radian),
              )}
              stroke={getColor(angle)}
              strokeWidth="1"
            />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Fireworks
