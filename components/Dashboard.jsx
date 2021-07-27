import Link from 'next/link';

import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

import { useAuth } from '../lib/auth';
import UploadForm from './Upload';

export const Dashboard = () => {
  const auth = useAuth();

  return (
    <div className="flex justify-between items-center sticky top-0 z-40 bg-dashbg shadow-lg px-5 py-3">
      <Menu autoSelect={false}>
        <MenuButton style={{ outline: 'none' }}>
          <Avatar
            src={auth.user.photoURL}
            name={auth.user.displayName}
            bg="purple.500"
            color="white"
          />
        </MenuButton>

        <MenuList bg="#0B0B1F" color="#AA8BFF">
          <Link href={'/' + auth.user.uid + '/user'}>
            <MenuItem _focus={{ outline: 'none', bg: '#141429' }}>
              Account settings
            </MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem
            _focus={{ outline: 'none', bg: '#141429' }}
            onClick={() => {
              auth.signout();
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
      {auth.user && <UploadForm userId={auth.user.uid} />}
    </div>
  );
};
