"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Cropfactors = {
	id: number;
	userId: string;
	memberId: string;
	landImprovement: string;
	landImprovementCosts: string;
	typeOfSeedName: string;
	typeOfSeedBedsNo: string;
	typeOfSeedCost: string;
	typeOfSeedBuyShop: string;
	manureName: string;
	manureBedsNo: string;
	manureCost: string;
	manureManpower: string;
	manureBuyShop: string;
	pesticidesType: string;
	pesticidesFrequencyOfSpraying: string;
	pesticidesManpower: string;
	pesticidesCost: string;
	pesticidesBuyShop: string;
	typesOfCropsGrownAndAcreage: string;
	harvestingAndThreshingOwn: string;
	harvestingAndThreshingRental: string;
	harvestingAndThreshingType: string;
	harvestingAndThreshingManpower: string;
	harvestingAndThreshingSavingsCosts: string;
	harvestingAndThreshingDeviceName: string;
	oneAcreOutput: string;
	totalYield: string;
	salesFairOrDealer: string;
	salesFairOrDealerPriceReceived: string;
	isLoan: boolean;
	loanPerson: string;
	isSeedLoan: boolean;
	seenLoanPerson: string;
	isFertilizerLoan: boolean;
	fertilizerLoanPerson: string;
};

export const columns: ColumnDef<Cropfactors>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const cropfactor = row.original;
			return <CellAction data={cropfactor} />;
		},
	},
	{
		accessorKey: "userId",
		header: "ကိုယ်ပိုင်အမှတ်",
	},
	{
		accessorKey: "memberId",
		header: "အသင်းဝင်အမှတ်",
	},
	{
		accessorKey: "landImprovement",
		header: "မြေယာပြုပြင်ခြင်း",
	},
	{
		accessorKey: "landImprovementCosts",
		header: "ကုန်ကျစရိတ်",
	},
	{
		accessorKey: "typeOfSeedName",
		header: "မျိုးစေ့အမည်",
	},
	{
		accessorKey: "typeOfSeedBedsNo",
		header: "အိတ်ရေ",
	},
	{
		accessorKey: "typeOfSeedCost",
		header: "ကုန်ကျစရိတ်",
	},
	{
		accessorKey: "typeOfSeedBuyShop",
		header: "ဆိုင်/ပွဲရုံ",
	},
	{
		accessorKey: "manureName",
		header: "မြေသြဇာအမည်",
	},
	{
		accessorKey: "manureBedsNo",
		header: "အိတ်ရေ",
	},
	{
		accessorKey: "manureCost",
		header: "ကုန်ကျစရိတ်",
	},
	{
		accessorKey: "manureBuyShop",
		header: "ဆိုင်/ပွဲရုံ",
	},
	{
		accessorKey: "manureManpower",
		header: "လူအင်အား",
	},
	{
		accessorKey: "pesticidesType",
		header: "ပိုးသတ်ဆေးအမည်",
	},
	{
		accessorKey: "pesticidesFrequencyOfSpraying",
		header: "ဆေးဖြန်းသည့်အကြိမ်ရေ",
	},
	{
		accessorKey: "pesticidesManpower",
		header: "လူအင်အား",
	},
	{
		accessorKey: "pesticidesCost",
		header: "ကုန်ကျစရိတ်",
	},
	{
		accessorKey: "pesticidesBuyShop",
		header: "ဆိုင်/ပွဲရုံ",
	},
	{
		accessorKey: "typesOfCropsGrownAndAcreage",
		header: "စိုက်သည့်သီးနှံနှင့်စိုက်ဧက",
	},
	{
		accessorKey: "harvestingAndThreshingOwn",
		header: "ရိတ်သိမ်းခြွေလှေ့ခြင်း(ကိုယ်တိုင်)",
	},
	{
		accessorKey: "harvestingAndThreshingRental",
		header: "ရိတ်သိမ်းခြွေလှေ့ခြင်း(အငှား)",
	},
	{
		accessorKey: "harvestingAndThreshingType",
		header: "ရိတ်သိမ်းခြွေလှေ့ခြင်း(စက်အမျိုးအစား)",
	},
	{
		accessorKey: "harvestingAndThreshingManpower",
		header: "ရိတ်သိမ်းခြွေလှေ့ခြင်း(လူအင်အား)",
	},
	{
		accessorKey: "harvestingAndThreshingSavingsCosts",
		header: "ရိတ်သိမ်းခြွေလှေ့ခြင်း(စရိတ်)",
	},
	{
		accessorKey: "harvestingAndThreshingDeviceName",
		header: "ရိတ်သိမ်းခြွေလှေ့ခြင်း(စက်ပိုင်အမည်)",
	},
	{
		accessorKey: "oneAcreOutput",
		header: "တစ်ဧကထွက်နှုန်း",
	},
	{
		accessorKey: "totalYield",
		header: "စုစုပေါင်းထွက်နှုန်း",
	},
	{
		accessorKey: "salesFairOrDealer",
		header: "ရောင်းသည့်ပွဲရုံ/ကုန်သည်",
	},
	{
		accessorKey: "salesFairOrDealerPriceReceived",
		header: "ရရှိသည့်စျေး(ပိသာ)",
	},
	{
		accessorKey: "isLoan",
		header: "ချေးငွေ",
	},
	{
		accessorKey: "loanPerson",
		header: "ငွေချေးယူသည့်ပုဂ္ဂိုလ်",
	},
	{
		accessorKey: "isSeedLoan",
		header: "မျိုးစေ့",
	},
	{
		accessorKey: "seenLoanPerson",
		header: "မျိုးစေ့ချေးယူသည့်ပုဂ္ဂိုလ်",
	},
	{
		accessorKey: "isFertilizerLoan",
		header: "မြေသြဇာ",
	},
	{
		accessorKey: "fertilizerLoanPerson",
		header: "မြေသြဇာချေးယူသည့်ပုဂ္ဂိုလ်",
	},
];
