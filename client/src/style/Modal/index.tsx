import React from 'react'
import './Modal.scss'

type Props = {
  isOpen: boolean
  toggle: () => void
}

const Modal: React.FC<Props> = ({ children, isOpen, toggle }) => {
  if (!isOpen) return <></>
  return (
    <div className="overlay">
      <div className="Modal" onClick={(event) => event.stopPropagation()}>
        <button onClick={toggle} className="close-modal">
          x
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
