import {SidebarToggle} from "@/components/SidebarComponent";
import SidebarMotion from "@/components/SidebarMotion";
import Sidebar from "@/components/SidebarToggle";
import SideBar from "@/components/sidebar";
import ThemeToggle from "@/components/ui/theme-toggle";
import { lato } from "@/styles/font";

export default function Layout({ children }: {children: React.ReactNode}){
    return (
        <>
        
            {/* <ThemeToggle /> */}
        
        {/* <div className="flex flex-row h-full md:flex-row md:overflow-hidden p-1"> */}
        {/* <div className="flex flex-col h-screen md:flex-row md:overflow-hidden p-1"> */}
        {/* <div className="grid min-h-screen grid-cols-[auto_1fr] justify-center overflow-hidden"> */}
            
                {/* <SidebarMotion /> */}
                {/* <Sidebar  /> */}
                <div className={` ${lato.className}`}>
                    <SidebarToggle />
                </div>
                
            
            <div className={`'mx-5 sm:ml-[300px] sm:mt-16' sm:p-2 ${lato.className}`}>{children}</div>
        {/* </div> */}
        </>
    )
}