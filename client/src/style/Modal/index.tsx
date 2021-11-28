import React from 'react'
import './Modal.scss'

type Props = {
  isOpen: boolean
  toggle: () => void
}

const Modal: React.FC<Props> = ({ children, isOpen, toggle }) => {
  if (!isOpen) return <></>
  return (
    <div className="overlay" onClick={toggle}>
      <div className="Modal" onClick={(event) => event.stopPropagation()}>
        <button onClick={toggle} className="close-modal" data-ico="ⓧ"/>
        {children}
      </div>
    </div>
  )
}

export default Modal
