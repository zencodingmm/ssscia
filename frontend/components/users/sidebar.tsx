"use client";
import Image from "next/image";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import useAuthStore from "@/lib/store";
import { ImNewspaper } from "react-icons/im";
import { MdOutlineRememberMe } from "react-icons/md";
import { FaUsers, FaUsersGear } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Sidebar = () => {
	const { setLoggedIn } = useAuthStore();
	const router = useRouter();
	const path = usePathname();
	return (
		<aside className="h-full flex flex-col gap-4 overflow-y-hidden dark:bg-boxdark p-2 lg:p-4 bg-cyan-900 text-white">
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
			<Link href={`/dashboard`}>
				<h1 className="w-full pt-8 pl-3 font-bold flex items-center gap-2">
					<FaMapLocationDot className="w-4 h-4" />
					မြေယာများကြည့်ရန်
				</h1>
			</Link>

			<div className="relative flex flex-col gap-2">
				<Link
					href={`/dashboard/members`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/members" ? "bg-cyan-700" : ""
						}`}
					>
						<MdOutlineRememberMe className="w-4 h-4" />
						အသင်းဝင်အချက်အလက်များ
					</div>
				</Link>
				<Link
					href={`/dashboard/landfactors`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/landfactors" ? "bg-cyan-700" : ""
						}`}
					>
						<BiCategory className="w-4 h-4" />
						မြေယာဆိုင်ရာအချက်အလက်များ
					</div>
				</Link>
				<Link
					href={`/dashboard/landlist`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/landlist" ? "bg-cyan-700" : ""
						}`}
					>
						<BiCategory className="w-4 h-4" />
						မြေယာအချက်အလက်များစာရင်း
					</div>
				</Link>
				<Link
					href={`/dashboard/cropfactors`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/cropfactors" ? "bg-cyan-700" : ""
						}`}
					>
						<ImNewspaper className="w-4 h-4" />
						စိုက်ပျိုးသီးနှံအချက်အလက်များ
					</div>
				</Link>
				<Link
					href={`/dashboard/croplist`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/croplist" ? "bg-cyan-700" : ""
						}`}
					>
						<ImNewspaper className="w-4 h-4" />
						စိုက်ပျိုးသီးနှံအချက်အလက်များစာရင်း
					</div>
				</Link>
				<Link
					href={`/dashboard/loansubmittion`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/loansubmittion" ? "bg-cyan-700" : ""
						}`}
					>
						<FaUsers className="w-4 h-4" />
						ချေးငွေအချက်အလက်များ
					</div>
				</Link>
				<Link
					href={`/dashboard/loanlist`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/loanlist" ? "bg-cyan-700" : ""
						}`}
					>
						<FaUsers className="w-4 h-4" />
						ချေးငွေအချက်အလက်များစာရင်း
					</div>
				</Link>
				<Link
					href={`/dashboard/profile`}
					className="flex flex-col gap-2 justify-start items-center"
				>
					<div
						className={`flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2 ${
							path == "/dashboard/profile" ? "bg-cyan-700" : ""
						}`}
					>
						<FaUsersGear className="w-4 h-4" />
						သင်၏အချက်အလက်များ
					</div>
				</Link>

				<button
					className="flex flex-col gap-2 justify-start items-center w-full"
					onClick={() => {
						setCookie("token", undefined);
						setLoggedIn(false);
						router.push("/");
					}}
				>
					<div className="flex rounded-sm text-xs items-center justify-start gap-1 w-full hover:bg-slate-300 hover:text-slate-700 p-2">
						<AiOutlineLogout className="w-4 h-4" />
						ထွက်မည်
					</div>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
