"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import UpdateForm from "./form";

const Page = ({
	params,
}: {
	params: {
		id: number;
	};
}) => {
	const [initialValues, setInitialValues] = useState({});
	const [fetched, setFetched] = useState(false);

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
	}, [params.id]);

	if (fetched) {
		return <UpdateForm defaultValues={initialValues} originalValues={initialValues} />;
	}
};

export default Page;
