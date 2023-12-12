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

const LoginPage = () => {
	const { loggedIn, setLoggedIn, setUserID } = useAuthStore();
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (loggedIn) {
			setMounted(false);
			router.push("/dashboard");
		} else {
			setMounted(true);
		}
	}, [loggedIn, router]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		axios
			.post(`http://localhost:4000/api/auth/login`, values, {
				withCredentials: true,
			})
			.then((response) => {
				setUserID(response.data.userid);
				setLoggedIn(true);
				toast("Logged in successfully!");
				router.push(`/dashboard`);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	if (!mounted) {
		return null;
	}

	return (
		<div className="max-w-[400px] mx-auto p-10 shadow-lg rounded-xl flex flex-col gap-8 justify-center items-center">
			<h1 className="text-4xl font-bold">Login</h1>
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

export default LoginPage;
