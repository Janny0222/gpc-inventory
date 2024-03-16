


export default function Navbar(){
    return(
        <nav className="w-56 h-screen text-center text-white bg-green-800">
            <ul className="gap-2 mr-auto align-middle ">
                <li className="cursor-pointer active:hover:bg-green-400 rounded-bl-md">
                    Home
                </li>
                <li>
                    About
                </li>
                <li>
                    Contact
                </li>
            </ul>
        </nav>
    )
}