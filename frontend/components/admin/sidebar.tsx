"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { BiCategory, BiLogOut, BiLogOutCircle } from "react-icons/bi";
import useAuthStore from "@/lib/store";
import { ImNewspaper } from "react-icons/im";
import {
	FaMapLocation,
	FaUsers,
	FaUsersGear,
	FaUsersRectangle,
} from "react-icons/fa6";
import { GiFruitTree } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
	const { setAdminLoggedIn } = useAuthStore();
	useEffect(() => {
        const hideComponent = () => {
          const component = document.getElementById('sidebar');
          if (component) {
            component.style.display = "none"
          }
        };
    
        const showComponent = () => {
          const component = document.getElementById('sidebar');
          if (component) {
            component.style.display = "block"
          }
        };
    
        
        if (window.matchMedia) {
          const mediaQueryList = window.matchMedia('print');
          mediaQueryList.addListener((mql) => {
            if (mql.matches) {
              
              hideComponent();
            } else {
          
              showComponent();
            }
          });
        }
    
        // For older browsers that don't support matchMedia
        window.onbeforeprint = hideComponent;
        window.onafterprint = showComponent;
    
        return () => {
         
          window.onbeforeprint = null;
          window.onafterprint = null;
        };
      }, []);
	const router = useRouter();
	const path = usePathname();
	return (
		<aside id="sidebar" className="col-span-2 z-9999 flex flex-col gap-4 overflow-y-hidden  dark:bg-boxdark p-4 bg-cyan-900 text-white">
			<div className="flex gap-2 items-center justify-between">
				<Link href={`/`} className="flex items-center justify-start gap-2">
					<Image
						src={`/mcia-logo.png`}
						width={50}
						height={50}
						alt="SSSCIA logo"
						className="rounded-full"
					/>
					<span className="text-xl font-extrabold">SSSCIA</span>
				</Link>
			</div>
			<h1 className="w-full p-2">
				<Link href={`/admin/dashboard`}>MENU</Link>
			</h1>
			<div className="relative flex flex-col gap-2">
				<Link
					href={`/admin/dashboard/categories`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/categories" ? "bg-cyan-700" : ""
						}`}
					>
						<BiCategory className="w-5 h-5" />
						Category
					</div>
				</Link>
				<Link
					href={`/admin/dashboard/posts`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/posts" ? "bg-cyan-700" : ""
						}`}
					>
						<ImNewspaper className="w-5 h-5" />
						Posts
					</div>
				</Link>
				<Link
					href={`/admin/dashboard/users`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/users" ? "bg-cyan-700" : ""
						}`}
					>
						<FaUsers className="w-5 h-5" />
						Users
					</div>
				</Link>
				<Link
					href={`/admin/dashboard/members`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/members" ? "bg-cyan-700" : ""
						}`}
					>
						<FaUsersGear className="w-5 h-5" />
						Members
					</div>
				</Link>
				<Link
					href={`/admin/dashboard/loanmembers`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/loanmembers" ? "bg-cyan-700" : ""
						}`}
					>
						<FaUsersRectangle className="w-5 h-5" />
						Loan Members
					</div>
				</Link>
				<Link
					href={`/admin/dashboard/lands`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/lands" ? "bg-cyan-700" : ""
						}`}
					>
						<FaMapLocation className="w-5 h-5" />
						Lands List
					</div>
				</Link>
				<Link
					href={`/admin/dashboard/crops`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/admin/dashboard/crops" ? "bg-cyan-700" : ""
						}`}
					>
						<GiFruitTree className="w-5 h-5" />
						Crops List
					</div>
				</Link>

				<button
					className="flex flex-col gap-2 justify-start items-center w-full"
					onClick={() => {
						setAdminLoggedIn(false);
						router.push("/");
					}}
				>
					<div className="flex rounded-sm text-xs items-center justify-start gap-2 w-full hover:bg-slate-300 hover:text-slate-700 p-2">
						<AiOutlineLogout className="w-5 h-5" />
						Logout
					</div>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
