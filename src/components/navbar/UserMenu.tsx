'use client';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { Session } from 'next-auth';
import { links } from '@/utils/links';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { signOutUser } from '@/app/actions/authActions';
import { transformImageUrl } from '@/lib/util';

type Props = {
  userInfo: { name: string | null; image: string | null } | null;
};
export default function UserMenu({ userInfo }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={userInfo?.name || 'user avatar'}
          size="sm"
          src={transformImageUrl(userInfo?.image) || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        {/* <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            className="h-14 flex-row capitalize"
            aria-label="username"
          >
            {user?.name}
          </DropdownItem>
        </DropdownSection> */}
        <DropdownSection showDivider>
          {links.map((link) => {
            return (
              <DropdownItem isReadOnly key={link.href} aria-label="username">
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownItem>
            );
          })}
        </DropdownSection>
        <DropdownItem color="danger" onClick={() => signOutUser()}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
