import type { HTMLAttributes } from 'react';

import { useRouter } from 'next/router';

import { Layout as Base } from './Base';
import { Layout as Auth } from './Auth';

export const Layouts: ReactComponent<HTMLAttributes<HTMLDivElement>> = ({
  children = undefined,
  ...props
}) => {
  const { route: path } = useRouter();

  let layout: ReactNode = children;

  if (path.startsWith('/auth')) layout = <Auth>{children}</Auth>;

  return <Base {...props}>{layout}</Base>;
};
