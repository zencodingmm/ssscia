"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
	const [users, setUsers] = useState([]);
	const data = [
		{
			id: "1",
			user_name: "JohnDoe",
			email: "john.doe@example.com",
			phone_no: "123-456-7890",
			address: "123 Main Street",
		},
		{
			id: "2",
			user_name: "JaneSmith",
			email: "jane.smith@example.com",
			phone_no: "987-654-3210",
			address: "456 Oak Avenue",
		},
		{
			id: "3",
			user_name: "BobJohnson",
			email: "bob.johnson@example.com",
			phone_no: "555-123-4567",
			address: "789 Elm Road",
		},
		{
			id: "4",
			user_name: "AliceWilliams",
			email: "alice.williams@example.com",
			phone_no: "333-888-5555",
			address: "101 Pine Lane",
		},
		{
			id: "5",
			user_name: "CharlieBrown",
			email: "charlie.brown@example.com",
			phone_no: "777-999-4444",
			address: "202 Cedar Street",
		},
		{
			id: "6",
			user_name: "EvaDavis",
			email: "eva.davis@example.com",
			phone_no: "444-777-6666",
			address: "303 Maple Court",
		},
	];

	useEffect(() => {
		const hideComponent = () => {
			const component = document.getElementById("componentToHide");
			if (component) {
				component.style.display = "none";
			}
		};

		const showComponent = () => {
			const component = document.getElementById("componentToHide");
			if (component) {
				component.style.display = "block";
			}
		};

		if (window.matchMedia) {
			const mediaQueryList = window.matchMedia("print");
			mediaQueryList.addListener((mql) => {
				if (mql.matches) {
					hideComponent();
				} else {
					showComponent();
				}
			});
		}

		// For older browsers that don't support matchMedia
		window.onbeforeprint = hideComponent;
		window.onafterprint = showComponent;

		return () => {
			window.onbeforeprint = null;
			window.onafterprint = null;
		};
	}, []);

	axios
		.get("http://localhost:4000/api/users")
		.then((response) => setUsers(response.data))
		.catch((err) => console.log(err));
	return (
		<div className="container">
			<div className="w-full flex items-center justify-end">
				<Button onClick={() => window.print()} id="componentToHide">
					Export as PDF
				</Button>
			</div>
			<table className="w-full border-2 rounded-lg mt-4">
				<thead>
					<tr>
						<th className="py-2 border-2">Name</th>
						<th className="py-2 border-2">email</th>
						<th className="py-2 border-2">Phone no</th>
						<th className="py-2 border-2">Address</th>
					</tr>
				</thead>
				<tbody>
					{data.map((user: any, index) => {
						return (
							<tr className="border" key={index}>
								<td className="py-2 pl-3 border-2">{user?.user_name}</td>
								<td className="py-2 pl-3 border-2">{user?.email}</td>
								<td className="py-2 pl-3 border-2">{user?.phone_no}</td>
								<td className="py-2 pl-3 border-2">{user?.address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Page;
