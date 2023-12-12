"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore, { AuthStore } from "@/lib/store";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email",
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
});

const AdminLoginPage = () => {
	const { adminLoggedIn, setAdminLoggedIn } = useAuthStore();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		axios
			.post("http://localhost:4000/api/admin", values, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data.message == "success") {
					setAdminLoggedIn(true);
					router.push(`/admin/dashboard`);
				} else {
					toast("Invalid email and password. Try again");
				}
			})
			.catch((err) => {
				toast("Something went wrong!");
			});
	}

	if (adminLoggedIn)
		return (
			<div aria-label="Loading..." role="status" className="flex items-center justify-center space-x-2 h-[400px]">
				<svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
					<line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
					<line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
				</svg>
				<span className="text-4xl font-medium text-gray-500">Loading...</span>
			</div>
		);

	return (
		<div className="max-w-[400px] mx-auto flex flex-col gap-8  items-center shadow-lg rounded-xl p-10">
			<h1 className="text-4xl font-bold">Admin Login</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-center">
						<Button type="submit" className="bg-green-800 hover:bg-green-700 w-full h-[50px] text-base">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AdminLoginPage;
