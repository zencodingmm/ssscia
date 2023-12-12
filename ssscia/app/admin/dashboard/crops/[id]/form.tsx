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
	landImprovement: z.string().max(100),
	landImprovementCosts: z.string().max(100),
	typeOfSeedName: z.string().max(100),
	typeOfSeedBedsNo: z.string().max(100),
	typeOfSeedCost: z.string().max(100),
	typeOfSeedBuyShop: z.string().max(100),
	manureName: z.string().max(100),
	manureBedsNo: z.string().max(100),
	manureCost: z.string().max(100),
	manureManpower: z.string().max(100),
	manureBuyShop: z.string(),
	pesticidesType: z.string(),
	pesticidesFrequencyOfSpraying: z.string(),
	pesticidesManpower: z.string(),
	pesticidesCost: z.string(),
	pesticidesBuyShop: z.string(),
	typesOfCropsGrownAndAcreage: z.string().max(100),
	harvestingAndThreshingOwn: z.any(),
	harvestingAndThreshingRental: z.any(),
	harvestingAndThreshingType: z.string().max(100),
	harvestingAndThreshingManpower: z.string().max(100),
	harvestingAndThreshingSavingsCosts: z.string().max(100),
	harvestingAndThreshingDeviceName: z.string().max(100),
	oneAcreOutput: z.string().max(100),
	totalYield: z.string().max(100),
	salesFairOrDealer: z.string().max(100),
	salesFairOrDealerPriceReceived: z.string().max(100),
	isLoan: z.any(),
	loanPerson: z.string().max(100),
	isSeedLoan: z.any(),
	seenLoanPerson: z.string().max(100),
	isFertilizerLoan: z.any(),
	fertilizerLoanPerson: z.string().max(100),
});

const UpdateForm = ({
	defaultValues,
	originalValues,
	setEdit,
}: {
	defaultValues:
		| {
				landImprovement: string;
				landImprovementCosts: string;
				typeOfSeedName: string;
				typeOfSeedBedsNo: string;
				typeOfSeedCost: string;
				typeOfSeedBuyShop: string;
				manureName: string;
				manureBedsNo: string;
				manureCost: string;
				manureManpower: string;
				manureBuyShop: string;
				pesticidesType: string;
				pesticidesFrequencyOfSpraying: string;
				pesticidesManpower: string;
				pesticidesCost: string;
				pesticidesBuyShop: string;
				typesOfCropsGrownAndAcreage: string;
				harvestingAndThreshingOwn: boolean;
				harvestingAndThreshingRental: boolean;
				harvestingAndThreshingType: string;
				harvestingAndThreshingManpower: string;
				harvestingAndThreshingSavingsCosts: string;
				harvestingAndThreshingDeviceName: string;
				oneAcreOutput: string;
				totalYield: string;
				salesFairOrDealer: string;
				salesFairOrDealerPriceReceived: string;
				isLoan: boolean;
				loanPerson: string;
				isSeedLoan: boolean;
				seenLoanPerson: string;
				isFertilizerLoan: boolean;
				fertilizerLoanPerson: string;
		  }
		| any;
	originalValues: any;
	setEdit: any;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...defaultValues,
		},
	});
	const router = useRouter();
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		const formData = new FormData();
		formData.append("id", originalValues.id);
		formData.append("userid", originalValues.userId);
		formData.append("member_id", originalValues.memberId);
		formData.append("land_improvement", values.landImprovement);
		formData.append("land_improvement_costs", values.landImprovementCosts);
		formData.append("type_of_seed_name", values.typeOfSeedName);
		formData.append("type_of_seed_beds_no", values.typeOfSeedBedsNo);
		formData.append("type_of_seed_cost", values.typeOfSeedCost);
		formData.append("type_of_seed_buy_shop", values.typeOfSeedBuyShop);
		formData.append("manure_name", values.manureName);
		formData.append("manure_beds_no", values.manureBedsNo);
		formData.append("manure_cost", values.manureCost);
		formData.append("manure_manpower", values.manureManpower);
		formData.append("manure_buy_shop", values.manureBuyShop);
		formData.append("pesticides_type", values.pesticidesType);
		formData.append("pesticides_frequency_of_spraying", values.pesticidesFrequencyOfSpraying);
		formData.append("pesticides_manpower", values.pesticidesManpower);
		formData.append("pesticides_cost", values.pesticidesCost);
		formData.append("pesticides_buy_shop", values.pesticidesBuyShop);
		formData.append("types_of_crops_grown_and_acreage", values.typesOfCropsGrownAndAcreage);
		formData.append(
			"harvesting_and_threshing_own",
			// @ts-ignore
			values.harvestingAndThreshingOwn == true ? 1 : 0
		);
		formData.append(
			"harvesting_and_threshing_rental",
			//@ts-ignore
			values.harvestingAndThreshingRental == true ? 1 : 0
		);
		formData.append("harvesting_and_threshing_type", values.harvestingAndThreshingType);
		formData.append("harvesting_and_threshing_manpower", values.harvestingAndThreshingManpower);
		formData.append("harvesting_and_threshing_savings_costs", values.harvestingAndThreshingSavingsCosts);
		formData.append("harvesting_and_threshing_device_name", values.harvestingAndThreshingDeviceName);
		formData.append("one_acre_output", values.oneAcreOutput);
		formData.append("total_yield", values.totalYield);
		formData.append("sales_fair_or_dealer", values.salesFairOrDealer);
		formData.append("sales_fair_or_dealer_price_received", values.salesFairOrDealerPriceReceived);
		// @ts-ignore
		formData.append("isloan", values.isLoan == true ? 1 : 0);
		formData.append("loan_person", values.loanPerson);
		// @ts-ignore
		formData.append("is_seed_loan", values.isSeedLoan == true ? 1 : 0);
		formData.append("seen_loan_person", values.seenLoanPerson);
		// @ts-ignore
		formData.append(
			"is_fertilizer_loan",
			//@ts-ignore
			values.isFertilizerLoan == true ? 1 : 0
		);
		formData.append("fertilizer_loan_person", values.fertilizerLoanPerson);

		axios
			.put(`http://localhost:4000/api/cropfactors/${originalValues.dbId}`, formData, {
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				if (response.data) {
					router.push(`/admin/dashboard/crops`);
					router.refresh();
					toast("Updated crops list successfully");
				}
			})
			.catch((err) => {
				toast("Something went wrong!");
			});
	}

	return (
		<div className="container flex flex-col gap-10 h-screen overflow-y-scroll">
			<h1 className="text-4xl font-bold text-center">စိုက်ပျိုးသီးနှံအချက်အလက်များ</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 grid grid-cols-2 gap-x-14 gap-y-5 mx-auto">
					<FormField
						control={form.control}
						name="landImprovement"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြေယာပြုပြင်ခြင်း</FormLabel>
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
						name="landImprovementCosts"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြေယာပြုပြင်ကုန်ကျစရိတ်</FormLabel>
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
						name="typeOfSeedName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မျိုးစေ့အမျိုးအစားအမည်</FormLabel>
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
						name="typeOfSeedBedsNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မျိုးစေ့အိတ်အရေအတွက်</FormLabel>
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
						name="typeOfSeedCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မျိုးစေ့ကုန်ကျစရိတ်</FormLabel>
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
						name="typeOfSeedBuyShop"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မျိုးစေ့ဝယ်ယူသည့် ဆိုင်/ပွဲရုံ</FormLabel>
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
						name="manureName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြေသြဇာအမည်</FormLabel>
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
						name="manureBedsNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဝယ်ယူသည့်အိတ်အရေအတွက်</FormLabel>
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
						name="manureCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြေသြဇာဝယ်ယူမှုကုန်ကျစရိတ်</FormLabel>
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
						name="manureManpower"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အသုံးပြုသည့်လူအင်အား(မြေသြဇာ)</FormLabel>
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
						name="manureBuyShop"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြေသြဇာဝယ်ယူသည့် ဆိုင်/ပွဲရုံ</FormLabel>
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
						name="pesticidesType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပိုးသတ်ဆေးအမျိုးအစား</FormLabel>
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
						name="pesticidesFrequencyOfSpraying"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဆေးဖြန်းသည့်အကြိမ်ရေ</FormLabel>
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
						name="pesticidesManpower"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အသုံးပြုသည့်လူအင်အား(ပိုးသတ်ဆေး)</FormLabel>
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
						name="pesticidesCost"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပိုးသတ်ဆေးဝယ်ယူမှုကုန်ကျစရိတ်</FormLabel>
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
						name="pesticidesBuyShop"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပိုးသတ်ဆေးဝယ်ယူသည့် ဆိုင်/ပွဲရုံ</FormLabel>
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
						name="typesOfCropsGrownAndAcreage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>စိုက်ပျိုးသည့်သီးနှံအမျိုးအစားနှင့် စိုက်ဧက</FormLabel>
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
					<div className="flex items-center justify-between">
						<FormField
							control={form.control}
							name="harvestingAndThreshingOwn"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ရိတ်သိမ်းခြွေလှေ့ခြင်း (ကိုယ်ပိုင်)</FormLabel>
									<FormControl>
										<Input type="checkbox" {...field} className="w-4 h-4" checked={field.value} />
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
							name="harvestingAndThreshingRental"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ရိတ်သိမ်းခြွေလှေ့ခြင်း (အငှား)</FormLabel>
									<FormControl>
										<Input type="checkbox" {...field} className="w-4 h-4" checked={field.value} />
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
						name="harvestingAndThreshingType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရိတ်သိမ်းခြွေလှေ့သည့်စက်အမျိုးအစား</FormLabel>
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
						name="harvestingAndThreshingManpower"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အသုံးပြုသည့်လူအင်အား(ရိတ်သိမ်းခြွေလှေ့)</FormLabel>
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
						name="harvestingAndThreshingSavingsCosts"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရိတ်သိမ်းခြွေလှေ့မှုကုန်ကျစရိတ်</FormLabel>
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
						name="harvestingAndThreshingDeviceName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရိတ်သိမ်းခြွေလှေ့စက်အမည်</FormLabel>
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
						name="oneAcreOutput"
						render={({ field }) => (
							<FormItem>
								<FormLabel>တစ်ဧကထွက်နှုန်း</FormLabel>
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
						name="totalYield"
						render={({ field }) => (
							<FormItem>
								<FormLabel>စုစုပေါင်းထွက်နှုန်း</FormLabel>
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
						name="salesFairOrDealer"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရောင်းချသည့် ပွဲရုံ/ကုန်သည်</FormLabel>
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
						name="salesFairOrDealerPriceReceived"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရရှိသည့်စျေး (ပိဿာ)</FormLabel>
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
					<div className="flex items-center gap-10">
						<FormField
							control={form.control}
							name="isLoan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ချေးငွေ</FormLabel>
									<FormControl>
										<Input type="checkbox" {...field} className="w-4 h-4" checked={field.value} />
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
							name="isSeedLoan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>မျိုးစေ့</FormLabel>
									<FormControl>
										<Input type="checkbox" {...field} className="w-4 h-4" checked={field.value} />
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
							name="isFertilizerLoan"
							render={({ field }) => (
								<FormItem>
									<FormLabel>မြေသြဇာ</FormLabel>
									<FormControl>
										<Input type="checkbox" {...field} className="w-4 h-4" checked={field.value} />
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
						name="loanPerson"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ငွေချေးယူသည့်ပုဂ္ဂိုလ်</FormLabel>
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
						name="seenLoanPerson"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မျိုးစေ့ချေးယူသည့်ပုဂ္ဂိုလ်</FormLabel>
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
						name="fertilizerLoanPerson"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြေသြဇာချေးယူသည့်ပုဂ္ဂိုလ်</FormLabel>
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
