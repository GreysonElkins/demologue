import useModal from 'hooks/useModal'

import SignInMenu from 'components/Menu/SignIn'
import Modal from 'components/Modal'
import CtaOne from 'style/button/Cta'

const SignInCta = () => {
  const { isOpen, toggle } = useModal()
  return (
    <>
      <CtaOne data-ico="👤" onClick={toggle}>Sign In</CtaOne>
      <Modal isOpen={isOpen} toggle={toggle}>
        <SignInMenu />
      </Modal>
    </>
  )
}

export default SignInCta
