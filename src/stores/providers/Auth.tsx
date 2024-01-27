'use client';

import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

import { auth } from '@/lib/firebase/config';

import {
  AuthContext,
  type IAuthContext,
  type SignIn,
  type User,
  defaultUser,
} from '@/stores/contexts/Auth';

export const AuthProvider: ReactComponent = ({ children }) => {
  const router = useRouter();

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

      router.push(redirectAuth);
    },
    [router],
  );

  const signOut = useCallback(async () => {
    await auth.signOut();

    router.push('/auth/signin');
  }, [router]);

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
