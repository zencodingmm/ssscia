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

const formSchema = z.object({
	userName: z.string().min(2, {
		message: "Name must be at least 2 characters",
	}),
	phoneNo: z.string().min(10, { message: "Must be a valid mobile number" }).max(14, { message: "Must be a valid mobile number" }),
	address: z.string().min(2, {
		message: "Address must be at least two characters.",
	}),
});

const UpdateForm = ({
	defaultValues,
	originalValues,
}: {
	defaultValues:
		| {
				userName: string;
				phoneNo: string;
				address: string;
		  }
		| any;
	originalValues: any;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});
	const router = useRouter();

	function onSubmit(values: z.infer<typeof formSchema>) {
		const formValues: any = {
			user_name: values.userName,
			password: originalValues.password,
			phone_no: values.phoneNo,
			email: originalValues.email,
			address: values.address,
			user_type: originalValues.userType,
		};

		axios
			.put(`http://localhost:4000/api/users/${originalValues.userID}`, formValues, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data) {
					router.push(`/dashboard/profile`);
					toast("Updated profile successfully");
				}
			})
			.catch((err) => {
				toast("Something went wrong!");
			});
	}

	return (
		<div className="container max-w-screen-sm mx-auto p-10 shadow-lg rounded-xl flex flex-col gap-8 justify-center items-center">
			<h1 className="text-4xl font-bold">ကိုယ်‌ရေးအကျဉ်းပြင်ဆင်ခြင်း</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-4">
					<FormField
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အမည်</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phoneNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဖုန်းနံပါတ်</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>နေရပ်လိပ်စာ</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex justify-end">
						<Button type="submit" className="bg-green-800 hover:bg-green-700 w-full h-[50px] text-base">
							အတည်ပြုမည်
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default UpdateForm;
