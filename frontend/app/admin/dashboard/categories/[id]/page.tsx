"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({
	params,
}: {
	params: {
		id: number;
	};
}) {
	const [category, setCategory] = useState(null);
	const [fetched, setFetched] = useState(false);
	const [categoryValue, setCategoryValue] = useState("");
	const router = useRouter();
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/categories/${params.id}`)
			.then((response) => {
				setFetched(false);
				setCategory(response.data);
				setCategoryValue(response.data.description);
				setFetched(true);
			})
			.catch((err) => console.log(err));
	}, [params.id]);

	function updateCategory() {
		axios
			.put(`http://localhost:4000/api/categories/${params.id}`, {
				description: categoryValue,
			})
			.then((response) => {
				router.push(`/admin/dashboard/categories`);
				router.refresh();
			})
			.catch((err) => console.log(err));
	}

	if (fetched)
		return (
			<div className="container max-w-screen-sm flex flex-col gap-4">
				<h1 className="text-4xl font-bold text-center mb-10">Update Category</h1>
				<label className="block text-gray-700 text-sm font-bold" htmlFor="category">
					Edit Category
				</label>
				<input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)} />
				<Button onClick={updateCategory}>Save Changes</Button>
			</div>
		);
}
