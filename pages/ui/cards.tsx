import React from 'react';
import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon, ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/styles/font';

const iconMap = {
  laptop: BanknotesIcon,
  desktop: ComputerDesktopIcon,
  cellphone: DevicePhoneMobileIcon
};

const Card = ({
  title,
  value,
  type,
}: {
  title: string;
  value: any;
  type: 'laptop' | 'desktop' | 'cellphone';
}) => {
  const Icon = iconMap[type];

  return (
    <div className="p-2 shadow summary-cards rounded-xl">
      <div className="flex p-1 ">
        {Icon ? <Icon className="mr-auto text-black h-7 w-7"  /> : null}
        <h3 className="ml-auto text-xl font-medium text-white ">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
       Total unit/s <br></br> {value} 
      </p>
    </div>
  );
};

export default Card;

