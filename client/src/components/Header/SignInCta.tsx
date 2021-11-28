import { useState } from 'react'

import SignInMenu from 'components/Menu/SignIn'
import Modal from 'style/Modal'
import CtaOne from 'style/button/CtaOne'

const SignInCta = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)
  return (
    <>
      <CtaOne onClick={toggleOpen}>Sign In</CtaOne>
      <Modal isOpen={isOpen} toggle={toggleOpen}>
        <SignInMenu />
      </Modal>
    </>
  )
}

export default SignInCta
