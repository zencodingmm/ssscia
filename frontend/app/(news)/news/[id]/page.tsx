/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Link from 'next/link';

const NewsPage = ({
					  params,
				  }: {
	params: {
		id: number;
	};
}) => {
	const [data, setData] = useState({
		id: '',
		title: '',
		description: '',
		images: '',
		links: '',
		createdAt: '',
	});
	const [fetched, setFetched] = useState(false);
	const [recentNews, setRecentNews] = useState([]);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	function fetchPostByCategory(category_id: any) {
		axios
			.get(`http://localhost:4000/api/posts?cattype=1&category_id=${category_id}`)
			.then(response => {
				const { posts } = response.data;

				setLoading(true);
				setPosts(posts);
				setLoading(false);
			})
			.catch(() => setError(true));
	}

	function fetchPost() {
		axios
			.get('http://localhost:4000/api/posts?cattype=1')
			.then(response => {
				const { posts } = response.data;

				console.log(response.data);
				setLoading(true);
				setRecentNews(posts);
				setPosts(posts);
				setLoading(false);
			})
			.catch(() => setError(true));
	}

	function fetchCategory() {
		axios
			.get('http://localhost:4000/api/categories/news/type?type=1')
			.then(response => {
				setLoading(true);
				setCategories(response.data);
				setLoading(false);
			})
			.catch(err => setError(true));
	}

	useEffect(() => {
		fetchPost();
		fetchCategory();
	}, []);

	useEffect(() => {
		setFetched(false);
		axios
			.get(`http://localhost:4000/api/posts/${params.id}`)
			.then(response => {
				setData(response.data);
				setFetched(true);
			})
			.catch(err => {
				setFetched(false);
			});
	}, [params.id]);

	if (!fetched) return <div className="flex items-center justify-center ">Loading...</div>;

	return (
		<div className="w-full px-0 md:px-10 lg:px-20 hoverflow-hidden flex flex-col lg:flex-row gap-6">
			<div className="w-full lg:w-8/12 shadow-xl rounded-md p-4 md:p-8 overflow-y-auto h-screen">
				<img
					src={`http://localhost:4000/uploads/posts/${data.images}`}
					className="w-full h-[450px] object-cover"
					alt={data.images}
				/>
				<h2 className="text-xl font-bold my-2">{data.title}</h2>
				<p className="text-sm text-gray-400 my-2">{format(new Date(data.createdAt), 'MMMM dd, yyyy')}</p>
				<div
					dangerouslySetInnerHTML={{ __html: data.description }}
					className="text-justify my-2"
				/>

				{data.links !== 'undefined' && (
					<a
						href={data.links}
						className="text-sm text-blue-500">
						{data.links}
					</a>
				)}
			</div>
			<div className="w-full lg:w-4/12">
				<div className="p-5 md:p-8 rounded-md shadow-lg space-y-5 h-screen">
					{/* <div>
				<h1 className="text-xl font-bold mb-2">သတင်းအချက်အလက်ရှာဖွေမည်</h1>
				<div className="flex items-center w-full h-[40px] ">
					<input
						type="text"
						className=" border w-10/12 h-full rounded-l-md outline-none p-2"
					/>
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
								<Link
									href={""}
									key={idx}
									className="hover:text-orange-600 duration-300"
                                    onClick={() => fetchPostByCategory(cat.id)}
								>
									{cat.description}
								</Link>
							);
						})
					)}
				</div>
			</div> */}
					<div>
						<h1 className="text-xl font-bold mb-2">လက်တလောသတင်းများ</h1>
						<div className="space-y-1 overflow-y-auto h-screen border-3">
							{recentNews.length == 0 ? (
								<p>No posts.</p>
							) : (
								recentNews.map((n: any, index: number) => {
									return (
										<div
											key={index}
											className="flex items-start gap-2 border p-2 w-full">
											<Image
												src={`http://localhost:4000/uploads/posts/${n.images}`}
												width={100}
												height={100}
												alt="local news img"
											/>

											<Link href={`/news/${n.id}`}>
												<div
													dangerouslySetInnerHTML={{
														__html: n.title,
													}}
													className="font-bold text-sm line-clamp-3 hover:text-red-500"
												/>
											</Link>
										</div>
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

export default NewsPage;
