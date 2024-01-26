import type { AppProps as Props } from 'next/app';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import { Layouts } from '@/layouts';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const App: ReactComponent<Props> = ({ Component, pageProps }) => (
  <Layouts className={cn('font-sans antialiased', inter.variable)}>
    <Component {...pageProps} />
  </Layouts>
);
export default App;
