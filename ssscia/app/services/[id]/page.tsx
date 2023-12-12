"use client";
import axios from "axios";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const ServiceCategoryPage = ({
	params,
}: {
	params: {
		id: number;
	};
}) => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	function fetchPostByServiceCategory() {
		const url = `http://localhost:4000/api/posts?cattype=2&category_id=${params.id}`;
		axios
			.get(url)
			.then((response) => {
				setLoading(true);
				setPosts(response.data.posts);
				setTotalPages(response.data.totalPages);
				setError(false);
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
			});
	}

	useEffect(() => {
		fetchPostByServiceCategory();
		fetchCategory();
	}, [id]);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	function fetchPostByCategory(category_id: any) {
		axios
			.get(`http://localhost:4000/api/posts?cattype=2&category_id=${category_id}`)
			.then((response) => {
				console.log(response.data);
				setLoading(true);
				setPosts(response.data.posts);
				setLoading(false);
			})
			.catch((err) => setError(true));
	}

	function fetchCategory() {
		axios
			.get("http://localhost:4000/api/categories/news/type?type=2")
			.then((response) => {
				setLoading(true);
				setCategories(response.data);
				setLoading(false);
			})
			.catch((err) => setError(true));
	}

	if (error) return <div className="flex justify-center items-center">No posts.</div>;
	if (loading) return <div className="flex justify-center items-center">Loading...</div>;

	return (
		<div className="w-full px-0 md:px-10 lg:px-20 hoverflow-hidden flex flex-col lg:flex-row gap-6">
			<div className="w-full lg:w-8/12 shadow-xl rounded-md p-4 md:p-8 overflow-y-auto h-screen">
				{
					// @ts-ignore
					posts.map((n: any, index: number) => {
						const formattedDate = format(new Date(n.createdAt), "MMMM dd, yyyy HH:mm:ss");

						return (
							<div className="space-y-2 w-full" key={index}>
								<div className="grid grid-cols-12 gap-5 border rounded p-4">
									<div className="col-span-12 md:col-span-4 h-[150px]">
										<Image src={`http://localhost:4000/uploads/posts/${n.images}`} width={200} height={150} alt="local news img " className="object-cover w-full h-full" />
									</div>

									<div className="col-span-12 md:col-span-8">
										<h1 className="text-lg font-bold line-clamp-2">{n.title}</h1>
										<p className="text-gray-400 text-xs">{formattedDate}</p>
										<div
											dangerouslySetInnerHTML={{
												__html: n.description,
											}}
											className="line-clamp-2 text-sm text-justify"
										/>
										<div className="flex justify-end mt-2">
											<Link href={`/news/${n.id}`}>
												<button className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-sm text-xs">ပိုမိုသိရှိရန်..</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						);
					})
				}
				{/* Pagination controls */}
				<div className="flex items-center justify-center gap-4 mt-4">
					<button className="border-2 rounded-full p-3 hover:bg-slate-400 disabled:bg-slate-700" onClick={handlePrevPage} disabled={currentPage === 1}>
						<GrLinkPrevious className="w-4 h-4" />
					</button>
					<button className="border-2 rounded-full p-3 hover:bg-slate-400 disabled:bg-slate-700" onClick={handleNextPage} disabled={currentPage === totalPages}>
						<GrLinkNext className="w-4 h-4" />
					</button>
				</div>
			</div>

			<div className="w-full lg:w-4/12">
				<div className="p-8 rounded-md shadow-lg space-y-5 h-screen">
					<div>
						<h1 className="text-xl font-bold mb-2">သတင်းအမျိုးအစားများ</h1>
						<div className="flex flex-col gap-3 h-[200px] overflow-y-auto">
							{categories.length == 0 ? (
								<p>No category</p>
							) : (
								categories.map((cat: any, idx: number) => {
									return (
										<Link href={""} key={idx} className="hover:text-orange-600 duration-300" onClick={() => fetchPostByCategory(cat.id)}>
											{cat.description}
										</Link>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceCategoryPage;
