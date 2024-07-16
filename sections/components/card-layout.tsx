import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '../../utils';
import { useUser } from '../hooks/use-user';
import UserForm from './user-form';

interface CardLayoutProps {}

export function CardLayout({}: CardLayoutProps) {
  const user = useUser();

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription className="flex justify-between">
          <span>Manage your profile information</span>
          {user?.lastUpdated ? <span>updated at: {formatDate(user.lastUpdated)}</span> : null}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  );
}
