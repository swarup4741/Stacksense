import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Spinner } from '@chakra-ui/spinner';

import { Dashboard } from '../../components/Dashboard';
import Filegrid from '../../components/Filegrid';
import Meta from '../../partials/meta';
import { useAuth } from '../../lib/auth';

const userDrive = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push(`/signin`);
    }
  }, [auth.user]);

  return (
    <div className="bg-black min-h-screen relative">
      {auth.user ? (
        <div>
          <Meta title={`Stacksense | Drive - ${auth.user.displayName}`} />
          <Dashboard />
          <Filegrid userId={auth.user.uid} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" color="purple.500" />
        </div>
      )}
    </div>
  );
};

export default userDrive;
