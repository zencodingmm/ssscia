"use client";
import useAuthStore from "@/lib/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCategory, BiLogOut, BiLogOutCircle } from "react-icons/bi";
import { ImNewspaper } from "react-icons/im";
import { FaMapLocation, FaUsers, FaUsersGear, FaUsersRectangle } from "react-icons/fa6";
import { GiFruitTree } from "react-icons/gi";

import Card from "@/components/admin/card";
import axios from "axios";

const AdminDashboard = () => {
	const [tableCounts, setTableCounts] = useState({
		admin: 0,
		tbl_categories: 0,
		tbl_crop_factors: 0,
		tbl_land_factors: 0,
		tbl_loan_submittion: 0,
		tbl_members: 0,
		tbl_posts: 0,
		tbl_users: 0,
	});
	const [fetched, setFetched] = useState(false);
	const { adminLoggedIn, setAdminLoggedIn } = useAuthStore();

	useEffect(() => {
		axios.get(`http://localhost:4000/api/tablecounts`).then((response) => {
			setFetched(false);
			setTableCounts(response.data);
			setFetched(true);
		});
	}, []);

	if (fetched) {
	}

	if (fetched)
		return (
			<div className="px-8">
				<div className="grid grid-cols-4 gap-4 mt-2">
					<Card name={"CATEGORY"} amount={tableCounts.tbl_categories} icon={<BiCategory className="w-5 h-5" />} />
					<Card name={"Posts"} amount={tableCounts.tbl_posts} icon={<ImNewspaper className="w-5 h-5" />} />
					<Card name={"Users"} amount={tableCounts.tbl_users} icon={<FaUsers className="w-5 h-5" />} />
					<Card name={"Members"} amount={tableCounts.tbl_members} icon={<FaUsersGear className="w-5 h-5" />} />
					<Card name={"Loan Members"} amount={tableCounts.tbl_loan_submittion} icon={<FaUsersRectangle className="w-5 h-5" />} />
					<Card name={"Land list"} amount={tableCounts.tbl_land_factors} icon={<FaMapLocation className="w-5 h-5" />} />
					<Card name={"Crops list"} amount={tableCounts.tbl_crop_factors} icon={<GiFruitTree className="w-5 h-5" />} />
				</div>
			</div>
		);
};

export default AdminDashboard;
