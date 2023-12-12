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
	userid: number,
	user_name: string;
	email: string;
	phone_no: string;
	address: string;
};

export const columns: ColumnDef<Users>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const category = row.original;

			return (
				<CellAction data={category}/>
			);
		},
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "user_name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === "asc")
					}
				>
					Username
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone_no",
		header: "Phone",
	},
	{
		accessorKey: "address",
		header: "Address",
	}
];
