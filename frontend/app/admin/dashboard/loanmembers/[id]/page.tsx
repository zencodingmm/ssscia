"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store";
import Image from "next/image";
import UpdateForm from "./form";
import { CiEdit } from "react-icons/ci";
import { FaPrint } from "react-icons/fa6";

const LoanMemberUpdatePage = ({
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
		loanSubmitDate: "",
		loanAmount: "",
		landValueAndAcresToBeInsured: "",
		isApplyPerson: "",
		relationshipWithSupporters: "",
		isCurrentCropCultivation: "",
		isTakenLoan: "",
		proofOfRepayment: "",
		isHealthAndChronicDisease: "",
		supporterOneName: "",
		supporterOneNrc: "",
		supporterOneDob: "",
		supporterOneAge: "",
		supporterOnePlace: "",
		supporterOnePhone: "",
		supporterTwoName: "",
		supporterTwoNrc: "",
		supporterTwoDob: "",
		supporterTwoPlace: "",
		supporterTwoPhone: "",
		healthSupporter: "",
		photographOfLandToBeInsured: "",
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
			.get(`http://localhost:4000/api/loansubmittion/${params.id}`)
			.then((response) => {
				setFetched(false);

				setUser({
					id: response.data.id,
					userId: response.data.userid,
					memberId: response.data.memberid,
					loanSubmitDate: new Date(response.data.loan_submit_date).toISOString().split("T")[0],
					loanAmount: response.data.loan_amount,
					landValueAndAcresToBeInsured: response.data.land_value_and_acres_to_be_insured,
					isApplyPerson: response.data.is_apply_person,
					relationshipWithSupporters: response.data.relationship_with_supporters,
					isCurrentCropCultivation: response.data.is_current_crop_cultivation,
					isTakenLoan: response.data.is_taken_loan,
					proofOfRepayment: response.data.proof_of_repayment,
					isHealthAndChronicDisease: response.data.is_health_and_chronic_disease,
					supporterOneName: response.data.supporter_one_name,
					supporterOneNrc: response.data.supporter_one_nrc,
					supporterOneDob: response.data.supporter_one_dob,
					supporterOneAge: response.data.supporter_one_age,
					supporterOnePlace: response.data.supporter_one_place,
					supporterOnePhone: response.data.supporter_one_phone,
					supporterTwoName: response.data.supporter_two_name,
					supporterTwoNrc: response.data.supporter_two_nrc,
					supporterTwoDob: response.data.supporter_two_dob,
					supporterTwoPlace: response.data.supporter_two_place,
					supporterTwoPhone: response.data.supporter_two_phone,
					healthSupporter: response.data.health_supporter,
					photographOfLandToBeInsured: response.data.photograph_of_land_to_be_insured,
				});
				setFetched(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	if (fetched)
		return (
			<div>
				{edit ? (
					<UpdateForm defaultValues={user} originalValues={user} setEdit={setEdit} />
				) : (
					<div className="container mx-auto space-y-14">
						<h1 className="text-4xl font-bold text-center">ချေးငွေဆိုင်ရာအချက်အလက်များ</h1>
						<div className="grid grid-cols-2 gap-6">
							<div className="grid grid-cols-12">
								<p className="col-span-5">အသင်းဝင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.memberId}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ချေးငွေယူသည့်နေ့</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.loanSubmitDate}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ချေးငွေပမာဏ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.loanAmount}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">အာမခံထားရှိသည့်မြေတန်ဖိုးနှင့်ဧက</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.landValueAndAcresToBeInsured}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံမည့်သူရှိမရှိ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.isApplyPerson}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူများနှင့်တော်စပ်မှု</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.relationshipWithSupporters}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">လယ်ယာသီးနှံစိုက်ပျိုးမှုရှိမရှိ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.isCurrentCropCultivation}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ချေးငွေရယူဖူခြင်းရှိမရှိ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.isTakenLoan}</p>
							</div>

							<div className="grid grid-cols-12">
								<p className="col-span-5">လက်ရှိကျန်းမာ‌ရေးနှင့်နာတာရှည်ရောဂါရှိမရှိ</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.isHealthAndChronicDisease}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ၏အမည် (ပ)</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterOneName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ပ)၏ မှတ်ပုံတင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterOneNrc}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ပ)၏ မွေးသက္ကရာဇ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterOneDob}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ပ)၏ အသက်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterOneAge}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ပ)၏ နေရပ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterOnePlace}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ပ)၏ ဖုန်းနံပါတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterOnePhone}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ၏အမည် (ဒု)</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterTwoName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ဒု)၏ မှတ်ပုံတင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterTwoNrc}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ဒု)၏ မွေးသက္ကရာဇ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterTwoDob}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ဒု)၏ နေရပ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterTwoPlace}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ(ဒု)၏ ဖုန်းနံပါတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.supporterTwoPhone}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-5">ထောက်ခံသူ၏ကျန်းမာရေး</p>
								<p className="col-span-1">-</p>
								<p className="col-span-6">{user.healthSupporter}</p>
							</div>
							<div className="grid grid-cols-12"></div>
							<div className="flex flex-col items-center gap-2">
								<p className="mb-2">ချေးငွေပြန်လည်ဆပ်ထားသည့်အထောက်အထား</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/loansubmittion/${user.proofOfRepayment}`} alt="" className="w-8/12 h-[200px]" />
							</div>
							<div className="flex flex-col items-center gap-2">
								<p className="mb-2">အာမခံထားရှိမည့်မြေယာပိုင်ဆိုင်မှုဓာတ်ပုံ</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/loansubmittion/${user.photographOfLandToBeInsured}`} alt="" className="w-8/12 h-[200px]" />
							</div>
						</div>
						<div className="flex gap-4 justify-center items-center" id="buttons">
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

export default LoanMemberUpdatePage;
