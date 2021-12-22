import useModal from 'hooks/useModal'

import Cta from 'style/button/Cta'
import AddBandModal from 'components/Modal/AddBand'

const AddBand: React.FC = () => {
  const { toggle, isOpen, secondOption: skipOptions } = useModal()
  return (
    <>
      <AddBandModal toggle={toggle} isOpen={isOpen} skipOptions={skipOptions} />
      <Cta cta="Two" collapse onClick={() => toggle(false)} icon="plus">
        Add a Band
      </Cta>
    </>
  )
}

export default AddBand
