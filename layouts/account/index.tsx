import { Toaster } from '@/components/ui/toaster';
import { useUser } from '../../sections/hooks/use-user';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AccountLayout({ children }: AppLayoutProps) {
  const user = useUser();

  return (
    <div className="w-full">
      <header className="flex justify-end items-center px-4 py-2 border-b border-gray-200 shadow-sm">
        <div>Welcome {user?.username}</div>
      </header>
      <div className="flex-1 px-4 py-8">{children}</div>
      <Toaster />
    </div>
  );
}
