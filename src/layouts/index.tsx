import type { HTMLAttributes } from 'react';

import { Layout as Base } from './Base';

export const Layouts: ReactComponent<HTMLAttributes<HTMLDivElement>> = ({
  children = undefined,
  ...props
}) => {
  let layout: ReactNode;

  return <Base {...props}>{layout ?? children}</Base>;
};
