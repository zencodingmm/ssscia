import React from "react";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

import Img1 from "@/public/news/local-1.jpg";

async function getNews() {
	try {
		const response = await fetch(`http://localhost:4000/api/posts`, {
			next: {
				revalidate: 0,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch news");
		}

		return response.json();
	} catch (error: any) {
		console.error("Error fetching news:", error.message);
		return [];
	}
}

async function getNewsCategories() {
	try {
		const response = await fetch(`http://localhost:4000/api/categories/news/type?type=1`, {
			next: {
				revalidate: 0,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch news");
		}

		return response.json();
	} catch (error: any) {
		console.error("Error fetching news:", error.message);
		return [];
	}
}

export default async function NewsNav() {
	const categories = await getNewsCategories();
	const news: any = await getNews();

	return (
		<div className="p-8 rounded-md shadow-lg space-y-5 h-screen">
			<div>
				<h1 className="text-xl font-bold mb-2">သတင်းအချက်အလက်ရှာဖွေမည်</h1>
				<div className="flex items-center w-full h-[40px] ">
					<input type="text" className=" border w-10/12 h-full rounded-l-md outline-none p-2" />
					<button className="bg-orange-600 hover:bg-orange-500 text-white w-2/12 h-full grid place-items-center rounded-r-md">
						<IoSearch />
					</button>
				</div>
			</div>
			<div>
				<h1 className="text-xl font-bold mb-2">သတင်းအမျိုးအစားများ</h1>
				<div className="flex flex-col gap-3">
					{categories.length == 0 ? (
						<p>No category</p>
					) : (
						categories.map((cat: any, idx: number) => {
							return (
								<Link href={""} key={idx} className="hover:text-orange-600 duration-300">
									{cat.description}
								</Link>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
}
