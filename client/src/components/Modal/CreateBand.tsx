import { Formik, Form } from 'formik'
import * as yup from 'yup'
import BandMutations from 'scripts/api/demologue/mutation/band'
import { useUser } from 'context/User'

import LineText from 'style/form/LineText'
import Modal, { ModalProps } from '.'
import Cta from 'style/button/Cta'

import './index.scss'

const CreateBand: React.FC<ModalProps> = (props) => {
  const { startBand } = BandMutations()
  const { user } = useUser()

  const validationSchema = yup.object().shape({
    name: yup.string().required('Required'),
  })

  // ask for user's role - "MUSICIAN | SUPPORT: PRODUCER/ENGINEER | GUEST (guest shouldn't be possible at this point)"

  // const onSubmit = () => {
  // try
  // name is part of primary key, can throw error
  // create a band on DB
  // get new id back
  // create a relationship b/w user and band AND assign role (guest shouldn't be possible at this point)
  // }

  return (
    <Modal {...props}>
      {/* CREATE VS. JOIN 
          This component should be separated from modal
          modal has two options: CREATE, JOIN
          create switches to this form
          JOIN goes to search route
      */}
      <Formik
        validationSchema={validationSchema}
        onSubmit={({ name }) => {
          if (!user) return console.error('You need to be logged in!')
          startBand({ name, userId: user.id, role: 'MEMBER' })
        }}
        initialValues={{ name: '' }}
      >
        <Form className="StyledForm CreateBand">
          <LineText
            name="name"
            placeholder="The Rolling Stones"
            label="Enter your group's name:"
            required
          />
          <Cta>Save</Cta>
        </Form>
      </Formik>
    </Modal>
  )
}

export default CreateBand
