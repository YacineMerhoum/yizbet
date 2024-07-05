import { initializeApp } from "firebase/app";
import { getAuth , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBaMF-M5hIvkXmfde_eQ1H0YBM09st6wxU",

  authDomain: "yizbet-374aa.firebaseapp.com",

  projectId: "yizbet-374aa",

  storageBucket: "yizbet-374aa.appspot.com",

  messagingSenderId: "635767763257",

  appId: "1:635767763257:web:ca27e2a15222cc47f2b8e8",

  measurementId: "G-RGPYCTGMF9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
  prompt : "select_account "
});
 
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export { auth, analytics };
