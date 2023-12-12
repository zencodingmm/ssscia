"use client"
        
import Sidebar from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/store";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { AiOutlineWarning} from "react-icons/ai"


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
    const {adminLoggedIn, setAdminLoggedIn} = useAuthStore();
    const router = useRouter();
    if(!adminLoggedIn) return (
        <div className="h-screen w-full flex items-center justify-center">
           <p className="flex gap-2 items-center justify-center text-red-500">
            <AiOutlineWarning className="w-10 h-10"/>
            You are not authorized to view this page. 
            <Link href={`/admin`}>
            <Button>Go back</Button>
            </Link>
           </p>
        </div>
    )
	return (
		<div className="grid grid-cols-12 h-screen">
            <Sidebar />
            <div className="col-span-10 h-screen overflow-y-scroll print:col-span-12">
                {children}
            </div>
		</div>
	);
}