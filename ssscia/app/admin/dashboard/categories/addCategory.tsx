"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const saveCategory = (catType: string, categoryName: string) => {
	axios
		.post("http://localhost:4000/api/categories", {
			cat_type: catType,
			description: categoryName,
		})
		.then((response) => {})
		.catch((err) => {
			console.log(err);
		});
};

export function AddNewCategory() {
	const [categoryName, setCategoryName] = useState("");
	const [catType, setCategoryType] = useState("1");
	const router = useRouter();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex gap-2 items-center justify-start text-white bg-black hover:text-white hover:bg-black/80">
					<AiOutlinePlusCircle className="w-4 h-4" />
					Add new
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add new category</DialogTitle>
					<DialogDescription>Add a new category here. Click save when you are done.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="catType" className="text-right">
							Type
						</Label>
						<select className="col-span-3 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setCategoryType(e.target.value)} id="catType" defaultValue={1}>
							<option value={1}>သတင်း</option>
							<option value={2}>ဝန်ဆောင်မှု</option>
							<option value={3}>အသင်းအဖွဲ့</option>
							<option value={4}>အကြောင်း</option>
						</select>
					</div>
				</div>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Category
						</Label>
						<Input
							id="category"
							defaultValue={categoryName}
							className="col-span-3"
							onChange={(e) => {
								setCategoryName(e.target.value);
							}}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="submit"
							onClick={() => {
								saveCategory(catType, categoryName);
								setCategoryName("");
								setCategoryType("1");
								router.refresh();
								router.push("/admin/dashboard/categories");
							}}
						>
							Save
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
