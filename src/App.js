import React, { useState } from 'react'
import { useSpring, animated, useTrail } from 'react-spring'
import _ from 'lodash'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { vh, vw } from './utility'

const value = 40
const titleStr = 'Multitude Meter'

const mainColor = 'rgb(29 ,233 ,192)' // 29 233 192
const mainColorSkeleton = 'rgba(88,255,223,0.8)' // 29 233 192
const subColor = 'rgba(4 ,93 ,86)' //  '#045D56' // 4 93 86
const subColorLite = '#04d7d0' // 4 93 86

const titleBgColor = 'rgba(207, 216, 220 , 0.3)'

const vh50 = Math.floor(vh(50))
const vh100 = Math.floor(vh(100))
const vw50 = Math.floor(vw(50))
const vw100 = Math.floor(vw(100))

const bgPointsSideSpacing = Math.floor(vw100 / 10)
const bgPointsVerticalSpacing = Math.floor(vh100 / 10)

const r = vw(10)
const circumference = r * 2 * Math.PI

const circlePath = `M ${vw50},${vh50 - r}
a ${r} ${r} 0 0 1 0,${r * 2}
a ${r} ${r} 0 0 1 0,-${r * 2}`

const titleOpacityParams = {
  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.9, 1],
  output: [1, 0.2, 1, 0.2, 1, 0.2, 1, 0.2, 1],
}

const outlineRectX1 = vw50 * 0.5 - 10
const outlineRectY1 = vh50 * 0.4 - 10
const outlineHeight = vh50 * 1.1 + 20
const outlineWidth = vw50 + 20
const outlineRectX2 = outlineRectX1 + outlineWidth
const outlineRectY2 = outlineRectY1 + outlineHeight

const graphData = [40, 80, 75, 45, 65, 42, 99, 88]

const MainMeter = ({ percentage, color }) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default function App() {
  // TODO 関数の外に出す
  const [bgPoints, setBgPoints] = useState(_.range(20).map(arr => _.range(20)))
  const trail = useTrail(bgPoints.length, {
    delay: 2000,
    from: { opacity: 0, spacing: 1 },
    to: async next => {
      await next({
        opacity: 1,
        spacing: 1,
      })
      await next({
        opacity: 1,
        spacing: 0.5,
      })
    },
    config: { mass: 5, tension: 2000, friction: 200 },
  })

  const titleBgSpring = useSpring({
    from: {
      width: 0,
    },
    to: {
      width: vw50,
    },
    config: {
      mass: 5,
      tension: 2000,
      friction: 200,
      clamp: true,
    },
  })

  const titleSpring = useSpring({
    from: {
      length: 0,
    },
    to: {
      length: titleStr.length,
    },
    config: {
      mass: 100,
      tension: 1000,
      friction: 200,
      clamp: true,
    },
  })

  const titleOpacitySpring = useSpring({
    delay: 1000,
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      mass: 100,
      tension: 500,
      friction: 200,
      clamp: true,
    },
  })

  const outlineSpring = useSpring({
    from: {
      leftHeight: 0,
      rightHeight: 0,
      topWidth: 0,
      bottomWidth: 0,
    },
    to: async next => {
      await next({
        leftHeight: outlineHeight,
        rightHeight: 0,
        topWidth: 0,
        bottomWidth: 0,
      })
      await next({
        leftHeight: outlineHeight,
        rightHeight: 0,
        topWidth: 0,
        bottomWidth: outlineWidth,
      })
      await next({
        leftHeight: outlineHeight,
        rightHeight: outlineHeight,
        topWidth: 0,
        bottomWidth: outlineWidth,
      })
      await next({
        leftHeight: outlineHeight,
        rightHeight: outlineHeight,
        topWidth: outlineWidth,
        bottomWidth: outlineWidth,
      })
    },
    config: {
      mass: 100,
      tension: 2000,
      friction: 200,
      clamp: true,
    },
  })

  const graphTrail = useTrail(graphData.length, {
    from: { x: 0 },
    to: async next => {
      while (true) {
        await next({
          x: 100,
        })
        await next({
          x: 10,
        })
      }
    },
    config: { mass: 2, tension: 1000, friction: 50 },
  })

  const spring = useSpring({
    delay: 5000,
    from: {
      mainPercentage: 0,
      subPercentage: 0,
      bgPercentage: 0,
      text: 0,
    },
    to: async next => {
      await next({
        mainPercentage: 100,
        subPercentage: 0,
        bgPercentage: 0,
        text: 0,
      })
      await next({
        mainPercentage: 200 + value,
        subPercentage: value,
        bgPercentage: 100,
        text: value,
      })
      await next({
        mainPercentage: 300,
        subPercentage: value,
        bgPercentage: 100,
        text: value,
      })
    },
    config: {
      mass: 10,
      tension: 30,
      friction: 20,
      clamp: true,
    },
  })

  return (
    <svg className="svg-root">
      <defs />
      {trail.map(({ opacity, spacing }, i) => {
        const itemValue = bgPoints[i]

        return itemValue.map(point => {
          return (
            <animated.circle
              key={i * 100 + point}
              opacity={opacity}
              cx={spacing.interpolate(
                x => 20 + point * (bgPointsSideSpacing * x),
              )}
              cy={spacing.interpolate(
                x => 20 + i * (bgPointsVerticalSpacing * x),
              )}
              r="1"
              stroke="none"
              fill="#fff"
            />
          )
        })
      })}
      <animated.rect
        width={titleBgSpring.width}
        height={50}
        fill={titleBgColor}
        x={titleBgSpring.width.interpolate(x => vw50 - x / 2)}
        y={vh50 * 0.4}
        stroke="none"
        strokeWidth="none"
      />
      <animated.path
        d={titleBgSpring.width.interpolate(
          x =>
            `M ${vw50 + x / 2 - 10} ${vh50 * 0.4 + 5} L ${vw50 +
              x / 2 -
              20} ${vh50 * 0.4 + 5} L ${vw50 + x / 2 - 10} ${vh50 * 0.4 +
              15} Z`,
        )}
        opacity={titleOpacitySpring.opacity
          .interpolate(titleOpacityParams)
          .interpolate(x => x)}
        fill="black"
      />
      <animated.text
        opacity={titleOpacitySpring.opacity
          .interpolate(titleOpacityParams)
          .interpolate(x => x)}
        stroke="none"
        fill={mainColor}
        fontSize="30"
        x={vw50 - 100}
        y={vh50 * 0.4 + 40}
      >
        {titleSpring.length.interpolate(x => titleStr.substr(0, x))}
      </animated.text>

      {/* 周りの四角 */}
      <animated.path
        d={outlineSpring.leftHeight.interpolate(
          x =>
            `M ${outlineRectX1} ${outlineRectY1} L ${outlineRectX1} ${x +
              vh50 * 0.4 -
              10}  Z`,
        )}
        strokeWidth="1"
        stroke="white"
        fill="none"
      />
      <animated.path
        d={outlineSpring.bottomWidth.interpolate(
          x =>
            `M ${outlineRectX1} ${outlineRectY2} L ${x +
              vw50 * 0.5 -
              10} ${outlineRectY2}  Z`,
        )}
        strokeWidth="1"
        stroke="white"
        fill="none"
      />
      <animated.path
        d={outlineSpring.rightHeight.interpolate(
          x =>
            `M  ${outlineRectX2} ${outlineRectY2} L ${outlineRectX2} ${vh50 *
              1.5 +
              10 -
              x}  Z`,
        )}
        strokeWidth="1"
        stroke="white"
        fill="none"
      />
      <animated.path
        d={outlineSpring.topWidth.interpolate(
          x =>
            `M  ${outlineRectX2} ${outlineRectY1} L ${vw50 * 1.5 +
              10 -
              x} ${outlineRectY1}  Z`,
        )}
        strokeWidth="1"
        stroke="white"
        fill="none"
      />

      {graphTrail.map(({ x }, i) => {
        const itemValue = graphData[i]

        return (
          <animated.rect
            key={itemValue}
            width={5}
            height={x.interpolate(v => v + itemValue)}
            x={200 + i * 20}
            y={200}
            stroke="none"
            fill="#fff"
          />
        )
      })}

      {/* メーター */}
      <MainMeter color="white" percentage={spring.bgPercentage} />
      <MainMeter color={mainColor} percentage={spring.mainPercentage} />
      <MainMeter color={subColor} percentage={spring.subPercentage} />

      {/* パーセンテージをテキストで表示 */}
      <animated.text
        stroke="none"
        fill={mainColor}
        fontSize="20"
        className="text-flash"
        x={spring.text.interpolate(x => {
          if (x === 0) {
            return vw50 - 55
          }

          if (x === value) {
            return vw50 + r / 2 - 50
          }

          return vw50 - r / 2 - 50
        })}
        y={vh50}
      >
        {spring.text.interpolate(x => {
          if (x === 0) {
            return 'Now Loading...'
          }

          return x
        })}
      </animated.text>
      <text
        stroke="none"
        fill={mainColor}
        fontSize="20"
        x={vw50 + r / 2}
        y={vh50}
      >
        / 100
      </text>
    </svg>
  )
}
