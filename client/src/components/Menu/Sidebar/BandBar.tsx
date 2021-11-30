import useModal from 'hooks/useModal'
import { useUser } from 'context/User'
import { getBandsByUser } from 'scripts/api/demologue/query/band'

import CreateBand from 'components/Modal/CreateBand'

import Cta from 'style/button/Cta'
import Loading from 'style/Icon/Loading'

const BandBar = () => {
  const { toggle, isOpen } = useModal()
  const { user } = useUser()
  const { status, data, isFetching } = getBandsByUser(user?.uid)

  const printBands = () =>
    data.map(({ band }: any, i: number) => <li key={`user-band-${i}`}>{band.name}</li>)

  return (
    <>
      <CreateBand toggle={toggle} isOpen={isOpen} />
      <div className="MenuContents">
        { isFetching && <Loading /> } 
        {/* it'd be cool to do a graphic on the selection bar for loading instead */}
        { status === "success" && data.length === 0 && (
          <div className="no-items">It looks like you don't have any bands - <i>join a band</i> or <i>start a new one</i></div>
        )}
        { data?.length > 0 && <ul>{printBands()}</ul>}
        <div className="bottom">
          <Cta cta="Two" ico="➕" className="CtaTwo collapse" onClick={toggle}>
            Add a Band 
          </Cta>
        </div>
      </div>
    </>
  )
}

export default BandBar
