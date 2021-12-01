import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useModal from 'hooks/useModal'
import { useViewer } from 'context/Viewer'
import { useBands } from 'context/Bands'

import Band from 'types/Band'
import AddBand from 'components/Modal/AddBand'

import Cta from 'style/button/Cta'

const BandBar = () => {
  const { toggle, isOpen, secondOption: skipOptions } = useModal()
  const { user } = useViewer()
  const userBands = useMemo(() => user?.bandIds() || [], [JSON.stringify(user)])
  const { bands } = useBands(userBands)

  const ListItem = ({ id, name }: Band) =>
    <li key={`user-band-list-${id}`}>
      <Link to={`/band/${id}`}>{name}</Link>
    </li>

  const printBands = Object.values(bands).reduce((ui, band) => {
      if (band && userBands?.includes(band.id)) ui.push(ListItem(band))
      return ui
    }, [] as JSX.Element[])

  return (
    <>
      <AddBand toggle={toggle} isOpen={isOpen} skipOptions={skipOptions} />
      <div className="MenuContents">
        {userBands && userBands.length === 0 && (
          <div className="no-items">
            It looks like you don't have any bands <br />{' '}
            <Link to="/search-bands">join a band</Link> or{' '}
            <i
              tabIndex={0}
              onClick={() => toggle(true)}
              onKeyDown={(event) => {
                if (event.code === "Enter") toggle(true)
              }}
            >
              start a new one
            </i>
          </div>
        )}
        {userBands && userBands.length > 0 && <ul>{printBands}</ul>}
        <div className="bottom">
          <Cta cta="Two" ico="➕" className="CtaTwo collapse" onClick={() => toggle(false)}>
            Add a Band
          </Cta>
        </div>
      </div>
    </>
  )
}

export default BandBar
