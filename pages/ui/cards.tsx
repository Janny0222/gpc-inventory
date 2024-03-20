import React from 'react';
import { useEffect, useState } from 'react';
import { fetchInventoryData } from '../lib/data';
import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/styles/font';

const iconMap = {
  laptop: BanknotesIcon,
  desktop: ComputerDesktopIcon,
};

const Card = ({
  title,
  value,
  type,
}: {
  title: string;
  value: any;
  type: 'laptop' | 'desktop';
}) => {
  const Icon = iconMap[type];

  return (
    <div className="p-2 bg-green-700 shadow rounded-xl">
      <div className="flex p-4 ">
        {Icon ? <Icon className="mr-auto text-white h-7 w-7"  /> : null}
        <h3 className="ml-auto text-2xl font-medium text-gray-200">{title}</h3>
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

