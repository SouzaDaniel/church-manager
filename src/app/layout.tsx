import { Inter } from 'next/font/google';

import { AuthProvider } from '@/stores/providers/Auth';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const Layout: ReactComponent = ({ children }) => (
  <html lang="pt-br">
    <body className={cn('font-sans antialiased', inter.variable)}>
      <AuthProvider>{children}</AuthProvider>
    </body>
  </html>
);
export default Layout;
