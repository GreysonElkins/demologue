import { useState, useEffect } from 'react'

const useHideTabs = ({ limit, moreThan }:{ limit: number, moreThan?: boolean}) => {
  const [beyondLimit, setBeyondLimit] = useState<boolean>(false)

  useEffect(() => {
    if (moreThan && window.outerWidth > limit && !beyondLimit) setBeyondLimit(true)
    if (moreThan && window.outerWidth < limit && beyondLimit) setBeyondLimit(false)

    if (!moreThan && window.outerWidth < limit && !beyondLimit) setBeyondLimit(true)
    if (!moreThan && window.outerWidth > limit && beyondLimit) setBeyondLimit(false)
  }, [window.outerWidth])

  return {
    tabIndex: beyondLimit ? -1 : 0
  }
}

export default useHideTabs