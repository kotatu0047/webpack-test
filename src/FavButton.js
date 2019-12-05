import React, { useCallback, useState } from 'react'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import FillFavIcon from './FillFavIcon'
import BorderFavIcon from './BorderFavIcon'
import Fireworks from './Fireworks'
import { black, blue, deepPink, pink } from './consts'

/**
 * original path by Material-ui/icons
 *      from '@material-ui/icons/FavoriteBorderOutlined'
 * https://material-ui.com/components/material-icons/
 */
const FavButton = () => {
  const [isHover, setIsHover] = useState(false)
  const handleMouseOver = useCallback(() => setIsHover(true), [setIsHover])
  const handleMouseOut = useCallback(() => setIsHover(false), [setIsHover])

  const [toggle, setToggle] = useState(false)
  const handleClick = useCallback(() => setToggle(v => !v), [setToggle])

  return (
    // TODO jsx-a11y/mouse-events-have-key-events
    //   花火
    // 大きさ指定 small madame leary  (任意のfontsize)
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <svg
        className="svg-root"
        focusable
        role="img"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fontSize="2rem"
      >
        {!toggle && <BorderFavIcon color={isHover ? pink : black} />}
        {toggle && <FillFavIcon color={isHover ? deepPink : pink} />}

        {toggle && (
          <>
            <circle
              className="ripple"
              strokeWidth={5}
              stroke={blue}
              fill="none"
              cx={12}
              cy={10}
              r={7}
            />
            <circle
              className="ripple"
              strokeWidth={1}
              stroke={blue}
              fill="none"
              cx={12}
              cy={10}
              r={15}
            />
          </>
        )}

        {toggle && <Fireworks />}
      </svg>
    </div>
  )
}

export default FavButton
