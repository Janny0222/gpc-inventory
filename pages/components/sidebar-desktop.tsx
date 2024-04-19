'use client';

import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '../types';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut, LucideArrowBigLeft, MoreHorizontal, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { lato } from '@/styles/font';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className='w-[299px] rounded max-w-xs h-screen fixed left-0 top-0 z-40 bg-black'>
      <div className='h-full py-3'>
        <h3 className={`mx-3 text-3xl font-semibold text-foreground text-green-300 ${lato.className}`}>Greenstone</h3>
        <div className='mt-5'>
          <div className='mx-3 flex flex-col gap-1 w-full text-white'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  icon={link.icon}
                  className='focus:ring-2 border-hidden hover:text-green-400 focus:ring-white px-5 w-64 border border-green-500 my-4 py-8  shadow-lg shadow-green-400/45'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute left-0 bottom-3 w-full px-3'>
            {/* <Separator className='absolute -top-3 left-0 w-full' /> */}
            
          </div>
        </div>
      </div>
    </aside>
  );
}
