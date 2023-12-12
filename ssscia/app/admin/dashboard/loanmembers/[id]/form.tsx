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
	loanSubmitDate: z.string().max(100),
	loanAmount: z.string().max(100),
	landValueAndAcresToBeInsured: z.string().max(100),
	isApplyPerson: z.any(),
	relationshipWithSupporters: z.string().max(100),
	isCurrentCropCultivation: z.any(),
	isTakenLoan: z.any(),
	proofOfRepayment: z.instanceof(File),
	isHealthAndChronicDisease: z.any(),
	supporterOneName: z.string().max(100),
	supporterOneNrc: z.string(),
	supporterOneDob: z.string(),
	supporterOneAge: z.string(),
	supporterOnePlace: z.string(),
	supporterOnePhone: z.string(),
	supporterTwoName: z.string().max(100),
	supporterTwoNrc: z.string().max(100),
	supporterTwoDob: z.string().max(100),
	supporterTwoPlace: z.string().max(100),
	supporterTwoPhone: z.string().max(100),
	healthSupporter: z.string().max(100),
	photographOfLandToBeInsured: z.instanceof(File),
});

const UpdateForm = ({
	defaultValues,
	originalValues,
	setEdit,
}: {
	defaultValues:
		| {
				loanSubmitDate: string;
				loanAmount: string;
				landValueAndAcresToBeInsured: string;
				isApplyPerson: any;
				relationshipWithSupporters: string;
				isCurrentCropCultivation: string;
				isTakenLoan: string;
				isHealthAndChronicDisease: string;
				supporterOneName: string;
				supporterOneNrc: string;
				supporterOneDob: string;
				supporterOneAge: string;
				supporterOnePlace: string;
				supporterOnePhone: string;
				supporterTwoName: string;
				supporterTwoNrc: string;
				supporterTwoDob: string;
				supporterTwoPlace: string;
				supporterTwoPhone: string;
				healthSupporter: string;
		  }
		| any;
	originalValues: any;
	setEdit: any;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...defaultValues,
			proofOfRepayment: new File([], ""),
			photographOfLandToBeInsured: new File([], ""),
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
		let formData = new FormData();
		formData.append("userid", originalValues.userId);
		formData.append("memberid", originalValues.memberId);
		formData.append("loan_submit_date", values.loanSubmitDate);
		formData.append("loan_amount", values.loanAmount);
		formData.append("land_value_and_acres_to_be_insured", values.landValueAndAcresToBeInsured);
		// @ts-ignore
		formData.append("is_apply_person", values.isApplyPerson ? 1 : 0);
		formData.append("relationship_with_supporters", values.relationshipWithSupporters);
		formData.append(
			"is_current_crop_cultivation",
			// @ts-ignore
			values.isCurrentCropCultivation ? 1 : 0
		);
		// @ts-ignore
		formData.append("is_taken_loan", values.isTakenLoan ? 1 : 0);
		formData.append("old_proof_of_repayment", originalValues.proofOfRepayment);
		// @ts-ignore
		formData.append("proof_of_repayment", values.proofOfRepayment);
		formData.append("is_health_and_chronic_disease", values.isHealthAndChronicDisease);
		formData.append("supporter_one_name", values.supporterOneName);
		formData.append("supporter_one_nrc", values.supporterOneNrc);
		formData.append("supporter_one_dob", values.supporterOneDob);
		formData.append("supporter_one_age", values.supporterOneAge);
		formData.append("supporter_one_place", values.supporterOnePlace);
		formData.append("supporter_one_phone", values.supporterOnePhone);
		formData.append("supporter_two_name", values.supporterTwoName);
		formData.append("supporter_two_nrc", values.supporterTwoNrc);
		formData.append("supporter_two_dob", values.supporterTwoDob);
		formData.append("supporter_two_place", values.supporterTwoPlace);
		formData.append("supporter_two_phone", values.supporterTwoPhone);
		formData.append("health_supporter", values.healthSupporter);
		formData.append("old_photograph_of_land_to_be_insured", originalValues.photographOfLandToBeInsured);
		formData.append("photograph_of_land_to_be_insured", values.photographOfLandToBeInsured);

		axios
			.put(`http://localhost:4000/api/loansubmittion/${originalValues.id}`, formData, {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data) {
					router.push(`/admin/dashboard/loanmembers`);
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
			<h1 className="text-4xl font-bold text-center">ချေးငွေဆိုင်ရာအချက်အလက်များ</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 grid grid-cols-2 gap-x-14 gap-y-5 mx-auto">
					<FormField
						control={form.control}
						name="loanSubmitDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ချေးငွေရယူသည့်နေ့</FormLabel>
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
						name="loanAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ချေးငွေရယူလိုသည့်ပမာဏ</FormLabel>
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
						name="landValueAndAcresToBeInsured"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အာမခံထားရှိမည့်မြေတန်ဖိုးနှင့်ဧက</FormLabel>
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
						name="isApplyPerson"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံမည့်သူ ရှိ/မရှိ</FormLabel>
								<FormControl>
									<Input type="checkbox" className="w-4 h-4" checked={field.value} {...field} />
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
						name="relationshipWithSupporters"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူနှင့်တော်စပ်မှု</FormLabel>
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
						name="isCurrentCropCultivation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>လက်ရှိသီးနှံစိုက်ပျိုးမှု ရှိ/မရှိ</FormLabel>
								<FormControl>
									<Input type="checkbox" className="w-4 h-4" checked={field.value} {...field} />
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
						name="isTakenLoan"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ချေးငွေရယူခဲ့ဖူးခြင်း ရှိ/မရှိ</FormLabel>
								<FormControl>
									<Input type="checkbox" className="w-4 h-4" checked={field.value} {...field} />
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
						name="isHealthAndChronicDisease"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကျန်းမာရေးနှင့်နာတာရှည်ရောဂါ ရှိ/မရှိ</FormLabel>
								<FormControl>
									<Input type="checkbox" className="w-4 h-4" checked={field.value} {...field} />
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
						name="supporterOneName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ၏အမည် (ပ)</FormLabel>
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
						name="supporterOneNrc"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ပ)၏ မှတ်ပုံတင်အမှတ်</FormLabel>
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
						name="supporterOneDob"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ပ)၏ မွေးသက္ကရာဇ်</FormLabel>
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
						name="supporterOneAge"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ပ)၏ အသက်</FormLabel>
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
						name="supporterOnePlace"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ပ)၏ နေရပ်</FormLabel>
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
						name="supporterOnePhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ပ)၏ ဖုန်းနံပါတ်</FormLabel>
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
						name="supporterTwoName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ၏အမည် (ဒု)</FormLabel>
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
						name="supporterTwoNrc"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ဒု)၏ မှတ်ပုံတင်အမှတ်</FormLabel>
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
						name="supporterTwoDob"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ဒု)၏ မွေးသက္ကရာဇ်</FormLabel>
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
						name="supporterTwoPlace"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ဒု)၏ နေရပ်</FormLabel>
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
						name="supporterTwoPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ(ဒု)၏ ဖုန်းနံပါတ်</FormLabel>
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
						name="healthSupporter"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ထောက်ခံသူ၏ကျန်းမာရေး</FormLabel>
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
					<div className="relative flex justify-center">
						<FormField
							control={form.control}
							name="proofOfRepayment"
							render={({ field }) => (
								<FormItem className="w-full h-48 border border-green-800 mb-3 grid place-items-center overflow-hidden">
									<label htmlFor="proofOfRepaymentPic" title="Add profile photo" className="w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-full grid place-items-center absolute ">
										+
									</label>
									<div>
										<img id="proofOfRepaymentImg" alt="" className="-mt-2 object-cover" src={`http://localhost:4000/uploads/loansubmittion/${originalValues.proofOfRepayment}`} />
									</div>
									<FormControl className="hidden">
										<Input
											id="proofOfRepaymentPic"
											accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												displayImage("proofOfRepaymentPic", "proofOfRepaymentImg");
											}}
											type="file"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="relative flex justify-center">
						<FormField
							control={form.control}
							name="photographOfLandToBeInsured"
							render={({ field }) => (
								<FormItem className="w-full h-48 border border-green-800 mb-3 grid place-items-center overflow-hidden">
									<label htmlFor="photographOfLandToBeInsuredPic" title="Add profile photo" className="w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-full grid place-items-center absolute ">
										+
									</label>
									<div>
										<img id="photographOfLandToBeInsuredImg" alt="" className="-mt-2 object-cover" src={`http://localhost:4000/uploads/loansubmittion/${originalValues.photographOfLandToBeInsured}`} />
									</div>
									<FormControl className="hidden">
										<Input
											id="photographOfLandToBeInsuredPic"
											accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												displayImage("photographOfLandToBeInsuredPic", "photographOfLandToBeInsuredImg");
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
