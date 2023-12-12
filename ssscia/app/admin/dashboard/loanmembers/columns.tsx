"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LoanMember = {
	dbId: number;
	id: string;
	userId: number;
	memberId: string;
	loanSubmitDate: string;
	loanAmount: string;
	landValueAndAcresToBeInsured: string;
	isApplyPerson: boolean;
	relationshipWithSupporters: string;
	isCurrentCropCultivation: boolean;
	isTakenLoan: boolean;
	proofOfRepayment: string;
	isHealthAndChronicDisease: string;
	supporterOneName: string;
	supporterOneNrc: string;
	supporterOneDob: string;
	supporterOneAge: string;
	supporterOnePlace: string;
	supporterOnePhone: string;
	supporterTwoName: string;
	supporterTwoNrc: string;
	supporterTwoDob: string;
	supporterTwoPlace: string;
	supporterTwoPhone: string;
	healthSupporter: string;
	photographOfLandToBeInsured: string;
};

export const columns: ColumnDef<LoanMember>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const category = row.original;

			return <CellAction data={category} />;
		},
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "userId",
		header: "UserID",
	},
	{
		accessorKey: "memberId",
		header: "MemberID",
	},
	{
		accessorKey: "loanSubmitDate",
		header: "ချေးငွေယူသည့်နေ့",
	},
	{
		accessorKey: "loanAmount",
		header: "ချေးငွေပမာဏ",
	},
	{
		accessorKey: "landValueAndAcresToBeInsured",
		header: "အာမခံထားရှိသည့်မြေတန်ဖိုးနှင့်ဧက",
	},
	{
		accessorKey: "isApplyPerson",
		header: "ထောက်ခံမည့်သူရှိမရှိ",
	},
	{
		accessorKey: "relationshipWithSupporters",
		header: "ထောက်ခံသူများနှင့်တော်စပ်မှု",
	},
	{
		accessorKey: "isCurrentCropCultivation",
		header: "လယ်ယာသီးနှံစိုက်ပျိုးမှုရှိမရှိ",
	},
	{
		accessorKey: "isTakenLoan",
		header: "ချေးငွေရယူဖူခြင်းရှိမရှိ",
	},
	{
		accessorKey: "isHealthAndChronicDisease",
		header: "လက်ရှိကျန်းမာ‌ရေးနှင့်နာတာရှည်ရောဂါရှိမရှိ",
	},
	{
		accessorKey: "supporterOneName",
		header: "ထောက်ခံသူ၏အမည် (ပ)",
	},
	{
		accessorKey: "supporterOneNrc",
		header: "ထောက်ခံသူ(ပ)၏မှတ်ပုံတင်",
	},
	{
		accessorKey: "supporterOneDob",
		header: "ထောက်ခံသူ(ပ)၏မွေးသက္ကရာဇ်",
	},
	{
		accessorKey: "supporterOneAge",
		header: "ထောက်ခံသူ(ပ)၏အသက်",
	},
	{
		accessorKey: "supporterOnePlace",
		header: "ထောက်ခံသူ(ပ)၏ နေရပ်",
	},
	{
		accessorKey: "supporterOnePhone",
		header: "ထောက်ခံသူ(ပ)၏ ဖုန်းနံပါတ်",
	},
	{
		accessorKey: "supporterTwoName",
		header: "ထောက်ခံသူ၏အမည် (ဒု)",
	},
	{
		accessorKey: "supporterTwoNrc",
		header: "ထောက်ခံသူ(ဒု)၏ မှတ်ပုံတင်အမှတ်",
	},
	{
		accessorKey: "supporterTwoDob",
		header: "ထောက်ခံသူ(ဒု)၏ မွေးသက္ကရာဇ်",
	},
	{
		accessorKey: "supporterTwoPlace",
		header: "ထောက်ခံသူ(ဒု)၏ နေရပ်",
	},
	{
		accessorKey: "supporterTwoPhone",
		header: "ထောက်ခံသူ(ဒု)၏ ဖုန်းနံပါတ်",
	},
	{
		accessorKey: "healthSupporter",
		header: "ထောက်ခံသူ၏ကျန်းမာရေး",
	},
	
];
