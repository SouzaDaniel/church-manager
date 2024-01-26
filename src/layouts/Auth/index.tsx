import { Card } from '@/components/ui/card';

export const Layout: ReactComponent = ({ children }) => (
  <div className="flex min-h-screen justify-center items-center">
    <Card className="max-w-[400px] w-full justify-center items-center">
      {children}
    </Card>
  </div>
);
