import { useEffect, useRef } from 'react'

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
