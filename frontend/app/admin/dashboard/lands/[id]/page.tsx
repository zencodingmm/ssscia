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

const LoanMemberUpdatePage = ({
	params,
}: {
	params: {
		id: number;
	};
}) => {
	const [lands, setLands] = useState({
		dbId: "",
		userId: "",
		memberId: "",
		numberOfMap: "",
		own: "",
		rent: "",
		acreAge: "",
		pitchNo: "",
		ownershipNo: "",
		landType: "",
		acresOfLandOwned: "",
		acresOfLandGround: "",
		formSevenFormOnehundredfiveAcresOfContract: "",
		formSevenAcresOfApplied: "",
		namesOfNeighborOfFarmEast: "",
		namesOfNeighborOfFarmWest: "",
		namesOfNeighborOfFarmSouth: "",
		namesOfNeighborOfFarmNorth: "",
		numberOfFamilyMembersByGrandparents: "",
		applyFamilyOneName: "",
		applyFamilyOneNrc: "",
		applyFamilyTwoName: "",
		applyFamilyTwoNrc: "",
		timeValue: "",
		photoFormSeven: "",
		photoFormOneHundredfive: "",
		photoContract: "",
		photoAncestralProperty: "",
		photoOther: "",
		photoHouseholdChart: "",
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
			.get(`http://localhost:4000/api/landfactors/${params.id}`)
			.then((response) => {
				setFetched(false);
				console.log(response.data);
				setLands({
					dbId: response.data.id,
					userId: response.data.userid,
					memberId: response.data.member_id,
					numberOfMap: response.data.number_of_map,
					own: response.data.own,
					rent: response.data.rent,
					acreAge: response.data.acreage,
					pitchNo: response.data.pitch_no,
					ownershipNo: response.data.ownership_no,
					landType: response.data.land_type,
					acresOfLandOwned: response.data.acres_of_land_owned,
					acresOfLandGround: response.data.acres_of_land_ground,
					formSevenFormOnehundredfiveAcresOfContract: response.data.form_seven_form_onehundredfive_acres_of_contract,
					formSevenAcresOfApplied: response.data.form_seven_acres_of_applied,
					namesOfNeighborOfFarmEast: response.data.names_of_neighbor_of_farm_east,
					namesOfNeighborOfFarmWest: response.data.names_of_neighbor_of_farm_west,
					namesOfNeighborOfFarmSouth: response.data.names_of_neighbor_of_farm_south,
					namesOfNeighborOfFarmNorth: response.data.names_of_neighbor_of_farm_north,
					numberOfFamilyMembersByGrandparents: response.data.number_of_family_members_by_grandparents,
					applyFamilyOneName: response.data.apply_family_one_name,
					applyFamilyOneNrc: response.data.apply_family_one_nrc,
					applyFamilyTwoName: response.data.apply_family_two_name,
					applyFamilyTwoNrc: response.data.apply_family_two_nrc,
					timeValue: response.data.time_value,
					photoFormSeven: response.data.photo_form_seven,
					photoFormOneHundredfive: response.data.photo_form_onehundredfive,
					photoContract: response.data.photo_contract,
					photoAncestralProperty: response.data.photo_ancestral_property,
					photoOther: response.data.photo_other,
					photoHouseholdChart: response.data.photo_household_chart,
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
					<UpdateForm defaultValues={lands} originalValues={lands} setEdit={setEdit} />
				) : (
					<div className="container mx-auto space-y-14">
						<h1 className="text-4xl font-bold text-center">မြေယာဆိုင်ရာအချက်အလက်များ</h1>
						<div className="grid grid-cols-2 gap-y-6 gap-x-12">
							<div className="grid grid-cols-12">
								<p className="col-span-4">အသင်းဝင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.memberId}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">မြေပုံနံပါတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.numberOfMap}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ကိုယ်ပိုင်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.own}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">အငှား</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.rent}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">စိုက်ဧက</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.acreAge}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ကွင်းအမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.pitchNo}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ဦးပိုင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.ownershipNo}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">မြေအမျိုးအစား</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.landType}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ပိုင်ဆိုင်သည့်မြေဧက</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.acresOfLandOwned}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">မြေပြင်ရှိမြေဧက</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.acresOfLandGround}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ပုံစံ(၇)/(၁၀၅)စာချုပ်ပါမြေဧက</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.formSevenFormOnehundredfiveAcresOfContract}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ပုံစံ(၇)လျှောက်ထားလိုသည့်မြေဧက</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.formSevenAcresOfApplied}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">တောင်သူအမည်(အရှေ့ဘက်)</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.namesOfNeighborOfFarmEast}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">တောင်သူအမည်(အနောက်ဘက်)</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.namesOfNeighborOfFarmWest}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">တောင်သူအမည်(တောင်ဘက်)</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.namesOfNeighborOfFarmSouth}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">တောင်သူအမည်(မြောက်ဘက်)</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.namesOfNeighborOfFarmNorth}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">မိသားစုဝင်အရေအတွက်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.numberOfFamilyMembersByGrandparents}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ထောက်ခံမည့်မိသားစုဝင်(၁) အမည်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.applyFamilyOneName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ထောက်ခံမည့်မိသားစုဝင်(၁) မှတ်ပုံတင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.applyFamilyOneNrc}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ထောက်ခံမည့်မိသားစုဝင်(၂) အမည်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.applyFamilyTwoName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ထောက်ခံမည့်မိသားစုဝင်(၂) မှတ်ပုံတင်အမှတ်</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.applyFamilyTwoNrc}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ကာလတန်ဖိုး</p>
								<p className="col-span-1">-</p>
								<p className="col-span-7">{lands.timeValue}</p>
							</div>

							<div className="flex flex-col items-center gap-2">
								<p>ပုံစံ(၇) ဓာတ်ပုံ</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/landfactors/${lands.photoFormSeven}`} alt="" className="w-8/12 h-[200px]" />
							</div>
							<div className="flex flex-col items-center gap-2">
								<p>ပုံစံ(၁၀၅) ဓာတ်ပုံ</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/landfactors/${lands.photoFormOneHundredfive}`} alt="" className="w-8/12 h-[200px]" />
							</div>

							<div className="flex flex-col items-center gap-2">
								<p>စာချုပ်ဓာတ်ပုံ</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/landfactors/${lands.photoContract}`} alt="" className="w-8/12 h-[200px]" />
							</div>
							<div className="flex flex-col items-center gap-2">
								<p>ဘိုးဘွားပိုင်မြေဓာတ်ပုံ</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/landfactors/${lands.photoAncestralProperty}`} alt="" className="w-8/12 h-[200px]" />
							</div>
							<div className="flex flex-col items-center gap-2">
								<p>အခြား</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/landfactors/${lands.photoOther}`} alt="" className="w-8/12 h-[200px]" />
							</div>
							<div className="flex flex-col items-center gap-2">
								<p>အိမ်ထောင်စုဇယားဓာတ်ပုံ</p>
								<Image width={200} height={100} src={`http://localhost:4000/uploads/landfactors/${lands.photoHouseholdChart}`} alt="" className="w-8/12 h-[200px]" />
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
