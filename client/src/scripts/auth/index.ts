import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getAnalytics } from "firebase/analytics"

const {
  REACT_APP_FIRE_API_KEY: api_key,
  REACT_APP_FIRE_PROJECT_ID: project_id,
  REACT_APP_FIRE_APP_ID: app_id,
  REACT_APP_FIRE_SENDER_ID: sender_id,
} = process.env

const config = {
  apiKey: api_key,
  authDomain: `${project_id}.firebaseapp.com`,
  databaseURL: `https://${project_id}.firebaseio.com`,
  projectId: project_id,
  storageBucket: `${project_id}.appspot.com`,
  messagingSenderId: sender_id,
  appId: app_id,
}

const app = firebase.initializeApp(config)
getAnalytics(app) 

const auth = firebase.auth()

export default auth
