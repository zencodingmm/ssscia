"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateForm from "./form";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { FaPrint } from "react-icons/fa6";

const Page = ({
	params,
}: {
	params: {
		id: number;
	};
}) => {
	const [initialValues, setInitialValues] = useState({
		userID: "",
		userName: "",
		password: "",
		phoneNo: "",
		email: "",
		address: "",
		userType: "",
	});
	const [fetched, setFetched] = useState(false);
	const [edit, setEdit] = useState(false);

	// fetch the user with the specified id
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/users/${params.id}`)
			.then((response) => {
				setFetched(false);
				setInitialValues({
					userID: response.data.userid,
					userName: response.data.user_name,
					password: response.data.password,
					phoneNo: response.data.phone_no,
					email: response.data.email,
					address: response.data.address,
					userType: response.data.user_type,
				});
				setFetched(true);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setFetched(true);
			});
	}, [params.id, edit]);

	useEffect(() => {
		const hideComponent = () => {
			const component = document.getElementById("buttons");
			if (component) {
				component.style.visibility = "hidden";
			}
		};

		const showComponent = () => {
			const component = document.getElementById("buttons");
			if (component) {
				component.style.visibility = "visible";
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

	if (fetched)
		return (
			<div>
				{edit ? (
					<UpdateForm defaultValues={initialValues} originalValues={initialValues} setEdit={setEdit} />
				) : (
					<div className="container max-w-screen-sm space-y-14">
						<h1 className="text-4xl font-bold text-center">ကိုယ်ရေးအကျဉ်း</h1>
						<div className="w-3/4 mx-auto space-y-8">
							<div className="grid grid-cols-12 ">
								<p className="col-span-4">အမည်</p>
								<p className="col-span-2">-</p>
								<p className="col-span-6">{initialValues.userName}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">အီးမေးလ်</p>
								<p className="col-span-2">-</p>
								<p className="col-span-6">{initialValues.email}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">ဖုန်းနံပါတ်</p>
								<p className="col-span-2">-</p>
								<p className="col-span-6">{initialValues.phoneNo}</p>
							</div>
							<div className="grid grid-cols-12">
								<p className="col-span-4">လိပ်စာ</p>
								<p className="col-span-2">-</p>
								<p className="col-span-6">{initialValues.address}</p>
							</div>
						</div>
						<div className="flex gap-4 justify-center items-center" id="buttons">
							<Button className="w-[200px] h-[50px] text-base flex gap-2 items-center justify-center bg-green-800 hover:bg-green-700" onClick={() => setEdit(true)}>
								<CiEdit className="w-4 h-4" />
								Edit
							</Button>
							<Button className="w-[200px] h-[50px] text-base flex gap-2 items-center justify-center bg-green-800 hover:bg-green-700" onClick={() => window.print()}>
								<FaPrint className="w-4 h-4" />
								Print
							</Button>
						</div>
					</div>
				)}
			</div>
		);
};

export default Page;
