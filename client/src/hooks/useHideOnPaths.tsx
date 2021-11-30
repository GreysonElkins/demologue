import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useUser } from 'context/User'

type Options = {
  paths?: string[]
  authRequired?: boolean
  otherFlags?: boolean[]
}

const useHideOnPaths = ({ paths, authRequired, otherFlags }: Options) => {
  // is it worth adding a warning if all options are undefined or empty arrays?
  const badPaths = useState<boolean>(false)
  const badFlags = useState<boolean>(false)
  const state = useState<any>("test")

  const { signedIn } = useUser()
  const { pathname } = useLocation()

  const checkFlags = useCallback((flag: boolean, state: Array<any>) => {
    if (flag && !state[0]) state[1](true)
    if (!flag && state[0]) state[1](false)
  }, [])

  useEffect(() => {
    console.log({ state })
    if (!paths) return
    const matchedPath = paths.some((path) => pathname.includes(path))
    checkFlags(matchedPath, badPaths)
  }, [pathname, paths])

  useEffect(() => {
    if (!otherFlags) return
    const hideFlag = otherFlags.some(flag => !!flag)
    checkFlags(hideFlag, badFlags)
  }, [otherFlags])

  return { isHidden: badPaths[0] || badFlags[0] || (authRequired && !signedIn) }
}

export default useHideOnPaths
