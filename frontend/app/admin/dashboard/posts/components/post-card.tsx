/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { format } from "date-fns";
import { FiClock } from "react-icons/fi";

const NewsCard = ({ id, title, description, images, links, createdAt, deletePost }: { id: number; title: string; description: string; images: string; links: string; createdAt: string; deletePost: Function }) => {
	const router = useRouter();
	const formattedDate = format(new Date(createdAt), "MMMM dd, yyyy");

	return (
		<div className="relative overflow-hidden bg-slate-100 rounded-sm">
			<div className="flex gap-2 absolute right-1 top-1">
				<Button variant="outline" className="flex items-center rounded-full justify-center hover:text-cyan-700" onClick={() => router.push(`/admin/dashboard/posts/${id}`)}>
					<FaRegEdit className="w-3 h-3" />
				</Button>
				<Button
					variant="outline"
					className="flex items-center bg-none rounded-full justify-center hover:text-red-700"
					onClick={() => {
						deletePost(id);
					}}
				>
					<AiOutlineDelete className="w-3 h-3" />
				</Button>
			</div>
			<img src={`http://localhost:4000/uploads/posts/${images}`} alt="People" className="w-full object-cover h-32 sm:h-48 md:h-64" />
			<div className="p-4 md:p-6 space-y-2">
				<h2 className="font-bold text-xl leading-2 line-clamp-2">{title}</h2>
				<div className="text-sm leading-tight sm:leading-normal overflow-hidden line-clamp-3" dangerouslySetInnerHTML={{ __html: description }} />
				<div className="text-sm flex items-center gap-2 text-gray-400">
					<FiClock />

					<p className="text-xs">{formattedDate}</p>
				</div>
			</div>
		</div>
	);
};

export default NewsCard;
