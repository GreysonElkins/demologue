import { useMemo } from 'react'
import { useViewer } from 'context/Viewer'
import { useBands } from 'context/Bands'

const useViewerBands = () => {
  const { user } = useViewer()
  const userBands = useMemo(() => user?.bandIds() || [], [JSON.stringify(user)])
  const { match } = useBands(userBands)
  return ({ bands: match, viewer: user, bandIds: userBands })
}

export default useViewerBands
