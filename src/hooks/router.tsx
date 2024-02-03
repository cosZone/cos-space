import { Button } from '@/components/ui/button';
import { routers } from '@/constants/router';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { CgDarkMode } from 'react-icons/cg';
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { useToggleTheme } from './theme';

const SignedIn = dynamic(() => import('@clerk/nextjs').then((mod) => mod.SignedIn));
const SignedOut = dynamic(() => import('@clerk/nextjs').then((mod) => mod.SignedOut));
const UserButton = dynamic(() => import('@clerk/nextjs').then((mod) => mod.UserButton));
const SignInButton = dynamic(() => import('@clerk/nextjs').then((mod) => mod.SignInButton));

export const useNavItems = () => {
  const toggleTheme = useToggleTheme();
  const buttons = useMemo(
    () => [
      {
        key: 'Github',
        icon: <AiFillGithub className="h-8 w-8 cursor-pointer" />,
        onClick: () => window?.open('https://github.com/cosZone/cos-space', '_blank'),
      },
      {
        key: 'CgDarkMode',
        icon: <CgDarkMode className="h-8 w-8 cursor-pointer" />,
        onClick: toggleTheme,
      },
      {
        key: 'User',
        icon: (
          <>
            <SignedIn key="user-info">
              <div className="pointer-events-auto flex h-10 w-full items-center justify-center">
                <div className="relative">
                  <UserButton afterSignOutUrl={'/'} />
                  <FaUserCircle className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background" />
                </div>
              </div>
            </SignedIn>
            <SignedOut key="sign-in">
              <SignInButton mode="modal" redirectUrl={'/'}>
                <Button className="gap-1">
                  登录
                  <FaUserAlt className="h-4 w-4" />
                </Button>
              </SignInButton>
            </SignedOut>
          </>
        ),
      },
    ],
    [toggleTheme],
  );
  return { routers, buttons };
};
