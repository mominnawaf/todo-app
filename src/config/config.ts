import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";


const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSI,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);