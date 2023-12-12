"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";

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
		accessorKey: "timeValue",
		header: "ကာလတန်ဖိုး",
	}
];
