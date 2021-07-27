import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/react';

import { Header } from '../components/Header';
import Meta from '../partials/meta';
import { useAuth } from '../lib/auth';

const signup = () => {
  const auth = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user) {
      router.push(`/${auth.user.uid}`);
      return;
    }
  }, [auth.user]);

  return (
    <>
      <Meta title="Stacksense | Sign up" />

      <div className="min-h-screen w-screen absolute top-0 bg-black flex justify-center items-center px-6">
        <div className="max-w-sm px-6 py-8 mt-8">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const USER = await auth.signup(email, pass, name);
              setLoading(USER ? true : false);
            }}
            className="space-y-4 flex flex-col flex-wrap items-center min-w-full mx-auto"
          >
            <h1 className="form-head text-center whitespace-nowrap">
              Create your account in
              <Link href="/">
                <span className=" flex text-indigo-light mt-1 items-center cursor-pointer">
                  <img src="/assets/logo.svg" className="h-8 mr-1 ml-2" />
                  Stacksense
                </span>
              </Link>
            </h1>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name..."
              focusBorderColor="purple.400"
              isRequired
              color="#AA8BFF"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Enter your email..."
              focusBorderColor="purple.400"
              isRequired
              value={email}
              color="#AA8BFF"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password..."
                focusBorderColor="purple.400"
                isRequired
                value={pass}
                color="#AA8BFF"
                autoComplete="off"
                onChange={(e) => setPass(e.target.value)}
              />
              <InputRightElement cursor="pointer">
                {show ? (
                  <ViewIcon
                    color="#AA8BFF"
                    fontSize="lg"
                    onClick={() => setShow(false)}
                  />
                ) : (
                  <ViewOffIcon
                    color="#AA8BFF"
                    fontSize="lg"
                    onClick={() => setShow(true)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <Button
              bg="rgba(116, 66, 255)"
              w="full"
              fontWeight="semibold"
              _focus={{ outline: 'none' }}
              _hover={{ bg: 'rgba(85, 48, 190)' }}
              _active={{ bg: 'rgba(85, 48, 190)' }}
              isLoading={loading}
              loadingText="Signing up..."
              type="submit"
            >
              Sign up
            </Button>
            <p className="text-center">
              Already have an account?{' '}
              <Link href="/signin">
                <a className="text-indigo-light pl-1 hover:underline">
                  Sign in
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
