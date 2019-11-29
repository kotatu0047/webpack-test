import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import FavButton from './FavButton'

const MyApp = hot(FavButton)

ReactDOM.render(<MyApp />, document.getElementById('root'))
