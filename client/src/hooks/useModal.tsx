import { useState } from 'react'

const useModal = (options?:{ defaultIsOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(options?.defaultIsOpen || false)
  const [secondOption, setSecondOption] = useState<any>(undefined)

  const toggle = (optionalParam?: any) => {
    if (optionalParam !== undefined && secondOption !== optionalParam) {
      setSecondOption(optionalParam)
    } 
    setIsOpen(prev => !prev)
  }

  return { isOpen, toggle, secondOption }
}

export default useModal
