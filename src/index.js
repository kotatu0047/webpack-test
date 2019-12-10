import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { Button } from 'react-lamunanimation-buttons'
import FavButton from './FavButton'

const Dom = () => {
  const handle = () => alert('fdsads')

  return (
    <div>
      <Button onClick={handle} text="fdgdsafds" />
    </div>
  )
}

const MyApp = hot(Dom)

ReactDOM.render(<MyApp />, document.getElementById('root'))
