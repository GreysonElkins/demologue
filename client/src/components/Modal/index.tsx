import React from 'react'
import './index.scss'

export type ModalProps = {
  isOpen: boolean
  toggle: () => void
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, toggle }) => {
  if (!isOpen) return <></>
  return (
    <div className="overlay" onClick={toggle}>
      <div className="Modal" onClick={(event) => event.stopPropagation()}>
        <button onClick={toggle} className="close-modal" data-ico="ⓧ" tabIndex={1}/>
        {children}
      </div>
    </div>
  )
}

export default Modal
