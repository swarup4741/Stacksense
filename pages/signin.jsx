import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { Header } from '../components/Header';
import Meta from '../partials/meta';
import { useAuth } from '../lib/auth';

const signin = () => {
  const auth = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [resetEmail, setResetEmail] = useState('');

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
      <Meta title="Stacksense | Sign in" />

      <div className="min-h-screen w-screen absolute top-0 bg-black flex justify-center items-center">
        <div className="max-w-sm px-6 py-8 mt-8">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const USER = await auth.signin(email, pass);
              setLoading(USER ? true : false);
            }}
            className="space-y-4 flex flex-col items-center min-w-full"
          >
            <h1 className="form-head whitespace-nowrap">
              Welcome back to
              <Link href="/">
                <span className="flex text-indigo-light mt-1 items-center cursor-pointer">
                  <img src="/assets/logo.svg" className="h-8 mr-1" />
                  Stacksense
                </span>
              </Link>
            </h1>

            <Input
              type="email"
              autoComplete="off"
              placeholder="Enter your email..."
              focusBorderColor="purple.400"
              color="#AA8BFF"
              isRequired
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                autoComplete="off"
                placeholder="Enter your password..."
                focusBorderColor="purple.400"
                color="#AA8BFF"
                isRequired
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
              loadingText="Signing in..."
              type="submit"
            >
              Sign in
            </Button>
            <a
              className="text-indigo-light cursor-pointer text-sm"
              onClick={onOpen}
            >
              Forgot your password ?
            </a>
            <p className="text-center">
              Need an account?{' '}
              <Link href="/signup">
                <a className="text-indigo-light pl-1 hover:underline">
                  Sign up
                </a>
              </Link>
            </p>
          </form>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent bg="#0B0B1F" mx={4} boxShadow="dark-lg">
              <ModalHeader>Email for Password Reset</ModalHeader>
              <ModalCloseButton _focus={{ outline: 'none' }} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  auth.sendPasswordResetEmail(resetEmail);
                  onClose();
                }}
              >
                <ModalBody pb={2}>
                  <FormControl>
                    <Input
                      placeholder="your email id"
                      type="email"
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    bg=""
                    color="white"
                    mr={3}
                    bg="rgba(116, 66, 255)"
                    _focusWithin={{ outline: 'none' }}
                  >
                    Reset Password
                  </Button>
                  <Button
                    _hover={{ bg: 'red' }}
                    _focusWithin={{
                      outline: 'none',
                      ring: 'none',
                    }}
                    _active={{ bg: 'red.400' }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default signin;
