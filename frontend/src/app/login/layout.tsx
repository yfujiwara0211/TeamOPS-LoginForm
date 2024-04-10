import * as React from 'react';
import { LoginUserProvider } from '@/components/LoginUserProvider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <LoginUserProvider>{children}</LoginUserProvider>;
};

export default Layout;