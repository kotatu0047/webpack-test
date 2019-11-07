import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import App from './App'

const MyApp = hot(App)

ReactDOM.render(<MyApp />, document.getElementById('root'))
