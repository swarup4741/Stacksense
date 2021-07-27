import 'firebase/storage';

import { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import Link from 'next/link';

import { Avatar } from '@chakra-ui/avatar';
import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';

import FilesCount from '../../components/FilesCount';
import Meta from '../../partials/meta';
import { useAuth } from '../../lib/auth';

const user = () => {
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState(null);
  const toast = useToast();
  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');

  useEffect(() => {
    if (profile) {
      firebase
        .storage()
        .ref(`${auth.user.uid}/profile/profile_pic`)
        .put(profile)
        .on(
          'state_changed',
          null,
          (err) => {
            toast({
              title: 'An Error Occured !',
              description: err.message,
              duration: 9000,
              isClosable: true,
              status: 'error',
            });
          },
          async () => {
            const img_url = await firebase
              .storage()
              .ref(`${auth.user.uid}/profile/profile_pic`)
              .getDownloadURL();

            auth.user.updateProfile({
              displayName: auth.user.name,
              photoURL: img_url,
            });

            toast({
              title: 'Profile photo updated successfully',
              status: 'success',
              duration: 6000,
              isClosable: true,
            });
          }
        );
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-dashbg via-cardbg to-indigo-darker px-6 flex items-center justify-center">
      {auth.user ? (
        <>
          <Meta
            title={`Stacksense | Account Settings - ${auth.user.displayName}`}
          />
          <div className="flex flex-col items-center text-center space-y-8 py-8">
            <div className="flex flex-col md:flex-row md:gap-8 items-center">
              <Box position="relative" maxWidth="fit-content ">
                <Avatar
                  color="rgba(170, 139, 255)"
                  loading="lazy"
                  src={
                    profile ? URL.createObjectURL(profile) : auth.user.photoURL
                  }
                  name={auth.user.displayName}
                  bgGradient="linear(to-tl,#0B0B1F,#240068)"
                  shadow="dark-lg"
                  size="2xl"
                />
                <form className="mt-6 absolute bottom-0 right-0">
                  <label>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) => setProfile(e.target.files[0])}
                    />
                    <IconButton
                      borderRadius="full"
                      border="solid"
                      borderColor="purple.400"
                      bg="#141429"
                      pointerEvents="none"
                      icon={<EditIcon color="#AA8BFF" />}
                    />
                  </label>
                </form>
              </Box>
              <div className="flex flex-col items-center">
                <p className="text-2xl md:text-4xl text-indigo-light font-bold mt-4">
                  {auth.user.displayName}
                </p>
                <p className="text-indigo md:text-xl font-bold">
                  {auth.user.email}
                </p>
              </div>
            </div>

            {auth.user && <FilesCount userId={auth.user.uid} />}

            <div className="w-full max-w-xs md:max-w-full flex flex-col md:flex-row items-center md:gap-6">
              <a className="form-btn cursor-pointer" onClick={onOpen}>
                Change password
              </a>
              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                  bgGradient="linear(to-tr,#0B0B1F,#0A0A26,rgba(36, 0, 104))"
                  mx={4}
                >
                  <ModalHeader color="#AA8BFF">
                    Change your Password
                  </ModalHeader>
                  <ModalCloseButton _focus={{ outline: 'none' }} />
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();

                      const userCred = auth.userCredentials(
                        auth.user.email,
                        oldPass
                      );

                      if (await auth.reAuthwithCredentials(userCred)) {
                        auth.user.updatePassword(newPass).then(() => {
                          toast({
                            title: 'Password updated successfully',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                          });
                          onClose();
                        });
                      }
                    }}
                  >
                    <ModalBody pb={6}>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="password"
                          isRequired
                          placeholder="Current password"
                          focusBorderColor="purple.400"
                          onChange={(e) => setOldPass(e.target.value)}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <Input
                          autoComplete="off"
                          type="password"
                          isRequired
                          placeholder="New password"
                          focusBorderColor="purple.400"
                          onChange={(e) => setNewPass(e.target.value)}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        type="submit"
                        bg="#7442FF"
                        color="white"
                        mr={3}
                        _focus={{ outine: 'none' }}
                        _focusWithin={{
                          outline: 'none',
                        }}
                        _hover={{ bg: 'purple.600' }}
                        _active={{ bg: 'purple.700' }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={onClose}
                        _focus={{ outine: 'none' }}
                        _focusWithin={{
                          outline: 'none',
                        }}
                        _hover={{ bg: 'red' }}
                        _active={{ bg: 'red.600' }}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>

              <Link href={'/' + auth.user.uid}>
                <a className="form-btn cursor-pointer mt-4 md:mt-0">
                  Back to drive
                </a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner size="xl" color="purple.400" />
        </div>
      )}
    </div>
  );
};

export default user;
