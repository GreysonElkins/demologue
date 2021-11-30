import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal, { ModalProps } from '.'
import CreateBand from 'components/Form/CreateBand'
import Cta from 'style/button/Cta'

import './index.scss'

interface Props extends ModalProps {
  skipOptions?: boolean
}

const AddBand: React.FC<Props> = ({ skipOptions = false, ...props }) => {
  const [isCreate, setIsCreate] = useState<boolean>(skipOptions)

  useEffect(() => {
    if (typeof skipOptions === 'boolean' && isCreate !== skipOptions) 
      setIsCreate(skipOptions)
  }, [skipOptions])

  return (
    <Modal {...props}>
      {isCreate ? (
        <CreateBand onComplete={props.toggle} />
      ) : (
        <div className="add-band-buttons">
          <Cta onClick={() => setIsCreate(true)} tabIndex={1}>
            Create A Band
          </Cta>
          <Link to="/search-bands" tabIndex={-1}>
            <Cta tabIndex={1} onClick={props.toggle}>
              Join an Existing Band
            </Cta>
          </Link>
        </div>
      )}
    </Modal>
  )
}

export default AddBand
