import {
  type ReactNode,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

import { auth } from '@/lib/firebase/config';

import {
  AuthContext,
  type IAuthContext,
  type SignIn,
  type User,
  defaultUser,
} from '@/stores/contexts/Auth';

export const AuthProvider: ReactComponent = ({ children }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<User>({ ...defaultUser });

  const mounted = useRef(false);

  useEffect(() => {
    const handle = setInterval(
      async () => {
        const newUser = auth.currentUser;

        if (newUser) await newUser.getIdToken(true);
      },
      10 * 60 * 1000,
    );

    return () => {
      clearInterval(handle);
    };
  }, []);

  const signIn: SignIn = useCallback(
    async ({ email, password }) => {
      const { user: newUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      setUser({ ...newUser });

      const { 'redirect-auth': redirectAuth = '/app' } =
        parseCookies(undefined);

      await push(redirectAuth);
    },
    [push],
  );

  const signOut = useCallback(async () => {
    await auth.signOut();

    await push('/auth/signin');
  }, [push]);

  useEffect(
    () =>
      auth.onIdTokenChanged(async (newUser) => {
        try {
          if (!newUser) {
            setUser({ ...defaultUser });
            destroyCookie(undefined, 'token', { path: '/' });
          } else {
            const token = parseCookies(undefined, {
              path: '/',
            })?.token;

            const newToken = await newUser.getIdToken();

            if (!token && !mounted.current) {
              await auth.signOut();
            } else {
              setCookie(undefined, 'token', newToken, { path: '/' });
            }
          }
        } finally {
          if (!mounted.current) mounted.current = true;
        }
      }),
    [],
  );

  const value: IAuthContext = useMemo(
    () => ({ signIn, user, signOut }),
    [signIn, user, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
