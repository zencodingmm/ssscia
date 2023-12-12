"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { cookies } from "next/headers";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store";
import MemberLogin from "@/components/users/memberLogin";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	landImprovement: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	landImprovementCosts: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	typeOfSeedName: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	typeOfSeedBedsNo: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	typeOfSeedCost: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	typeOfSeedBuyShop: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	manureName: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	manureBedsNo: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	manureCost: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	manureManpower: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	manureBuyShop: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	pesticidesType: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	pesticidesFrequencyOfSpraying: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	pesticidesManpower: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	pesticidesCost: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	pesticidesBuyShop: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	typesOfCropsGrownAndAcreage: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	harvestingAndThreshingOwn: z.any(),
	harvestingAndThreshingRental: z.any(),
	harvestingAndThreshingType: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	harvestingAndThreshingManpower: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	harvestingAndThreshingSavingsCosts: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	harvestingAndThreshingDeviceName: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	oneAcreOutput: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	totalYield: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	salesFairOrDealer: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	salesFairOrDealerPriceReceived: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	isLoan: z.any(),
	loanPerson: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	isSeedLoan: z.any(),
	seenLoanPerson: z
		.string()

		.max(100, {
			message: "Must be less than 100 characters",
		}),
	isFertilizerLoan: z.any(),
	fertilizerLoanPerson: z
		.string()
		// .min(2, {
		// 	message: "Must be at least 2 characters.",
		// })
		.max(100, {
			message: "Must be less than 100 characters",
		}),
});

const LoginPage = () => {
	const { isMember, userID, memberID, setMemberID, setIsMember } = useAuthStore();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			landImprovement: "",
			landImprovementCosts: "",
			typeOfSeedName: "",
			typeOfSeedBedsNo: "",
			typeOfSeedCost: "",
			typeOfSeedBuyShop: "",
			manureName: "",
			manureBedsNo: "",
			manureCost: "",
			manureManpower: "",
			manureBuyShop: "",
			pesticidesType: "",
			pesticidesFrequencyOfSpraying: "",
			pesticidesManpower: "",
			pesticidesCost: "",
			pesticidesBuyShop: "",
			typesOfCropsGrownAndAcreage: "",
			harvestingAndThreshingOwn: 0,
			harvestingAndThreshingRental: 0,
			harvestingAndThreshingType: "",
			harvestingAndThreshingManpower: "",
			harvestingAndThreshingSavingsCosts: "",
			harvestingAndThreshingDeviceName: "",
			oneAcreOutput: "",
			totalYield: "",
			salesFairOrDealer: "",
			salesFairOrDealerPriceReceived: "",
			isLoan: 0,
			loanPerson: "",
			isSeedLoan: 0,
			seenLoanPerson: "",
			isFertilizerLoan: 0,
			fertilizerLoanPerson: "",
		},
	});

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`)
			.then((response) => {
				if (response.data) {
					setIsMember(true);
				} else {
					setIsMember(false);
				}
			})
			.catch((err) => {
				setIsMember(false);
			});
	}, [userID, isMember]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const formData = new FormData();
		formData.append("userid", userID);
		formData.append("member_id", memberID);
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
			.post(`http://localhost:4000/api/cropfactors`, formData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				form.reset();
				router.refresh();
				toast("Crop factors were successfully created.");
			})
			.catch((err) => console.log(err));
	}

	if (!isMember) return <MemberLogin />;

	return (
		<div className="py-10 px-2 lg:p-12 flex flex-col gap-10 h-screen overflow-y-scroll">
			<h1 className="text-2xl lg:text-4xl font-bold text-center">စိုက်ပျိုးသီးနှံအချက်အလက်များ</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-3/4 grid grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-5 mx-auto text-xs lg:text-base">
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
										<Input type="checkbox" {...field} className="w-4 h-4" />
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
										<Input type="checkbox" {...field} className="w-4 h-4" />
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
										<Input type="checkbox" {...field} className="w-4 h-4" />
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
										<Input type="checkbox" {...field} className="w-4 h-4" />
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
										<Input type="checkbox" {...field} className="w-4 h-4" />
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

export default LoginPage;
