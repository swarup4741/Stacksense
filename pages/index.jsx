import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Spinner } from '@chakra-ui/spinner';

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import Meta from '../partials/meta';
import { useAuth } from '../lib/auth';

const Home = () => {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const redirect = () => {
      if (auth.user) {
        setLoading(true);
        router.push(`/${auth.user.uid}`);
      }
    };

    redirect();
  }, [auth.user]);

  return !loading ? (
    <div className="bg-black min-h-screen">
      <Meta title="Stacksense | carry your essentials" />
      <Header />
      <Hero />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Spinner size="xl" color="purple.400" />
    </div>
  );
};

export default Home;
