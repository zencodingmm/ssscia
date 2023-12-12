"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
	data: any;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();

	const deleteUser = async (id: any) => {
		axios
			.delete(`http://localhost:4000/api/loansubmittion/${id}`)
			.then((response) => {
				console.log(response.data);
				router.refresh();
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="flex gap-2 items-center justify-end">
			<Button variant="ghost" className="flex gap-2 items-center justify-start hover:text-cyan-700" onClick={() => router.push(`/admin/dashboard/loanmembers/${data.dbId}`)}>
				<MdUpdate className="w-4 h-4" />
				Update
			</Button>

			<Button
				variant="ghost"
				className="flex gap-2 items-center justify-start hover:text-red-700"
				onClick={() => {
					deleteUser(data.dbId);
				}}
			>
				<AiOutlineDelete className="w-4 h-4" />
				Delete
			</Button>
		</div>
	);
};
