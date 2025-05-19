import { EMAIL_LOCAL_STORAGE_KEY } from "../consts/local-storage-keys";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  getRedirectResult,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSendLinkToEmail = async (email: string) => {
  try {
    const actionCodeSettings = {
      url: location.href,
      handleCodeInApp: true,
    };

    localStorage.setItem(EMAIL_LOCAL_STORAGE_KEY, email);
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  } catch(error) {
    console.error(error);
  }
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user: User = result.user;

  return user;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser!, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser!, {
    url: `${window.location.origin}/home`,
  });
};

export const getEmailFromStorage = () => {
  return window.localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY);
}

export const signInWithEmail = async (email: string, href: string) => {
  try {
    await signInWithEmailLink(auth, email, href);
    clearEmailFromStorage();
  } catch(error) {
    console.error(error);
  }
}

export const getFirebaseRedirectResult = async () => {
  return getRedirectResult(auth);
}

const clearEmailFromStorage = () => {
  window.localStorage.removeItem(EMAIL_LOCAL_STORAGE_KEY);
}
