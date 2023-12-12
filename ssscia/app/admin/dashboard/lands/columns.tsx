"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
	dbId: number;
	userId: number;
	memberId: string;
	numberOfMap: string;
	own: string;
	rent: string;
	acreAge: string;
	pitchNo: string;
	ownershipNo: string;
	landType: string;
	acresOfLandOwned: string;
	acresOfLandGround: string;
	formSevenFormOnehundredfiveAcresOfContract: string;
	formSevenAcresOfApplied: string;
	namesOfNeighborOfFarmEast: string;
	namesOfNeighborOfFarmWest: string;
	namesOfNeighborOfFarmSouth: string;
	namesOfNeighborOfFarmNorth: string;
	numberOfFamilyMembersByGrandparents: string;
	applyFamilyOneName: string;
	applyFamilyOneNrc: string;
	applyFamilyTwoName: string;
	applyFamilyTwoNrc: string;
	timeValue: string;
};

export const columns: ColumnDef<Users>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const landlist = row.original;
			// const router = useRouter();

			return <CellAction data={landlist} />;
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
		accessorKey: "numberOfMap",
		header: "မြေပုံနံပါတ်",
	},
	{
		accessorKey: "own",
		header: "ကိုယ်ပိုင်",
	},
	{
		accessorKey: "rent",
		header: "အငှား",
	},
	{
		accessorKey: "acreAge",
		header: "စိုက်ဧက",
	},
	{
		accessorKey: "pitchNo",
		header: "ကွင်းအမှတ်",
	},
	{
		accessorKey: "ownershipNo",
		header: "ဦးပိုင်အမှတ်",
	},
	{
		accessorKey: "landType",
		header: "မြေအမျိုးအစား",
	},
	{
		accessorKey: "acresOfLandOwned",
		header: "ပိုင်ဆိုင်သည့်မြေဧက",
	},
	{
		accessorKey: "acresOfLandGround",
		header: "မြေပြင်ရှိမြေဧက",
	},
	{
		accessorKey: "formSevenFormOnehundredfiveAcresOfContract",
		header: "ပုံစံ(၇)/(၁၀၅)စာချုပ်ပါမြေဧက",
	},
	{
		accessorKey: "formSevenAcresOfApplied",
		header: "ပုံစံ(၇)လျှောက်ထားလိုသည့်မြေဧက",
	},
	{
		accessorKey: "namesOfNeighborOfFarmEast",
		header: "တောင်သူအမည်(အရှေ့ဘက်)",
	},
	{
		accessorKey: "namesOfNeighborOfFarmWest",
		header: "တောင်သူအမည်(အနောက်ဘက်)",
	},
	{
		accessorKey: "namesOfNeighborOfFarmSouth",
		header: "တောင်သူအမည်(တောင်ဘက်)",
	},
	{
		accessorKey: "namesOfNeighborOfFarmNorth",
		header: "တောင်သူအမည်(မြောက်ဘက်)",
	},
	{
		accessorKey: "numberOfFamilyMembersByGrandparents",
		header: "မိသားစုဝင်အရေအတွက်",
	},
	{
		accessorKey: "applyFamilyOneName",
		header: "ထောက်ခံမည့်မိသားစုဝင်(၁) အမည်",
	},
	{
		accessorKey: "applyFamilyOneNrc",
		header: "ထောက်ခံမည့်မိသားစုဝင်(၁) မှတ်ပုံတင်အမှတ်",
	},
	{
		accessorKey: "applyFamilyTwoName",
		header: "ထောက်ခံမည့်မိသားစုဝင်(၂) အမည်",
	},
	{
		accessorKey: "applyFamilyTwoNrc",
		header: "ထောက်ခံမည့်မိသားစုဝင်(၂) မှတ်ပုံတင်အမှတ်",
	},
	{
		accessorKey: "timeValue",
		header: "ကာလတန်ဖိုး",
	},
	
];
