"use client";
import Sidebar from "@/components/users/sidebar";
import useAuthStore from "@/lib/store";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const { loggedIn, userID, setMemberID, setIsMember } = useAuthStore();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`)
			.then((response) => {
				setIsMember(true);
				setMemberID(response.data.member_id);
			})
			.catch((err) => {
				setIsMember(false);
			});
	}, []);

	if (!loggedIn)
		return (
			<div className="flex justify-center items-center h-screen">
				<p>
					You are not logged in. Please login{" "}
					<Link href={`/login`} className="text-green-800">
						here.
					</Link>
				</p>
			</div>
		);

	return (
		<div className="grid grid-cols-12 h-screen">
			<div className="col-span-4 lg:col-span-2 z-9999">
				<Sidebar />
			</div>
			<div className="col-span-8 lg:col-span-10 overflow-y-scroll">{children}</div>
		</div>
	);
}
