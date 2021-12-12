import { Link } from 'react-router-dom'
import useModal from 'hooks/useModal'
import useViewerBands from 'hooks/useViewerBands'

import AddBand from 'components/Modal/AddBand'
import AddBandCta from 'components/Cta/AddBand'

const BandBar = () => {
  const { toggle, isOpen, secondOption: skipOptions } = useModal()
  const { bands } = useViewerBands()

  if (!bands) return <></>
  
  const printBands = bands.map(({ id, name }) => (
    <li key={`user-band-list-${id}`}>
      <Link to={`/band/${id}`}>{name}</Link>
    </li>
  ))

  return (
    <>
      <AddBand toggle={toggle} isOpen={isOpen} skipOptions={skipOptions} />
      <div className="MenuContents">
        {bands.length === 0 && (
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
        {bands.length > 0 && <ul>{printBands}</ul>}
        <div className="bottom">
          <AddBandCta />
        </div>
      </div>
    </>
  )
}

export default BandBar
