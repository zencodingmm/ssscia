"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavMenuMd } from "./navmenu-md";
import NavMenu from "./navmenu";
import AuthComponent from "../authComponent";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const path = usePathname();
	const isPrintRoute = /^\/print(\/.*)?$/.test(path);
	const isUserDashboard = /^\/dashboard(\/.*)?$/.test(path);
	const isAdminDashboard = /^\/admin\/dashboard(\/.*)?$/.test(path);
	return (
		<div
			className={`flex justify-between items-center px-5 md:px-10 lg:px-14 py-3 shadow-md sticky top-0 z-[40] bg-white ${
				isAdminDashboard || isPrintRoute || isUserDashboard ? "hidden" : ""
			}`}
		>
			{/* Logo Container Start */}
			<Link href={`/`}>
				<div className="flex justify-center items-center gap-2">
					<Image
						src={`/mcia-logo.png`}
						width={40}
						height={40}
						alt="SSSCIA logo"
					/>

					<div className="flex flex-col">
						<h1 className="text-green-800 text-xl font-bold">SSSCIA</h1>
						<p className="hidden lg:block text-green-800 text-sm">
							ရှမ်းပြည်နယ်(တောင်ပိုင်း) ပြောင်းစက်မှုအသင်း
						</p>
					</div>
				</div>
			</Link>
			{/* Logo Container End */}
			<div className="flex items-center gap-2">
				{/* Navigation Menu Start */}
				<NavMenuMd />
				{/* Navigation Menu End */}
				<AuthComponent />
			</div>
		</div>
	);
};

export default Navbar;
