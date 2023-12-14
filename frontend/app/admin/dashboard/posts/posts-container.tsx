"use client";
import React, { useEffect, useState } from "react";
import NewsCard from "./components/post-card";
import axios from "axios";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";

const PostsContainer = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [posts, setPosts] = useState([]);
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchposts = async (page: number, description: any = false) => {
		let url = `http://localhost:4000/api/posts?page=${page}`;

		if (description) {
			url += `&description=${description}`;
		}
		try {
			const response = await axios.get(url);
			setLoading(true);
			const { posts, totalPages } = response.data;
			setPosts(posts);
			setTotalPages(totalPages);
			setLoading(false);
		} catch (error) {
			setError(true);
		}
	};

	const deletePost = (id: number) => {
		axios
			.delete(`http://localhost:4000/api/posts/${id}`)
			.then((response) => {
				if (response.status === 200) {
					fetchposts(currentPage);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchposts(currentPage);
	}, [currentPage]);

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

	if (loading) return <div className="flex items-center justify-center">Loading ....</div>;

	if (error) return <div className="flex items-center justify-center">Something went wrong!</div>;

	return (
		<div>
			<div className="flex items-center justify-center h-[40px] mb-8">
				<input
					type="text"
					className=" border h-full rounded-l-md outline-none p-2 w-[400px]"
					value={description}
					onChange={(e) => {
						setCurrentPage(1);
						setDescription(e.target.value);
						fetchposts(currentPage, e.target.value);
					}}
				/>
				<button
					className="bg-orange-600 hover:bg-orange-500 text-white h-full p-3 text-whiteh-full grid place-items-center rounded-r-md"
					onClick={() => {
						setCurrentPage(1);
						fetchposts(currentPage, description);
						setDescription("");
					}}
				>
					<IoSearch />
				</button>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{posts.length > 0 ? (
					posts.map((post: any, index: number) => {
						return <NewsCard key={index} id={post.id} title={post.title} description={post.description} images={post.images} links={post.links} createdAt={post.createdAt} deletePost={deletePost} />;
					})
				) : (
					<div className="flex items-center justify-center m-6">No posts.</div>
				)}
			</div>

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
	);
};

export default PostsContainer;
