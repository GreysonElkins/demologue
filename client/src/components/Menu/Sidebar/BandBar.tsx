import useModal from 'hooks/useModal'

import CreateBand from 'components/Modal/CreateBand'

import Cta from 'style/button/Cta'

const BandBar = () => {
  const { toggle, isOpen } = useModal()
  return (
    <>
      <CreateBand toggle={toggle} isOpen={isOpen} />
      <div className="MenuContents">
        <div>list</div>
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
