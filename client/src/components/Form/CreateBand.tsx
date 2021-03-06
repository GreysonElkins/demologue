import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useQueryClient } from 'react-query'
import { useCreateBand, useAddUserToBand } from 'scripts/api/demologue/mutation/band'
import { useViewer } from 'context/Viewer'
import { useBands } from 'context/Bands'
import { printDropdownOptions } from 'style/form/StyledField'

import StyledField from 'style/form/StyledField'
import Loading from 'style/Icon/Loading'
import Cta from 'style/button/Cta'

import './index.scss'

const CreateBand: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const queryClient = useQueryClient()
  const {
    mutate: createBand,
    isLoading: bandLoading,
    data: band,
    isSuccess: bandSuccess,
    isError: bandIsError,
  } = useCreateBand()
  const {
    mutate: addUserToBand,
    data: bandWithUser,
    isLoading: userLoading,
    isSuccess: userSuccess,
    isError: userIsError,
  } = useAddUserToBand(queryClient)
  const [role, setRole] = useState<string>('MEMBER')
  const { user } = useViewer()
  const { saveGqlBand } = useBands()

  useEffect(() => {
    if (!band?.id || !user || bandIsError) return
    addUserToBand({ role, userId: user.uid, bandId: band.id })
  }, [band])

  useEffect(() => {
    if (!bandWithUser) return
    saveGqlBand(bandWithUser)
  }, [bandWithUser])

  useEffect(() => {
    if (!bandSuccess || !userSuccess || userIsError) return
    toast.success('Your band was created!', { toastId: 'create-band-success' })
    // could be a serious problem here if a band is
    // created but a user doesn't successfully join
    onComplete && onComplete()
  }, [bandSuccess, userSuccess])

  const validationSchema = yup.object().shape({
    name: yup.string().required('Required'),
  })

  const roleOptions = printDropdownOptions([
    { text: 'Member', value: 'MEMBER' },
    { text: 'Producer/Engineer', value: 'SUPPORT' },
  ])

  if (bandLoading || userLoading) return <Loading />

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={async ({ name, role }) => {
        if (!user) return console.error('You need to be logged in!')
        setRole(role)
        await createBand({ name })
      }}
      initialValues={{ name: '', role: 'MEMBER' }}
    >
      <Form className="StyledForm CreateBand">
        <StyledField
          name="name"
          placeholder="The Rolling Stones"
          label="Enter your group's name:"
          required
          tabIndex={1}
        />
        <StyledField
          name="role"
          as="select"
          label="What's your role in the band?"
          tabIndex={1}
          required
        >
          {roleOptions}
        </StyledField>
        <Cta type="submit" tabIndex={1}>
          Save
        </Cta>
      </Form>
    </Formik>
  )
}

export default CreateBand
