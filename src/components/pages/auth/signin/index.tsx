import Image from 'next/image';
import { Fragment } from 'react';

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

export const Page: ReactComponent = () => (
  <Fragment>
    <Image {...logo} alt="Logo" />
    <CardHeader className="space-y-1">
      <CardDescription>Insira suas credenciais para entrar</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" placeholder="m@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" />
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Entrar</Button>
    </CardFooter>
  </Fragment>
);
