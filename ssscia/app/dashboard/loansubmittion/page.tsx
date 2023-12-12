"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store";
import MemberLogin from "@/components/users/memberLogin";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	loanSubmitDate: z.string().max(100),
	loanAmount: z.string(),
	landValueAndAcresToBeInsured: z.string(),
	isApplyPerson: z.any(),
	relationshipWithSupporters: z.string(),
	isCurrentCropCultivation: z.any(),
	isTakenLoan: z.any(),
	proofOfRepayment: z.any(),
	isHealthAndChronicDisease: z.any(),
	supporterOneName: z.string(),
	supporterOneNrc: z.string(),
	supporterOneDob: z.string(),
	supporterOneAge: z.string(),
	supporterOnePlace: z.string(),
	supporterOnePhone: z.string(),
	supporterTwoName: z.string(),
	supporterTwoNrc: z.string(),
	supporterTwoDob: z.string(),
	supporterTwoPlace: z.string(),
	supporterTwoPhone: z.string(),
	healthSupporter: z.string(),
	photographOfLandToBeInsured: z.instanceof(File),
});

const LoanSubmittionPage = () => {
	const { isMember, userID, memberID, setMemberID, setIsMember } = useAuthStore();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			loanSubmitDate: "",
			loanAmount: "",
			landValueAndAcresToBeInsured: "",
			isApplyPerson: 0,
			relationshipWithSupporters: "",
			isCurrentCropCultivation: 0,
			isTakenLoan: 0,
			proofOfRepayment: "",
			isHealthAndChronicDisease: 0,
			supporterOneName: "",
			supporterOneNrc: "",
			supporterOneDob: "",
			supporterOneAge: "",
			supporterOnePlace: "",
			supporterOnePhone: "",
			supporterTwoName: "",
			supporterTwoNrc: "",
			supporterTwoDob: "",
			supporterTwoPlace: "",
			supporterTwoPhone: "",
			healthSupporter: "",
			photographOfLandToBeInsured: new File([], ""),
		},
	});

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`, {
				withCredentials: true,
			})
			.then((response) => {
				setMemberID(response.data.member_id);
				setIsMember(true);
			})
			.catch((err) => {
				console.log(err);
				setIsMember(false);
			});
	}, []);

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		let formData = new FormData();
		formData.append("userid", userID);
		formData.append("memberid", memberID);
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
		formData.append("photograph_of_land_to_be_insured", values.photographOfLandToBeInsured);
		axios
			.post(`http://localhost:4000/api/loansubmittion`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				if (response.data) {
					router.push("/dashboard/loansubmittion");
					form.reset();
					toast("Inserted data successfully!");
				}
			})
			.catch((err) => console.log(err));
		// toast("User was created successfully!");
		console.log(values);
	}

	if (!isMember) return <MemberLogin />;

	return (
		<div className="py-10 px-2 lg:p-12 flex flex-col gap-10 h-screen overflow-y-scroll">
			<h1 className="text-2xl lg:text-4xl font-bold text-center">ချေးငွေဆိုင်ရာအချက်အလက်များ</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-3/4 grid grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-5 mx-auto text-xs lg:text-base">
					<FormField
						control={form.control}
						name="loanSubmitDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ချေးငွေရယူသည့်နေ့</FormLabel>
								<FormControl>
									<Input type="date" {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input type="checkbox" className="h-4 w-4" {...field} />
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
									<Input type="text" {...field} required />
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
									<Input type="checkbox" className="h-4 w-4" {...field} />
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
									<Input type="checkbox" className="h-4 w-4" {...field} />
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
						name="proofOfRepayment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပြန်လည်ဆပ်ထားသည့်အထောက်အထား</FormLabel>
								<FormControl>
									<Input id="profilePic" accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
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
									<Input className="h-4 w-4" type="checkbox" {...field} />
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
									<Input {...field} required />
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
									<Input {...field} required />
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
									<Input type="date" {...field} required />
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
									<Input {...field} required />
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
									<Input {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input type="date" {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input type="text" {...field} required />
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
									<Input {...field} required />
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
						name="photographOfLandToBeInsured"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အာမခံထားရှိမည့်မြေယာပိုင်ဆိုင်မှုဓာတ်ပုံ</FormLabel>
								<FormControl>
									<Input accept=".jpg, .jpeg, .png, .svg, .gif" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
								</FormControl>
								{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="col-start-1 col-span-2 flex justify-end">
						<Button type="submit" variant="default" className="w-[200px] h-[50px] text-base bg-green-800 hover:bg-green-700 pt-1">
							အတည်ပြုမည်
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default LoanSubmittionPage;
