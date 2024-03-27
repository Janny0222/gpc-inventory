import Image from "next/image";
import NavLinks from "./components/sidebar";
import Link from "next/link";


export default function Home() {
  return (
    <>
    <main>
    <Link href="/dashboard">
      <span>Go to Dashboard</span>
      
    </Link>
    
    </main>
    </>
  );
}
