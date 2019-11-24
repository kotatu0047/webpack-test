import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import cookie from 'pocket-cookie'
import _ from 'lodash'
import moment from 'moment'

document.cookie = 'foo=bar'
console.log(cookie.get('foo')) // =>  "bar"

// console.log(_.toNumber('45.56'))
// console.log(_.toNumber(''))
// console.log(_.toNumber('45.56sfsdf'))

console.log('--------------')

console.log(Number('45'))
console.log(Number('-45'))
console.log(Number('45.56'))
console.log(Number('45.56esdfds'))
console.log(Number(''))
console.log(Number('foo'))

const date = new Date(2006, 0, 2, 15, 4, 5)
console.log(date.toDateString())
console.log(date.toJSON())
console.log(date instanceof Date)
console.log(date.toUTCString())

console.log(moment('2013-02-08T09').toISOString())

console.log('moment(')

console.log(
  moment('2013-02-08T09')
    .toDate()
    .toUTCString(),
)

console.log(moment('20130208T080910,123').toISOString())
console.log(moment('2013-02-08 24:00:00.000').toISOString())
console.log(moment('2013-02-08 09+07:00').toISOString())
console.log(moment('Tue, 01 Nov 2016 01:23:45 UT').isValid())
console.log(
  moment(
    '(Init Comment) Tue,\\n 1 Nov              2016 (Split\\n Comment)  07:23:45 +0000 (GMT)',
  ).isValid(),
)
console.log(moment(date).isValid())

console.log(JSON.parse('[ 123 , "foo" , true , null]'))

if ('false') {
  console.log('moment(date).isValid()')
}

if ('true') {
  console.log('moment(date).isValid()')
}

// console.log(JSON.parse('undefined'))
// console.log(JSON.parse('foobarbaz'))
// console.log(JSON.parse('[{ "str" : "foo" } , { "str" : "bar" }]'))

const App = () => <h1>hello</h1>

const MyApp = hot(App)

const bool = false

ReactDOM.render(<MyApp />, document.getElementById('root'))
