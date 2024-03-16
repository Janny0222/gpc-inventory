import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from './font';
import Image from 'next/image';

export default function GpcLogo() {
  const image_url = "/logo/greenstone-logo.png";
  return (
    <>
    <Image src={image_url} width={48} height={48} className='items-center justify-center hidden w-16 h-16 mb-auto md:block' alt="img" />
      <div
        className={`${lusitana.className}ml-auto text-gray-300 sm:flex`}
      >
        {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
        
        <p className="text-[44px] xs:text-5">Greenstone</p>
      </div>
    </>
    
  );
}
