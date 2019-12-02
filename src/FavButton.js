import React, { useEffect, useRef, useState } from 'react'
import { animated } from 'react-spring'
import _ from 'lodash'
import { red, redSkeleton } from './consts'

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
]

/**
 * original path by Material-ui/icons
 *      from '@material-ui/icons/FavoriteBorderOutlined'
 * https://material-ui.com/components/material-icons/
 */
const FavButton = () => {
  return (
    <svg className="svg-root">
      {rectsX.map((row, index) => {
        return (
          <g fill="red" key={index}>
            {row.map(col => (
              <rect width={1} height={1} x={col} y={index} />
            ))}
          </g>
        )
      })}

      <path
        d="M16.5 3 c-1.74 0-3.41.81-4.5
            2.09 C 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3 z
            m -4.4 15.55l-.1.1-.1-.1 C 7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5 c 1.54 0 3.04.99 3.57 2.36h1.87 C 13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
      />

      {s.map((row, index) => {
        return (
          <g fill="none" stroke="red" strokeWidth={0.1} key={index}>
            {row.map(col => (
              <rect width={1} height={1} x={col} y={index} />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

export default FavButton
