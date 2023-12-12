"use client";



import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Categories = {
	dbId: number;
	id: string;
	cat_type: string
	description: string;
};



export const columns: ColumnDef<Categories>[] = [
	{
		id: "actions",
		cell: ({ row }) => {
			const category = row.original;
			return <CellAction data={category} />
		},
	},
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "cat_type",
		header: "Type"
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	
];
