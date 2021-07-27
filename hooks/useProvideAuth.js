import 'firebase/auth';

import { useEffect, useState } from 'react';

import firebase from 'firebase/app';

import { useToast } from '@chakra-ui/toast';

const useProvideAuth = () => {
  const toast = useToast();
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        toast({
          title: 'Signed in Successfully.',
          duration: 9000,
          isClosable: true,
          status: 'success',
        });

        return response.user;
      })
      .catch((err) => {
        toast({
          title: 'An Error Ocuured !',
          description: err.message,
          duration: 9000,
          isClosable: true,
          status: 'error',
        });
      });
  };

  const signup = (email, password, name) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user
          .updateProfile({
            displayName: name,
            photoURL: '',
          })
          .then(() => {
            setUser(response.user);
            firebase
              .auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                toast({
                  title: 'Created your account Successfully.',
                  duration: 9000,
                  isClosable: true,
                  status: 'success',
                  onCloseComplete: () => {
                    toast({
                      title: 'Account verification email has been sent',
                      description:
                        'Verify your account by clicking on the link provided to you by stacksense',
                      duration: '12000',
                      isClosable: true,
                      status: 'info',
                    });
                  },
                });
                return response.user;
              })
              .catch((err) => {
                toast({
                  title: 'An Error Ocuured !',
                  description: err.message,
                  duration: 9000,
                  isClosable: true,
                  status: 'error',
                });
              });
          })
          .catch((err) => {
            toast({
              title: 'An Error Ocuured !',
              description: err.message,
              duration: 9000,
              isClosable: true,
              status: 'error',
            });
          });
      })
      .catch((err) => {
        toast({
          title: 'An Error Ocuured !',
          description: err.message,
          duration: 9000,
          isClosable: true,
          status: 'error',
        });
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        toast({
          title: 'Signed out Successfully.',
          duration: 9000,
          isClosable: true,
          status: 'success',
        });

        return true;
      });
  };
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast({
          title: 'Email sent successfully.',
          description:
            'Password reset email sent successfully. Check your email for further updates',
          duration: 9000,
          isClosable: true,
          status: 'success',
        });
        return true;
      })
      .catch((err) => {
        toast({
          title: 'An Error Ocuured !',
          description: err.message,
          duration: 9000,
          isClosable: true,
          status: 'error',
        });
      });
  };
  const userCredentials = (email, password) => {
    return firebase.auth.EmailAuthProvider.credential(email, password);
  };
  const reAuthwithCredentials = (credential) => {
    return firebase
      .auth()
      .currentUser.reauthenticateWithCredential(credential)
      .then(() => {
        return true;
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          toast({
            title: 'Password change failure !',
            description: 'Current password is not correct',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'An error occured !',
            description: err.message,
            duration: 9000,
            status: 'error',
            isClosable: true,
          });
        }
      });
  };
  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    userCredentials,
    reAuthwithCredentials,
    confirmPasswordReset,
  };
};

export default useProvideAuth;
