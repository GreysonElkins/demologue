import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useCreateBand, useAddUserToBand } from 'scripts/api/demologue/mutation/band'
import { useUser } from 'context/User'
import { printDropdwonOptions } from 'style/form/StyledField'

import LineText from 'style/form/StyledField'
import Modal, { ModalProps } from '.'
import Loading from 'style/Icon/Loading'
import Cta from 'style/button/Cta'

import './index.scss'

const CreateBand: React.FC<ModalProps> = (props) => {
  const { mutate: createBand, isLoading: bandLoading, data: bandId, isSuccess: bandSuccess, isError: bandIsError } = useCreateBand()
  const { mutate: addUserToBand, isLoading: userLoading, isSuccess: userSuccess, isError: userIsError } = useAddUserToBand()
  const [role, setRole] = useState<string>("MEMBER")
  const { user } = useUser()

  useEffect(() => {
    if (!bandId || !user || userIsError || bandIsError) return
    addUserToBand({ role, userId: user.uid, bandId })
  }, [bandId])

  useEffect(() => {
    if (!bandSuccess || !userSuccess) return
    props.toggle()
  }, [bandSuccess, userSuccess])

  const validationSchema = yup.object().shape({
    name: yup.string().required('Required'),
  })

  const roleOptions = printDropdwonOptions([
    { text: 'Member', value: 'MEMBER' },
    { text: 'Producer/Engineer', value: 'SUPPORT' },
  ])

  return (
    <Modal {...props}>
      {/* CREATE VS. JOIN 
          This component should be separated from modal
          modal has two options: CREATE, JOIN
          create switches to this form
          JOIN goes to search route
      */}
      {bandLoading || userLoading ? <Loading /> : (
        <Formik
          validationSchema={validationSchema}
          onSubmit={ async ({ name, role }) => {
            if (!user) return console.error('You need to be logged in!')
            setRole(role)
            await createBand({ name })
          }}
          initialValues={{ name: '', role: 'MEMBER' }}
        >
          <Form className="StyledForm CreateBand">
            <LineText
              name="name"
              placeholder="The Rolling Stones"
              label="Enter your group's name:"
              required
            />
            <LineText
              options={[{ text: 'test', value: '1' }]}
              name="role"
              as="select"
              label="What's your role in the band?"
              required
            >
              {roleOptions}
            </LineText>
            <Cta type="submit">Save</Cta>
          </Form>
        </Formik>
      )}
    </Modal>
  )
}

export default CreateBand
