"use client";
import { Button } from "@/components/ui/button";
import MemberLogin from "@/components/users/memberLogin";
import useAuthStore from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const Profile = () => {
	const { userID } = useAuthStore();
	const router = useRouter();
	const [user, setUser] = useState({
		user_name: "",
		phone_no: "",
		address: "",
		email: "",
	});
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/users/${userID}`)
			.then((response) => {
				if (response.data) {
					console.log(response.data);
					console.log(userID);
					setUser(response.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="container flex flex-col gap-10 h-screen overflow-y-scroll">
			<h1 className="text-2xl lg:text-4xl font-bold text-center">တောင်သူ၏ကိုယ်ရေးအချက်အလက်များ</h1>

			<div className="max-w-screen-sm mx-auto space-y-8">
				<div className="w-full gap-y-4 ">
					<div className=" p-5 border-b">အမည် - {user.user_name}</div>
					<div className=" p-5 border-b">ဖုန်းနံပါတ် - {user.phone_no}</div>
					<div className=" p-5 border-b">အီးမေးလ်လိပ်စာ - {user.email}</div>
					<div className=" p-5 border-b">နေရပ်လိပ်စာ - {user.address}</div>
				</div>
				<div className="flex justify-end">
					<Button onClick={() => router.push(`/dashboard/profile/${userID}`)} className="text-green-800 bg-white hover:bg-white hover:underline hover:underline-offset-4">
						<FaRegEdit className="mr-1" />
						အချက်အလက်ပြင်ဆင်ရန်
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
