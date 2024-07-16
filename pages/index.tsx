import { NextPage } from 'next';
import { AccountLayout } from '../layouts/account';
import { CardLayout } from '../sections/components/card-layout';

interface PageProps {}

const ProfilePage: NextPage<PageProps> = ({}) => {
  return <CardLayout />;
};

ProfilePage.getLayout = (page) => <AccountLayout>{page}</AccountLayout>;

export default ProfilePage;
