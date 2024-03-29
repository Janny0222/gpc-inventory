import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    ComputerDesktopIcon,
    DevicePhoneMobileIcon
  } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Inventory',
      href: '/dashboard/inventory',
      icon: ComputerDesktopIcon,
    },
    {name: 'Cellphone', href: '/dashboard/cellphone', icon: DevicePhoneMobileIcon},
  ];
  
  export default function NavLinks() {
    const pathname = usePathname()

    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="custom-font flex h-[48px] grow items-center justify-center gap-2 rounded-md  text-sm font-medium sidenav hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
     
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }
  