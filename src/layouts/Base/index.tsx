import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;
export const Layout: ReactComponent<Props> = ({
  children = undefined,
  ...props
}) => <div {...props}>{children}</div>;
