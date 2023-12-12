"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineMail } from "react-icons/md";
import { BsPhone } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email",
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
});

const ContactPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<div className="container w-full lg:w-10/12  mx-auto space-y-10">
			<div className=" px-5 py-10 md:px-10 shadow-lg rounded-md flex flex-col md:flex-row items-center justify-between gap-5">
				<div className="group flex gap-5">
					<div className="w-12 h-12 rounded-full bg-orange-100 grid place-items-center group-hover:bg-orange-600 duration-300">
						<SlLocationPin className="w-6 h-6  text-orange-600 group-hover:text-white duration-300" />
					</div>
					<div className="text-gray-400 text-sm">
						<h1 className="text-xl md:text-2xl text-black mb-1">
							Location :
						</h1>
						<p>A108 Adam Street</p>
						<p>New York, NY 535022</p>
					</div>
				</div>
				<div className="group flex gap-5">
					<div className="w-12 h-12 rounded-full bg-orange-100 grid place-items-center group-hover:bg-orange-600 duration-300">
						<MdOutlineMail className="w-6 h-6  text-orange-600 group-hover:text-white duration-300" />
					</div>
					<div className="text-gray-400 text-sm">
						<h1 className="text-xl md:text-2xl text-black mb-1">Call:</h1>
						<p>A108 Adam Street</p>
						<p>New York, NY 535022</p>
					</div>
				</div>
				<div className="group flex gap-5">
					<div className="w-12 h-12 rounded-full bg-orange-100 grid place-items-center group-hover:bg-orange-600 duration-300">
						<BsPhone className="w-6 h-6  text-orange-600 group-hover:text-white duration-300" />
					</div>
					<div className="text-gray-400 text-sm">
						<h1 className="text-xl md:text-2xl text-black mb-1">
							Location:
						</h1>
						<p>A108 Adam Street</p>
						<p>New York, NY 535022</p>
					</div>
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 px-5 py-10 md:px-10 shadow-lg rounded-md"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormControl>
									<Input
										type="text"
										placeholder="Your Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormControl>
									<Input
										type="email"
										placeholder="Your Email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormControl>
									<Input
										type="text"
										placeholder="Subject"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormControl>
									<Textarea placeholder="Message" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="col-span-2 w-3/6  lg:w-2/6 h-12 text-base mx-auto bg-orange-600 hover:bg-green-900"
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ContactPage;
