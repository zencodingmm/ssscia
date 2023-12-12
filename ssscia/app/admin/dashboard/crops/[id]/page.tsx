"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
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
	const [crops, setCrops] = useState({
		dbId: "",
		userId: "",
		memberId: "",
		landImprovement: "",
		landImprovementCosts: "",
		typeOfSeedName: "",
		typeOfSeedBedsNo: "",
		typeOfSeedCost: "",
		typeOfSeedBuyShop: "",
		manureName: "",
		manureBedsNo: "",
		manureCost: "",
		manureManpower: "",
		manureBuyShop: "",
		pesticidesType: "",
		pesticidesFrequencyOfSpraying: "",
		pesticidesManpower: "",
		pesticidesCost: "",
		pesticidesBuyShop: "",
		typesOfCropsGrownAndAcreage: "",
		harvestingAndThreshingOwn: "",
		harvestingAndThreshingRental: "",
		harvestingAndThreshingType: "",
		harvestingAndThreshingManpower: "",
		harvestingAndThreshingSavingsCosts: "",
		harvestingAndThreshingDeviceName: "",
		oneAcreOutput: "",
		totalYield: "",
		salesFairOrDealer: "",
		salesFairOrDealerPriceReceived: "",
		isLoan: "",
		loanPerson: "",
		isSeedLoan: "",
		seenLoanPerson: "",
		isFertilizerLoan: "",
		fertilizerLoanPerson: "",
	});
	const [fetched, setFetched] = useState(false);
	const [edit, setEdit] = useState(false);
	const cropLists = [
		{ title: "အသင်းဝင်အမှတ်", dbname: crops.memberId },
		{ title: "မြေယာပြုပြင်ခြင်း", dbname: crops.landImprovement },
		{ title: "မြေယာပြုပြင်ကုန်ကျစရိတ်", dbname: crops.landImprovementCosts },
		{ title: "မျိုးစေ့အမျိုးအစားအမည်", dbname: crops.typeOfSeedName },
		{ title: "မျိုးစေ့အိတ်အရေအတွက်", dbname: crops.typeOfSeedBedsNo },
		{ title: "မျိုးစေ့ကုန်ကျစရိတ်", dbname: crops.typeOfSeedCost },
		{
			title: "မျိုးစေ့ဝယ်ယူသည့် ဆိုင်/ပွဲရုံ",
			dbname: crops.typeOfSeedBuyShop,
		},
		{
			title: "မြေသြဇာအမည်",
			dbname: crops.manureName,
		},
		{ title: "ဝယ်ယူသည့်အိတ်အရေအတွက်", dbname: crops.manureBedsNo },
		{ title: "မြေသြဇာဝယ်ယူမှုကုန်ကျစရိတ်", dbname: crops.manureCost },
		{ title: "အသုံးပြုသည့်လူအင်အား(မြေသြဇာ)", dbname: crops.manureManpower },
		{ title: "မြေသြဇာဝယ်ယူသည့် ဆိုင်/ပွဲရုံ", dbname: crops.manureBuyShop },
		{ title: "ပိုးသတ်ဆေးအမျိုးအစား", dbname: crops.pesticidesType },
		{
			title: "ဆေးဖြန်းသည့်အကြိမ်ရေ",
			dbname: crops.pesticidesFrequencyOfSpraying,
		},
		{
			title: "အသုံးပြုသည့်လူအင်အား(ပိုးသတ်ဆေး)",
			dbname: crops.pesticidesManpower,
		},
		{ title: "ပိုးသတ်ဆေးဝယ်ယူမှုကုန်ကျစရိတ်", dbname: crops.pesticidesCost },
		{
			title: "ပိုးသတ်ဆေးဝယ်ယူသည့် ဆိုင်/ပွဲရုံ",
			dbname: crops.pesticidesBuyShop,
		},
		{
			title: "စိုက်ပျိုးသည့်သီးနှံအမျိုးအစားနှင့် စိုက်ဧက",
			dbname: crops.typesOfCropsGrownAndAcreage,
		},
		{
			title: "ရိတ်သိမ်းခြွေလှေ့ခြင်း (ကိုယ်ပိုင်)",
			dbname: crops.harvestingAndThreshingOwn,
		},
		{
			title: "ရိတ်သိမ်းခြွေလှေ့ခြင်း (အငှား)",
			dbname: crops.harvestingAndThreshingRental,
		},
		{
			title: "ရိတ်သိမ်းခြွေလှေ့သည့်စက်အမျိုးအစား",
			dbname: crops.harvestingAndThreshingType,
		},
		{
			title: "အသုံးပြုသည့်လူအင်အား(ရိတ်သိမ်းခြွေလှေ့)",
			dbname: crops.harvestingAndThreshingManpower,
		},
		{
			title: "ရိတ်သိမ်းခြွေလှေ့မှုကုန်ကျစရိတ်",
			dbname: crops.harvestingAndThreshingSavingsCosts,
		},
		{
			title: "ရိတ်သိမ်းခြွေလှေ့စက်အမည်",
			dbname: crops.harvestingAndThreshingDeviceName,
		},
		{ title: "တစ်ဧကထွက်နှုန်း", dbname: crops.oneAcreOutput },
		{ title: "စုစုပေါင်းထွက်နှုန်း", dbname: crops.totalYield },
		{ title: "ရောင်းချသည့် ပွဲရုံ/ကုန်သည်", dbname: crops.salesFairOrDealer },
		{
			title: "ရရှိသည့်စျေး (ပိဿာ)",
			dbname: crops.salesFairOrDealerPriceReceived,
		},
		{ title: "ချေးငွေ", dbname: crops.isLoan },
		{ title: "ငွေချေးယူသည့်ပုဂ္ဂိုလ်", dbname: crops.loanPerson },
		{ title: "မျိုးစေ့", dbname: crops.isSeedLoan },
		{ title: "မျိုးစေ့ချေးယူသည့်ပုဂ္ဂိုလ်", dbname: crops.seenLoanPerson },
		{ title: "မြေသြဇာ", dbname: crops.isFertilizerLoan },
		{
			title: "မြေသြဇာချေးယူသည့်ပုဂ္ဂိုလ်",
			dbname: crops.fertilizerLoanPerson,
		},
	];
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
			.get(`http://localhost:4000/api/cropfactors/${params.id}`)
			.then((response) => {
				console.log(response.data);
				setFetched(false);
				setCrops({
					dbId: response.data.id,
					userId: response.data.userid,
					memberId: response.data.member_id,
					landImprovement: response.data.land_improvement,
					landImprovementCosts: response.data.land_improvement_costs,
					typeOfSeedName: response.data.type_of_seed_name,
					typeOfSeedBedsNo: response.data.type_of_seed_beds_no,
					typeOfSeedCost: response.data.type_of_seed_cost,
					typeOfSeedBuyShop: response.data.type_of_seed_buy_shop,
					manureName: response.data.manure_name,
					manureBedsNo: response.data.manure_beds_no,
					manureCost: response.data.manure_cost,
					manureManpower: response.data.manure_manpower,
					manureBuyShop: response.data.manure_buy_shop,
					pesticidesType: response.data.pesticides_type,
					pesticidesFrequencyOfSpraying: response.data.pesticides_frequency_of_spraying,
					pesticidesManpower: response.data.pesticides_manpower,
					pesticidesCost: response.data.pesticides_cost,
					pesticidesBuyShop: response.data.pesticides_buy_shop,
					typesOfCropsGrownAndAcreage: response.data.types_of_crops_grown_and_acreage,
					harvestingAndThreshingOwn: response.data.harvesting_and_threshing_own,
					harvestingAndThreshingRental: response.data.harvesting_and_threshing_rental,
					harvestingAndThreshingType: response.data.harvesting_and_threshing_type,
					harvestingAndThreshingManpower: response.data.harvesting_and_threshing_manpower,
					harvestingAndThreshingSavingsCosts: response.data.harvesting_and_threshing_savings_costs,
					harvestingAndThreshingDeviceName: response.data.harvesting_and_threshing_device_name,
					oneAcreOutput: response.data.one_acre_output,
					totalYield: response.data.total_yield,
					salesFairOrDealer: response.data.sales_fair_or_dealer,
					salesFairOrDealerPriceReceived: response.data.sales_fair_or_dealer_price_received,
					isLoan: response.data.isloan,
					loanPerson: response.data.loan_person,
					isSeedLoan: response.data.is_seed_loan,
					seenLoanPerson: response.data.seen_loan_person,
					isFertilizerLoan: response.data.is_fertilizer_loan,
					fertilizerLoanPerson: response.data.fertilizer_loan_person,
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
					<UpdateForm defaultValues={crops} originalValues={crops} setEdit={setEdit} />
				) : (
					<div className="container mx-auto space-y-14">
						<h1 className="text-4xl font-bold text-center">စိုက်ပျိုးသီးနှံအချက်အလက်များ</h1>
						<div className="grid grid-cols-2 gap-6">
							{cropLists.map((list, index) => (
								<div className="grid grid-cols-12" key={index}>
									<p className="col-span-5">{list.title}</p>
									<p className="col-span-1">-</p>
									<p className="col-span-6">{list.dbname}</p>
								</div>
							))}
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
