import { Link } from 'react-router-dom'
import useModal from 'hooks/useModal'
import { useUser } from 'context/Viewer'
import { getBandsByUser } from 'scripts/api/demologue/query/band'

import AddBand from 'components/Modal/AddBand'

import Cta from 'style/button/Cta'
import Loading from 'style/Icon/Loading'

const BandBar = () => {
  const { toggle, isOpen, secondOption: skipOptions } = useModal()
  const { user } = useUser()
  const { status, data, isFetching } = getBandsByUser(user?.uid)

  const printBands = () =>
    data.map(({ band: { id, name } }: any, i: number) => (
      <li key={`user-band-${i}`}>
        <Link to={`/band/${id}`}>{name}</Link>
      </li>
    ))

  return (
    <>
      <AddBand toggle={toggle} isOpen={isOpen} skipOptions={skipOptions} />
      <div className="MenuContents">
        {isFetching && <Loading />}
        {/* it'd be cool to do a graphic on the selection bar for loading instead */}
        {status === 'success' && data.length === 0 && (
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
        {data?.length > 0 && <ul>{printBands()}</ul>}
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
