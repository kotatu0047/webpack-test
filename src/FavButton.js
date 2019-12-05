import React, { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import _ from 'lodash'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

const safeClearInterval = intervalId => {
  if (typeof intervalId === 'number') clearInterval(intervalId)
}

const safeClearTimeout = timerId => {
  if (typeof timerId === 'number') clearTimeout(timerId)
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef(null)
  const intervalId = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
    safeClearInterval(intervalId.current)
  }, [callback])

  useEffect(() => {
    if (!callback || !delay) return () => safeClearInterval(intervalId.current)

    const tick = () => savedCallback.current()
    intervalId.current = setInterval(tick, delay)

    return () => safeClearInterval(intervalId.current)
  }, [callback, delay])
}

const useTimeout = (callback, delay) => {
  const savedCallback = useRef(null)
  const timerId = useRef(null)

  useEffect(() => {
    savedCallback.current = callback
    safeClearTimeout(timerId.current)
  }, [callback])

  useEffect(() => {
    if (!callback || !delay) return () => safeClearTimeout(timerId.current)

    const tick = () => savedCallback.current()
    timerId.current = setTimeout(tick, delay)

    return () => safeClearTimeout(timerId.current)
  }, [callback, delay])
}

const pink = '#f06292'
const blue = '#42a5f5'
const purple = '#ce93d8'
const teal = '#1de9b6'
const deepPurple = '#7e57c2'

const s = _.range(40).map(v => _.range(40))

const rectsX = [
  [],
  [],
  [],
  [],
  [],
  [4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18],
  [3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [8, 9, 10, 11, 12, 13, 14, 15],
  [9, 10, 11, 12, 13, 14],
  [11, 12],
]

// const lastIndexOfRectsX = rectsX.length - 1

// const useIndexOfFillBorder = () => {
//   const [indexOfFillBorder, setIndexOfFillBorder] = useState(
//     lastIndexOfRectsX + 1,
//   )
//   const [delay, setDelay] = useState(5)
//
//   useInterval(() => {
//     setIndexOfFillBorder(old => old - 1)
//   }, delay)
//
//   useEffect(() => {
//     if (indexOfFillBorder < 0) setDelay(null)
//   }, [indexOfFillBorder])
//
//   return indexOfFillBorder
// }

/**
 * original path by Material-ui/icons
 *      from '@material-ui/icons/FavoriteBorderOutlined'
 * https://material-ui.com/components/material-icons/
 */
const FavButton = () => {
  // const favSpring = useSpring({
  //   delay: 400,
  //   from: { opacity: 1 },
  //   to: async next => {
  //     await next({ opacity: 0 })
  //     await next({ opacity: 1 })
  //   },
  //   config: { mass: 1, tension: 500, friction: 1, clamp: true, duration: 500 },
  // })

  // const [isVisibleFav, setIsVisibleFav] = useState(true)
  // useTimeout(() => setIsVisibleFav(false), 400)
  // useTimeout(() => setIsVisibleFav(true), 700)
  //
  // const [isFill, setIsFill] = useState(false)
  // useTimeout(() => setIsFill(true), 700)

  // const sizeSpring = useSpring({
  //   delay: 200,
  //   from: { size: 2 },
  //   to: async next => {
  //     // await next({ size: 2.5 })
  //     await next({ size: 2 })
  //   },
  //   config: { mass: 1, tension: 1000, friction: 20, clamp: true },
  // })

  const borderY1Spring = useSpring({
    delay: 230,
    from: { y1: 18 },
    to: { y1: 0 },
    config: { mass: 1, tension: 500, friction: 120 },
  })

  const borderY2Spring = useSpring({
    delay: 700,
    from: { y2: 18 },
    to: { y2: 0 },
    config: { mass: 1, tension: 500, friction: 120 },
  })

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
      {rectsX.map((row, index) => {
        return (
          <g fill="red" key={index}>
            {row.map(col => (
              <rect key={col} height={1} width={1} x={col} y={index} />
            ))}
          </g>
        )
      })}

      <path
        d="M16.5 3 c-1.74 0-3.41.81-4.5
            2.09 C 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3 z
            m -4.4 15.55l-.1.1-.1-.1 C 7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5 c 1.54 0 3.04.99 3.57 2.36h1.87 C 13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
      />

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

      {/* right lines */}
      {/* <animated.line */}
      {/*  x1={24} */}
      {/*  y1={borderY1Spring.y1} */}
      {/*  x2={24} */}
      {/*  y2={borderY2Spring.y2} */}
      {/*  stroke={pink} */}
      {/*  strokeWidth="2" */}
      {/* /> */}
      {/* <animated.line */}
      {/*  x1={27} */}
      {/*  y1={borderY1Spring.y1.interpolate(y1 => y1 + 4)} */}
      {/*  x2={27} */}
      {/*  y2={borderY2Spring.y2.interpolate(y2 => y2 + 4)} */}
      {/*  stroke={pink} */}
      {/*  strokeWidth="0.5" */}
      {/* /> */}
      {/* <animated.line */}
      {/*  x1={29} */}
      {/*  y1={borderY1Spring.y1.interpolate(y1 => y1 + 6)} */}
      {/*  x2={29} */}
      {/*  y2={borderY2Spring.y2.interpolate(y2 => y2 + 6)} */}
      {/*  stroke={pink} */}
      {/*  strokeWidth="0.5" */}
      {/* /> */}

      {/* left lines */}
      {/* <animated.line */}
      {/*  x1={0} */}
      {/*  y1={borderY1Spring.y1.interpolate(y1 => y1 + 2)} */}
      {/*  x2={0} */}
      {/*  y2={borderY2Spring.y2.interpolate(y2 => y2 + 2)} */}
      {/*  stroke={pink} */}
      {/*  strokeWidth="0.5" */}
      {/* /> */}
      {/* <animated.line */}
      {/*  x1={-2} */}
      {/*  y1={borderY1Spring.y1} */}
      {/*  x2={-2} */}
      {/*  y2={borderY2Spring.y2} */}
      {/*  stroke={pink} */}
      {/*  strokeWidth="1" */}
      {/* /> */}
      {/* <animated.line */}
      {/*  x1={-4} */}
      {/*  y1={borderY1Spring.y1.interpolate(y1 => y1 + 6)} */}
      {/*  x2={-4} */}
      {/*  y2={borderY2Spring.y2.interpolate(y2 => y2 + 6)} */}
      {/*  stroke={pink} */}
      {/*  strokeWidth="0.5" */}
      {/* /> */}

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
