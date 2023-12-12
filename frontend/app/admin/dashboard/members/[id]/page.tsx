"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { FaPrint } from "react-icons/fa6";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store";
import Image from "next/image";
import UpdateForm from "./form";

const MemberUpdatePage = ({
	params,
}: {
	params: {
		id: number;
	};
}) => {
	const [user, setUser] = useState({
		id: "",
		userId: "",
		memberId: "",
		firstName: "",
		lastName: "",
		fatherName: "",
		dob: "",
		education: "",
		ethnicity: "",
		religion: "",
		nrc: "",
		companyName: "",
		companyAddress: "",
		cornBusinessLife: "",
		homeAddress: "",
		homeNo: "",
		homeStreet: "",
		homeQuater: "",
		homeVillage: "",
		homeTownship: "",
		homeDivisionState: "",
		phoneNo: "",
		emailAddress: "",
		numberOfSiblings: "",
		bankAccNo: "",
		bankName: "",
		paymentAppNumber: "",
		paymentAppType: "",
		nrcFPhoto: "",
		nrcBPhoto: "",
		photo: "",
	});
	const [fetched, setFetched] = useState(false);
	const [edit, setEdit] = useState(false);
	useEffect(() => {
		const hideComponent = () => {
			const component = document.getElementById("buttons");
			if (component) {
				component.style.display = "none";
			}
		};

		const showComponent = () => {
			const component = document.getElementById("buttons");
			if (component) {
				component.style.display = "flex";
			}
		};

		if (window.matchMedia) {
			const mediaQueryList = window.matchMedia("print");
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

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${params.id}`)
			.then((response) => {
				setFetched(false);
				setUser({
					id: response.data.id,
					userId: response.data.userid,
					memberId: response.data.member_id,
					firstName: response.data.first_name,
					lastName: response.data.last_name,
					fatherName: response.data.father_name,
					dob: new Date(response.data.dob).toISOString().split("T")[0],
					education: response.data.education,
					ethnicity: response.data.ethnicity,
					religion: response.data.religion,
					nrc: response.data.nrc,
					companyName: response.data.company_name,
					companyAddress: response.data.company_address,
					cornBusinessLife: response.data.corn_business_life,
					homeAddress: response.data.home_address,
					homeNo: response.data.home_no,
					homeStreet: response.data.home_street,
					homeQuater: response.data.home_quater,
					homeVillage: response.data.home_village,
					homeTownship: response.data.home_township,
					homeDivisionState: response.data.home_division_state,
					phoneNo: response.data.phone_no,
					emailAddress: response.data.email_address,
					numberOfSiblings: response.data.number_of_siblings,
					bankAccNo: response.data.bank_acc_no,
					bankName: response.data.bank_name,
					paymentAppNumber: response.data.payment_app_number,
					paymentAppType: response.data.payment_app_type,
					nrcFPhoto: response.data.nrc_f_photo,
					nrcBPhoto: response.data.nrc_b_photo,
					photo: response.data.photo,
				});
				setFetched(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [setEdit]);

	if (fetched)
		return (
			<div>
				{edit ? (
					<UpdateForm defaultValues={user} originalValues={user} setEdit={setEdit} />
				) : (
					<div className="container mx-auto space-y-14">
						<h1 className="text-4xl font-bold text-center">အသင်းဝင်ကိုယ်ရေးအကျဉ်း</h1>
						<div className="flex items-center justify-center ">
							<div className="w-[250px] h-[250px] rounded-full overflow-hidden">
								<img src={`http://localhost:4000/uploads/members/${user.photo}`} alt="" className="w-[250px] h-[250px]" />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<div className="grid grid-cols-12">
								<p className="col-span-5">အသင်းဝင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.memberId}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">မှတ်ပုံတင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.nrc}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">အမည်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.firstName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">အခြားအမည်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.lastName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">အဖအမည်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.fatherName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">မွေးသက္ကရာဇ် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.dob}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ပညာအရည်အချင်း </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.education}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">လူမျိုး</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.ethnicity}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ဘာသာ </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.religion}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ကုမ္ပဏီအမည် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.companyName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ကုမ္ပဏီလိပ်စာ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.companyAddress}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ပြောင်းလုပ်ငန်းသက်တမ်း</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.cornBusinessLife}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">နေရပ်လိပ်စာ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeAddress}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">အိမ်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeNo}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">လမ်း </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeStreet}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ရပ်ကွက် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeQuater}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ကျေးရွာ </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeVillage}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">မြို့ </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeTownship}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">တိုင်းဒေသကြီး/ခရိုင်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.homeDivisionState}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">မိသားစုဝင်ဦးရေ </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.numberOfSiblings}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ဖုန်းနံပါတ် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.phoneNo}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">အီးမေးလ်လိပ်စာ </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.emailAddress}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ဘဏ်အမည် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.bankName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ဘဏ်အကောင့်နံပါတ် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.bankAccNo}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ငွေပေးချေမည့်အက်ပ်နံပါတ် </p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.paymentAppNumber}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ငွေပေးချေမည့်အက်ပ်အမျိုးအစား</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.paymentAppType}</p>
							</div>
							<div className="flex flex-col items-center gap-2">
								<p>မှတ်ပုံတင်(အရှေ့)</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/members/${user.nrcFPhoto}`} alt="" className="w-8/12 h-[200px]" />
							</div>
							<div className="flex flex-col items-center gap-2">
								<p>မှတ်ပုံတင်(အနောက်)</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/members/${user.nrcBPhoto}`} alt="" className="w-8/12 h-[200px]" />
							</div>
						</div>
						<div className="flex gap-8 justify-center items-center" id="buttons">
							<Button className="w-[200px] h-[50px] text-base flex gap-2 items-center justify-center bg-green-800 hover:bg-green-700" onClick={() => setEdit(true)}>
								<CiEdit className="w-4 h-4" />
								Edit
							</Button>
							<Button className="w-[200px] h-[50px] text-base flex gap-2 items-center justify-center bg-green-800 hover:bg-green-700" onClick={() => window.print()}>
								<FaPrint className="w-4 h-4" />
								Print
							</Button>
						</div>
					</div>
				)}
			</div>
		);
};

export default MemberUpdatePage;
