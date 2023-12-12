"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

const NewsContainer = () => {
	const [categoriesFetched, setCategoriesFetched] = useState(false);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	function fetchPostByCategory(category_id: any) {
		axios
			.get(`http://localhost:4000/api/posts?cattype=1&category_id=${category_id}`)
			.then((response) => {
				console.log(response.data);
				setLoading(true);
				setPosts(response.data.posts);
				setLoading(false);
			})
			.catch((err) => setError(true));
	}

	function fetchPost() {
		axios
			.get("http://localhost:4000/api/posts?cattype=1")
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
			.get("http://localhost:4000/api/categories/news/type?type=1")
			.then((response) => {
				setLoading(true);
				setCategories(response.data);
				setLoading(false);
			})
			.catch((err) => setError(true));
	}

	useEffect(() => {
		fetchPost();
		fetchCategory();
	}, []);

	if (error) return <div className="flex items-center justify-center text-red-700 p-6 m-6">Something went wrong!</div>;
	if (loading) return <div className="flex items-center justify-center p-6 m-6">Loading ...</div>;
	return (
		<div>
			<div className="flex flex-wrap items-center pt-10 justify-center">
				<button
					className="text-green-800 hover:bg-green-800 hover:text-white text-sm me-1 mb-1 px-4 py-2 rounded-full duration-300 focus:bg-green-800 focus:text-white"
					onClick={() => {
						fetchPost();
					}}
				>
					လက်တလော
				</button>
				{categories
					? categories.map((category: any, index: number) => {
							return (
								<button
									key={index}
									className="text-green-800 hover:bg-green-800 hover:text-white focus:bg-green-800 focus:text-white text-sm me-1 mb-1 px-4 py-2 rounded-full duration-300"
									onClick={() => {
										fetchPostByCategory(category.id);
									}}
								>
									{category.description}
								</button>
							);
					  })
					: null}
			</div>
			<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] overflow-hidden">
				{posts.length > 0 ? (
					posts.map((post: any, index: number) => {
						return <NewsCard key={index} id={post.id} description={post.description} images={`http://localhost:4000/uploads/posts/${post.images}`} title={post.title} createdAt={post.createdAt} links={post.links} />;
					})
				) : (
					<div className="flex col-span-3 items-center justify-center p-6 m-6">No posts.</div>
				)}
			</div>
		</div>
	);
};

export default NewsContainer;
