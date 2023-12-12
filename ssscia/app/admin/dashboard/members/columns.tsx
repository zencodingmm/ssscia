"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
	id: string;
	dbId: string;
	user_id: string;
	member_id: string;
	first_name: string;
	last_name: string;
	father_name: string;
	education: string;
	ethnicity: string;
	religion: string;
	nrc: string;
	company_name: string;
	company_address: string;
	corn_business_life: string;
	home_address: string;
	email_address: string;
	home_no: string;
	home_street: string;
	home_quater: string;
	home_village: string;
	home_township: string;
	home_division_state: string;
	number_of_siblings: string;
	phone_no: string;
	bank_acc_no: string;
	bank_name: string;
	payment_app_number: string;
	payment_app_type: string;
};

export const columns: ColumnDef<Users>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const member = row.original;
			// const router = useRouter();

			return <CellAction data={member} />;
		},
	},
	{
		accessorKey: "id",
		header: "စဉ်",
	},
	{
		accessorKey: "user_id",
		header: "ကိုယ်ပိုင်အမှတ်",
	},
	{
		accessorKey: "member_id",
		header: "အသင်းဝင်အမှတ်",
	},

	{
		accessorKey: "first_name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
					className="text-xs font-bold"
				>
					အမည်
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "last_name",
		header: "အခြားအမည်",
	},
	{
		accessorKey: "father_name",
		header: "အဖအမည်",
	},
	{
		accessorKey: "education",
		header: "ပညာအရည်အချင်း",
	},
	{
		accessorKey: "ethnicity",
		header: "လူမျိုး",
	},
	{
		accessorKey: "religion",
		header: "ယုံကြည်ကိုးကွယ်မှု",
	},
	{
		accessorKey: "nrc",
		header: "မှတ်ပုံတင်နံပါတ်",
	},
	{
		accessorKey: "company_name",
		header: "ကုမ္ပဏီအမည်",
	},
	{
		accessorKey: "company_address",
		header: "ကုမ္ပဏီလိပ်စာ",
	},
	{
		accessorKey: "corn_business_life",
		header: "ပြောင်းစိုက်ပျိုးမှုသက်တမ်း",
	},
	{
		accessorKey: "email_address",
		header: "အီးမေးလ်လိပ်စာ",
	},
	{
		accessorKey: "home_address",
		header: "နေရပ်လိပ်စာ",
	},
	{
		accessorKey: "home_no",
		header: "အိမ်အမှတ်",
	},
	{
		accessorKey: "home_street",
		header: "လမ်းအမည်",
	},
	{
		accessorKey: "home_quater",
		header: "ရပ်ကွက်",
	},
	{
		accessorKey: "home_village",
		header: "ကျေးရွာ",
	},
	{
		accessorKey: "home_township",
		header: "မြို့",
	},
	{
		accessorKey: "home_division_state",
		header: "တိုင်းဒေသကြီး",
	},
	{
		accessorKey: "number_of_siblings",
		header: "မိသားစုဝင်ဦးရေ",
	},
	{
		accessorKey: "phone_no",
		header: "ဖုန်းနံပါတ်",
	},
	{
		accessorKey: "bank_acc_no",
		header: "ဘဏ်အကောင့်နံပါတ်",
	},
	{
		accessorKey: "bank_name",
		header: "ဘဏ်အမည်",
	},
	{
		accessorKey: "payment_app_number",
		header: "အက်ပ်နံပါတ်",
	},
	{
		accessorKey: "payment_app_type",
		header: "အက်ပ်အမျိုးအစား",
	},
	
];
