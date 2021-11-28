import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'react-firebaseui'
import auth from 'scripts/auth'

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

const SignIn: React.FC = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
)

export default SignIn
