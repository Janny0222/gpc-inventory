import SideBar from "../components/sidebar";
import ThemeToggle from "../ui/theme-toggle";

export default function Layout({ children }: {children: React.ReactNode}){
    return (
        <>
        
            {/* <ThemeToggle /> */}
        
        <div className="flex flex-row h-screen md:flex-row md:overflow-hidden">
        
            <div className="flex-none md:w-64">
                <SideBar />
                
            </div>
            <div className="flex-grow md:overflow-y-auto md:p-6">{children}</div>
        </div>
        </>
    )
}