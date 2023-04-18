import { ApiServices } from './../apiService';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
  User,
  FacebookAuthProvider
} from 'firebase/auth';
import Cookies from 'universal-cookie';
import { LoginProps, RegisterProps } from './types';
import { setCookies } from '../../common/utils';
import { UsersEntity } from '../../common/types/entites/user.entity';

const firebaseConfig = {
  apiKey: 'AIzaSyAZ657kB90rt8oCQHUh_VQCeHGN_Id0Sd4',
  authDomain: 'eventsconfirmation-a90a6.firebaseapp.com',
  projectId: 'eventsconfirmation-a90a6',
  storageBucket: 'eventsconfirmation-a90a6.appspot.com',
  messagingSenderId: '1047429704226',
  appId: '1:1047429704226:web:19800fd6e8b0414d54387b'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithFacebook = async () => {
  try {
    const response = await signInWithPopup(auth, facebookProvider);

    setCookies(
      'token',
      await response.user.getIdToken(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()
    );
    const timeHourString: string = new Date(Date.now() + 360000)
      .getTime()
      .toString();

    setCookies(
      'token-time',
      timeHourString,
      new Date(Date.now() + 360000).getTime()
    );
    return await new ApiServices().loginOrRegister({
      firstName: response.user.displayName
    });
  } catch (error) {
    throw new Error(error);
  }
};

const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);

    setCookies(
      'token',
      await response.user.getIdToken(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()
    );
    const timeHourString: string = new Date(Date.now() + 360000)
      .getTime()
      .toString();

    setCookies(
      'token-time',
      timeHourString,
      new Date(Date.now() + 360000).getTime()
    );

    return await new ApiServices().loginOrRegister({
      firstName: response.user.displayName
    });
  } catch (error) {
    throw new Error(error);
  }
};

const logInWithEmailAndPassword = async ({ email, password }: LoginProps) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    setCookies(
      'token',
      await response.user.getIdToken(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()
    );
    const timeHourString: string = new Date(Date.now() + 360000)
      .getTime()
      .toString();

    setCookies(
      'token-time',
      timeHourString,
      new Date(Date.now() + 360000).getTime()
    );
    return await new ApiServices().loginOrRegister();
  } catch (err) {
    throw new Error(err);
  }
};

const registerWithEmailAndPassword = async ({
  firstName: name,
  email,
  password
}: RegisterProps): Promise<UsersEntity> => {
  try {
    const response: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    setCookies(
      'token',
      await response.user.getIdToken(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime()
    );
    const timeHourString: string = new Date(Date.now() + 360000)
      .getTime()
      .toString();

    setCookies(
      'token-time',
      timeHourString,
      new Date(Date.now() + 360000).getTime()
    );
    return await new ApiServices().loginOrRegister({
      firstName: name
    });
  } catch (err) {
    throw new Error(err);
  }
};

export {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle
};
