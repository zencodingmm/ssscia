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
	firstName: z.string().max(100),
	lastName: z.string().max(100),
	fatherName: z.string().max(100),
	dob: z.string().max(100),
	education: z.string().max(100),
	ethnicity: z.string().max(100),
	religion: z.string().max(100),
	nrc: z.string().max(100),
	companyName: z.string().max(100),
	homeAddress: z.string().max(100),
	homeStreet: z.string(),
	cornBusinessLife: z.string(),
	photo: z.instanceof(File),
	companyAddress: z.string(),
	phoneNo: z.string(),
	homeNo: z.string().max(100),
	homeQuater: z.string().max(100),
	homeVillage: z.string().max(100),
	homeTownship: z.string().max(100),
	homeDivisionState: z.string().max(100),
	numberOfSiblings: z.any(),
	bankAccNo: z.string(),
	bankName: z.string().max(100),
	paymentAppNumber: z.string(),
	paymentAppType: z.string(),
	nrcFPhoto: z.instanceof(File),
	nrcBPhoto: z.instanceof(File),
});

const UpdateForm = ({
	defaultValues,
	originalValues,
	setEdit,
}: {
	defaultValues:
		| {
				firstName: string;
				lastName: string;
				fatherName: string;
				dob: string;
				education: string;
				ethnicity: string;
				religion: string;
				nrc: string;
				companyName: string;
				companyAddress: string;
				cornBusinessLife: string;
				homeAddress: string;
				homeNo: string;
				homeStreet: string;
				homeQuater: string;
				homeVillage: string;
				homeTownship: string;
				homeDivisionState: string;
				phoneNo: string;
				numberOfSiblings: number;
				bankAccNo: string;
				bankName: string;
				paymentAppNumber: string;
				paymentAppType: string;
		  }
		| any;
	originalValues: any;
	setEdit: any;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...defaultValues,
			photo: new File([], ""),
			nrcFPhoto: new File([], ""),
			nrcBPhoto: new File([], ""),
		},
	});
	const router = useRouter();

	function displayImage(src: string, des: string) {
		var input = document.getElementById(src);
		var image = document.getElementById(des);
		// @ts-ignore
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				// @ts-ignore
				image.src = e.target.result;
			};
			// @ts-ignore
			reader.readAsDataURL(input.files[0]);
		}
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData();

		formData.append("member_id", originalValues.memberId);
		formData.append("userid", originalValues.userId);
		formData.append("first_name", values.firstName);
		formData.append("last_name", values.lastName);
		formData.append("father_name", values.fatherName);
		formData.append("dob", values.dob);
		formData.append("education", values.education);
		formData.append("ethnicity", values.ethnicity);
		formData.append("religion", values.religion);
		formData.append("nrc", values.nrc);
		formData.append("company_name", values.companyName);
		formData.append("company_address", values.companyAddress);
		formData.append("corn_business_life", values.cornBusinessLife);
		formData.append("home_address", values.homeAddress);
		formData.append("email_address", originalValues.emailAddress);
		const photo = values.photo.name ? values.photo : originalValues.photo;
		formData.append("photo", photo);
		formData.append("old_photo", originalValues.photo);
		formData.append("home_no", values.homeNo);
		formData.append("home_street", values.homeStreet);
		formData.append("home_quater", values.homeQuater);
		formData.append("home_village", values.homeVillage);
		formData.append("home_township", values.homeTownship);
		formData.append("home_division_state", values.homeDivisionState);
		formData.append("number_of_siblings", values.numberOfSiblings);
		formData.append("phone_no", values.phoneNo);
		formData.append("bank_acc_no", values.bankAccNo);
		formData.append("bank_name", values.bankName);
		formData.append("payment_app_number", values.paymentAppNumber);
		formData.append("payment_app_type", values.paymentAppType);
		const nrcFPhoto = values.nrcFPhoto.name ? values.nrcFPhoto : originalValues.nrcFPhoto;
		formData.append("nrc_f_photo", nrcFPhoto);
		formData.append("old_nrc_f_photo", originalValues.nrcFPhoto);
		const nrcBPhoto = values.nrcBPhoto.name ? values.nrcBPhoto : originalValues.nrcBPhoto;
		formData.append("nrc_b_photo", nrcBPhoto);
		formData.append("old_nrc_b_photo", originalValues.nrcBPhoto);
		axios
			.put(`http://localhost:4000/api/members/${originalValues.id}`, formData, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data) {
					router.push(`/admin/dashboard/members`);
					router.refresh();
					toast("Updated member successfully");
				}
			})
			.catch((err) => {
				toast("Something went wrong!");
			});
	}

	return (
		<div className="container flex flex-col gap-10  h-screen overflow-y-scroll">
			<h1 className="text-4xl font-bold text-center">အသင်းဝင်ခွင့်လျှောက်လွှာ</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 grid grid-cols-2 gap-x-14 gap-y-5 mx-auto">
					<div className="col-span-2 flex items-center justify-center relative ">
						<FormField
							control={form.control}
							name="photo"
							render={({ field }) => (
								<FormItem className="w-60 h-60  rounded-full  border-2 border-green-800 mb-3 grid place-items-center overflow-hidden">
									<label htmlFor="profilePic" title="Add profile photo" className="w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-full grid place-items-center absolute ">
										+
									</label>
									<div>
										<img id="selectedImage" alt="" className="-mt-2 object-cover" src={`http://localhost:4000/uploads/members/${originalValues.photo}`} />
									</div>
									<FormControl className="hidden">
										<Input
											id="profilePic"
											accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												displayImage("profilePic", "selectedImage");
											}}
											type="file"
										/>
									</FormControl>
									{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အမည်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အခြားအမည်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="fatherName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အဖအမည်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="dob"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မွေးသက္ကရာဇ်</FormLabel>
								<FormControl>
									<Input type="date" {...field} />
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
						name="education"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပညာအရည်အချင်း</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="ethnicity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>လူမျိုး</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="religion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဘာသာ</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="nrc"
						render={({ field }) => (
							<FormItem>
								<FormLabel>နိုင်ငံသားစီစစ်ရေးကဒ်ပြားအမှတ်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="companyName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကုမ္ပဏီအမည်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="companyAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကုမ္ပဏီလိပ်စာ</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="cornBusinessLife"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပြောင်းလုပ်ငန်းသက်တမ်း</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အိမ်လိပ်စာ</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အိမ်အမှတ်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeStreet"
						render={({ field }) => (
							<FormItem>
								<FormLabel>လမ်း</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeQuater"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရပ်ကွက်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeVillage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကျေးရွာ</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeTownship"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြို့</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="homeDivisionState"
						render={({ field }) => (
							<FormItem>
								<FormLabel>တိုင်းဒေသကြီး/ခရိုင်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="phoneNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဖုန်းနံပါတ်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="numberOfSiblings"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မိသားစုဝင်ဦးရေ</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
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
						name="bankName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဘဏ်အမည်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="bankAccNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဘဏ်အကောင့်နံပါတ်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="paymentAppNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ငွေပေးချေမည့်အက်ပ်နံပါတ်</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
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
						name="paymentAppType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ငွေပေးချေမည့်အက်ပ်အမျိုးအစား</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="relative flex flex-col items-center gap-2">
						<p className="text-sm">မှတ်ပုံတင် (အရှေ့)</p>
						<FormField
							control={form.control}
							name="nrcFPhoto"
							render={({ field }) => (
								<FormItem className="w-full h-48 border border-green-800 mb-3 grid place-items-center overflow-hidden">
									<label htmlFor="nrcFPhoto" title="Add profile photo" className="w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-full grid place-items-center absolute ">
										+
									</label>
									<div>
										<img id="nrcFImage" alt="" className="-mt-2 object-cover w-full h-full" src={`http://localhost:4000/uploads/members/${originalValues.nrcFPhoto}`} />
									</div>
									<FormControl className="hidden">
										<Input
											id="nrcFPhoto"
											accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												displayImage("nrcFPhoto", "nrcFImage");
											}}
											type="file"
										/>
									</FormControl>
									{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="relative flex flex-col items-center gap-2">
						<p className="text-sm">မှတ်ပုံတင် (အနောက်)</p>
						<FormField
							control={form.control}
							name="nrcBPhoto"
							render={({ field }) => (
								<FormItem className="w-full h-48 border border-green-800 mb-3 grid place-items-center overflow-hidden">
									<label htmlFor="nrcBPhoto" title="Add profile photo" className="w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-full grid place-items-center absolute ">
										+
									</label>
									<div>
										<img id="nrcBImage" alt="" className="-mt-2 object-cover w-full h-full" src={`http://localhost:4000/uploads/members/${originalValues.nrcBPhoto}`} />
									</div>
									<FormControl className="hidden">
										<Input
											id="nrcBPhoto"
											accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												displayImage("nrcBPhoto", "nrcBImage");
											}}
											type="file"
										/>
									</FormControl>
									{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-start-1 col-span-2 flex gap-6 justify-center">
						<Button className="bg-red-600 hover:bg-red-500 w-[200px] h-[50px] text-base" onClick={() => setEdit(false)}>
							Cancel
						</Button>
						<Button type="submit" className="bg-green-800 hover:bg-green-700 w-[200px] h-[50px] text-base">
							အတည်ပြုမည်
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default UpdateForm;
