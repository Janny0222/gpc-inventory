
import { useEffect, useState } from 'react';
import { roboto } from '@/styles/font';
import { bsdisplay } from '@/styles/font';
import { anek_latin } from '@/styles/font';
import { lusitana } from '@/styles/font';

export default function GpcLogo() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust this value as needed for your breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="p-1 ml-auto text-gray-300 sm:flex-grow custom-font">
        {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
        {isSmallScreen ? (
          <p className={`${lusitana.className} text-[64px] xs:text-5 text-white`}>Greenstone</p>
        ) : (
          <div className="relative flex items-center p-1">
            <span className={`${lusitana.className} custom-font text-[9.5rem] text-white `}>G</span>
            <span className={`${anek_latin.className} custom-font text-[29px] text-white ` }>reenstone</span>
          </div>
        )}
      </div>
    </>
  );
}