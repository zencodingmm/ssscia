import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PostsContainer from "./posts-container";

export const revalidate = 0;
const Posts = async () => {
	return (
		<div className="container flex flex-col justify-center items-center">
			<h1 className="text-4xl font-bold mb-8">Posts</h1>
			<div className="w-full flex justify-end items-center">
				<Link href={`/admin/dashboard/posts/new`}>
					<Button className="flex gap-2 items-center justify-center">Create Post</Button>
				</Link>
			</div>
			<div className="mt-4">
				<PostsContainer />
			</div>
		</div>
	);
};

export default Posts;
