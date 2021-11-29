import { useState } from 'react'

const useModal = (options?:{ defaultIsOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(options?.defaultIsOpen || false)

  const toggle = () => setIsOpen(prev => !prev)

  return { isOpen, toggle }
}

export default useModal
