'use client';

import Image from 'next/image';
import { useContext, type FormEvent } from 'react';

import { AuthContext } from '@/stores/contexts/Auth';

import logo from '@/assets/images/logos/x-white.png';

import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Page: ReactComponent = () => {
  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    await signIn({
      email: 'daniel@email.com',
      password: 'Teste@123',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Image {...logo} alt="Logo" />
      <CardHeader className="space-y-1">
        <CardDescription>Insira suas credenciais para entrar</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            defaultValue="daniel@email.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" defaultValue="D3v@full" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Entrar</Button>
      </CardFooter>
    </form>
  );
};
export default Page;
