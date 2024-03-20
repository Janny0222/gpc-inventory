import Link from 'next/link';
import NavLinks from './navlinks';
import GpcLogo from './gpclogo';
import { PowerIcon } from '@heroicons/react/24/outline';
  export default function SideBar() {
    return (
        <div className="flex flex-col h-full">
          <a
            className="flex items-center justify-center h-20 mb-2 bg-green-700 rounded-md md:h-40"
            href="/"
          >
            {/* Centering the GpcLogo */}
            <div className="text-white">
              <GpcLogo />
            </div>
          </a>
          <div className="flex flex-row justify-between space-x-2 grow md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
            <div className="hidden w-full h-auto rounded-md grow bg-gray-50 md:block"></div>
            {/* <form>
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form> */}
          </div>
        </div>
      );
  }
  