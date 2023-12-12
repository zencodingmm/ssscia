"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import useAuthStore from "@/lib/store";
import axios from "axios";
import { BiUserCircle } from "react-icons/bi";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { setCookie } from "cookies-next";
import { usePathname } from "next/navigation";

const AuthComponent = () => {
	const { loggedIn, setLoggedIn, setEmail, setUserID } = useAuthStore();
	const path = usePathname();
	const isPrintRoute = /^\/print(\/.*)?$/.test(path);
	const isUserDashboard = /^\/dashboard(\/.*)?$/.test(path);
	const isAdminDashboard = /^\/admin\/dashboard(\/.*)?$/.test(path);

	useEffect(() => {
		const token = getCookie("token");
		if (token) {
			axios
				.get("http://localhost:4000/api/auth/protected", {
					withCredentials: true,
				})
				.then((res) => {
					setLoggedIn(true);
					setEmail(res.data.useremail);
					setUserID(res.data.userID);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (!token) setLoggedIn(false);
	}, [loggedIn]);

	const logOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		setCookie("token", undefined);
		setLoggedIn(false);
	};

	if (!loggedIn)
		return (
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>
						<BiUserCircle className="h-4 w-4 text-green-800" />
					</MenubarTrigger>
					<MenubarContent side="bottom" className={`p-5 mt-3 bg-white/90 backdrop-blur-md space-y-2 ${isAdminDashboard || isPrintRoute || isUserDashboard ? "hidden" : ""}`}>
						<MenubarItem>
							<Link href={`/register`} className="w-full flex gap-2 items-center text-green-800 hover:bg-none hover:text-orange-500 duration-200">
								<MdOutlineDashboard />
								Sign Up
							</Link>
						</MenubarItem>
						<MenubarItem>
							<Link href={`/login`} className="w-full flex gap-2 items-center text-green-800 hover:bg-none hover:text-orange-500 duration-200">
								<MdOutlineLogout />
								Login
							</Link>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	if (loggedIn)
		return (
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>
						<BiUserCircle className="h-4 w-4 text-green-800" />
					</MenubarTrigger>
					<MenubarContent side="bottom" className={`${isAdminDashboard || isPrintRoute || isUserDashboard ? "hidden" : ""}`}>
						<MenubarItem className="w-[150px]">
							<Link href={`/dashboard`} className="w-full flex gap-2 items-center text-green-800 hover:bg-none hover:text-orange-500 duration-200">
								<MdOutlineDashboard />
								Dashboard
							</Link>
						</MenubarItem>
						<MenubarItem className="w-[150px]">
							<Link href={`#`} onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => logOut(e)} className="w-full flex gap-2 items-center text-green-800 hover:bg-none hover:text-orange-500 duration-200">
								<MdOutlineLogout />
								Logout
							</Link>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
};

export default AuthComponent;
