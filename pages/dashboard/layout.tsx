import SideBar from "../components/sidebar";

export default function Layout({ children }: {children: React.ReactNode}){
    return (
        <>
        <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
            <div className="flex-none md:w-64">
                <SideBar />
            </div>
            <div className="flex-grow p-2 md:overflow-y-auto md:p-12">{children}</div>
        </div>
        </>
    )
}