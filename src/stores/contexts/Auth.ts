import type { UserInfo as User } from 'firebase/auth';
import { createContext } from 'react';

export type { User };
export const defaultUser: User = {
  uid: '',
  email: '',
  displayName: '',
  phoneNumber: '',
  photoURL: '',
  providerId: '',
};

interface UserSignIn {
  email: string;
  password: string;
}
export type SignIn = (user: UserSignIn) => Promise<void>;

export type SignOut = () => Promise<void>;

export interface IAuthContext {
  user: User;
  signIn: SignIn;
  signOut: SignOut;
}
export const AuthContext = createContext<IAuthContext>({
  user: defaultUser,
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
});
