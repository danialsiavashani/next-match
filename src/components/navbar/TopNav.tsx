import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import { GiMatchTip } from 'react-icons/gi';
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';

export default async function TopNav() {
  const session = await auth();
  return (
    <div>
      <Navbar
        maxWidth="xl"
        className="bg-gradient-to-r from-purple-400 to-purple-700"
        classNames={{
          item: [
            'text-xl',
            'text-whit',
            'uppercase',
            'data-[active=true]:text-yellow-200',
          ],
        }}
      >
        <NavbarBrand as={Link} href="/">
          <GiMatchTip size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Next</span>
            <span className="text-gray-200">Match</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavLink href="/members" label="matches" />
          <NavLink href="/lists" label="Lists" />
          <NavLink href="/messages" label="messages" />
        </NavbarContent>

        <NavbarContent justify="end">
          {session?.user ? (
            <>
              <h1 className="text-xl capitalize text-white">
                {session.user.name}
              </h1>
              <UserMenu user={session.user} />
            </>
          ) : (
            <>
              <Button
                variant="bordered"
                className="text-white"
                as={Link}
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="bordered"
                className="text-white"
                as={Link}
                href="/register"
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
