"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	memberId: z.string(),
	userId: z.string(),
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
	emailAddress: z.string().max(100),
	homeNo: z.string().max(100),
	homeQuater: z.string().max(100),
	homeVillage: z.string().max(100),
	homeTownship: z.string().max(100),
	homeDivisionState: z.string().max(100),
	numberOfSiblings: z.string(),
	bankAccNo: z.string(),
	bankName: z.string().max(100),
	paymentAppNumber: z.string(),
	paymentAppType: z.string(),
	nrcFPhoto: z.instanceof(File),
	nrcBPhoto: z.instanceof(File),
});

const MemberPage = () => {
	const { userID, userEmail, memberID, setMemberID, isMember, setIsMember } = useAuthStore();
	const [user, setUser] = useState({
		member_id: "",
		photo: "",
		first_name: "",
		last_name: "",
		nrc: "",
		father_name: "",
		dob: "",
		home_address: "",
		number_of_siblings: "",
		phone_no: "",
		education: "",
		ethnicity: "",
		religion: "",
		company_name: "",
		company_address: "",
		corn_business_life: "",
		email_address: "",
		home_no: "",
		home_street: "",
		home_quater: "",
		home_village: "",
		home_township: "",
		home_division_state: "",
		bank_acc_no: "",
		bank_name: "",
		payment_app_number: "",
		payment_app_type: "",
		nrc_f_photo: "",
		nrc_b_photo: "",
	});
	const [fetched, setFetched] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userId: "",
			memberId: "",
			firstName: "",
			lastName: "",
			fatherName: "",
			dob: "",
			education: "",
			ethnicity: "",
			religion: "",
			nrc: "",
			companyName: "",
			companyAddress: "",
			cornBusinessLife: "",
			homeAddress: "",
			homeNo: "",
			homeStreet: "",
			homeQuater: "",
			homeVillage: "",
			homeTownship: "",
			homeDivisionState: "",
			phoneNo: "",
			emailAddress: "",
			numberOfSiblings: "",
			bankAccNo: "",
			bankName: "",
			paymentAppNumber: "",
			paymentAppType: "",
			nrcFPhoto: new File([], ""),
			nrcBPhoto: new File([], ""),
			photo: new File([], ""),
		},
	});

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`)
			.then((response) => {
				if (response.data) {
					setFetched(false);
					setIsMember(true);
					setUser(response.data);
					setFetched(true);
				} else {
					setIsMember(false);
				}
			})
			.catch((err) => {
				setIsMember(false);
			});
	}, [userID, isMember]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData();
		const member_id = crypto.randomUUID();
		formData.append("member_id", member_id);
		formData.append("userid", userID);
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
		formData.append("email_address", userEmail);
		formData.append("photo", values.photo);
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
		formData.append("nrc_f_photo", values.nrcFPhoto);
		formData.append("nrc_b_photo", values.nrcBPhoto);

		axios
			.post("http://localhost:4000/api/members", formData, {
				withCredentials: true,
			})
			.then((response) => {
				setMemberID(response.data.member_id);
				setIsMember(true);
				router.push(`/dashboard/members`);
			})
			.catch((err) => {
				setIsMember(false);
			});
	}

	function displayImage() {
		var input = document.getElementById("profilePic");
		var image = document.getElementById("selectedImage");
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
	if (isMember && fetched) console.log(user);
	if (isMember && fetched) {
		return (
			<div className="py-10 px-2 lg:p-12 flex flex-col gap-10 h-screen overflow-y-scroll">
				<h1 className="text-2xl lg:text-4xl font-bold text-center">တောင်သူ၏ကိုယ်ရေးအချက်အလက်များ</h1>
				<div className="w-full lg:w-3/4 mx-auto flex flex-col justify-center items-center gap-8">
					<div className="w-40 h-40 lg:w-60 lg:h-60 rounded-full bg-cyan-900 overflow-hidden flex justify-center items-center">
						<Image width={240} height={240} src={`http://localhost:4000/uploads/members/${user.photo}`} alt="Member Photo" className="object-cover" />
					</div>
					<div className="w-full grid grid-cols-2 gap-8 text-xs lg:text-base">
						<div className=" px-5 pb-4 w-full border-b">အသင်းဝင်အမှတ် - {user.member_id}</div>
						<div className=" px-5 pb-4 w-full border-b">မှတ်ပုံတင်အမှတ် - {user.nrc}</div>
						<div className=" px-5 pb-4 w-full border-b">အမည် - {user.first_name}</div>
						<div className=" px-5 pb-4 w-full border-b">အခြားအမည် - {user.last_name}</div>
						<div className=" px-5 pb-4 w-full border-b">အဖအမည် - {user.father_name}</div>
						<div className=" px-5 pb-4 w-full border-b">မွေးသက္ကရာဇ် - {user.dob}</div>
						<div className=" px-5 pb-4 w-full border-b">ပညာအရည်အချင်း - {user.education}</div>
						<div className=" px-5 pb-4 w-full border-b">လူမျိုး - {user.ethnicity}</div>
						<div className=" px-5 pb-4 w-full border-b">ဘာသာ - {user.religion}</div>
						<div className=" px-5 pb-4 w-full border-b">ကုမ္ပဏီအမည် - {user.company_name}</div>
						<div className=" px-5 pb-4 w-full border-b">ကုမ္ပဏီလိပ်စာ - {user.company_address}</div>
						<div className=" px-5 pb-4 w-full border-b">ပြောင်းလုပ်ငန်းသက်တမ်း - {user.corn_business_life}</div>
						<div className=" px-5 pb-4 w-full border-b">နေရပ်လိပ်စာ - {user.home_address}</div>
						<div className=" px-5 pb-4 w-full border-b">အိမ်အမှတ် - {user.home_no}</div>
						<div className=" px-5 pb-4 w-full border-b">လမ်း - {user.home_street}</div>
						<div className=" px-5 pb-4 w-full border-b">ရပ်ကွက် - {user.home_quater}</div>
						<div className=" px-5 pb-4 w-full border-b">ကျေးရွာ - {user.home_village}</div>
						<div className=" px-5 pb-4 w-full border-b">မြို့ - {user.home_township}</div>
						<div className=" px-5 pb-4 w-full border-b">တိုင်းဒေသကြီး/ခရိုင် - {user.home_division_state}</div>
						<div className=" px-5 pb-4 w-full border-b">မိသားစုဝင်ဦးရေ - {user.number_of_siblings}</div>
						<div className=" px-5 pb-4 w-full border-b">ဖုန်းနံပါတ် - {user.phone_no}</div>
						<div className=" px-5 pb-4 w-full border-b">အီးမေးလ်လိပ်စာ - {user.email_address}</div>
						<div className=" px-5 pb-4 w-full border-b">ဘဏ်အမည် - {user.bank_name}</div>
						<div className=" px-5 pb-4 w-full border-b">ဘဏ်အကောင့်နံပါတ် - {user.bank_acc_no}</div>
						<div className=" px-5 pb-4 w-full border-b">ငွေပေးချေမည့်အက်ပ်နံပါတ် - {user.payment_app_number}</div>
						<div className=" px-5 pb-4 w-full border-b">ငွေပေးချေမည့်အက်ပ်အမျိုးအစား - {user.payment_app_type}</div>
						<div className="flex flex-col gap-2 items-center justify-center">
							မှတ်ပုံတင်(ရှေ့)
							<div className="w-60 h-28 lg:w-80 lg:h-44 bg-cyan-900 overflow-hidden flex justify-center items-center">
								<Image width={240} height={240} src={`http://localhost:4000/uploads/members/${user.nrc_f_photo}`} alt="Member Photo" className="object-cover w-full h-full" />
							</div>
						</div>
						<div className="flex flex-col gap-2 items-center justify-center ">
							မှတ်ပုံတင်(နောက်)
							<div className="w-60 h-28 lg:w-80 lg:h-44 bg-cyan-900 overflow-hidden flex justify-center items-center">
								<Image width={240} height={240} src={`http://localhost:4000/uploads/members/${user.nrc_b_photo}`} alt="Member Photo" className="object-cover w-full h-full" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="py-10 px-2 lg:p-12 flex flex-col gap-10  h-screen overflow-y-scroll">
			<h1 className="text-4xl font-bold text-center">အသင်းဝင်ခွင့်လျှောက်လွှာ</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-3/4 grid grid-cols-2 gap-x-14 gap-y-5 mx-auto text-xs lg:text-base">
					<div className="col-span-2 flex items-center justify-center relative ">
						<FormField
							control={form.control}
							name="photo"
							render={({ field }) => (
								<FormItem className="w-40 h-40 lg:w-60 lg:h-60  rounded-full  border-2 border-green-800 mb-3 grid place-items-center overflow-hidden">
									<label htmlFor="profilePic" title="Add profile photo" className="w-10 h-10 pb-2 text-3xl backdrop-blur-sm bg-black/10  text-white rounded-full grid place-items-center absolute ">
										+
									</label>
									<div>
										<img id="selectedImage" alt="" className="-mt-2 object-cover" />
									</div>
									<FormControl className="hidden">
										<Input
											id="profilePic"
											accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												displayImage();
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
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အခြားအမည်</FormLabel>
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
						name="fatherName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အဖအမည်</FormLabel>
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
						name="dob"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မွေးသက္ကရာဇ်</FormLabel>
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
						name="education"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပညာအရည်အချင်း</FormLabel>
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
						name="ethnicity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>လူမျိုး</FormLabel>
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
						name="religion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဘာသာ</FormLabel>
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
						name="nrc"
						render={({ field }) => (
							<FormItem>
								<FormLabel>နိုင်ငံသားစီစစ်ရေးကဒ်ပြားအမှတ်</FormLabel>
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
						name="companyName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကုမ္ပဏီအမည်</FormLabel>
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
						name="companyAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကုမ္ပဏီလိပ်စာ</FormLabel>
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
						name="cornBusinessLife"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ပြောင်းလုပ်ငန်းသက်တမ်း</FormLabel>
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
						name="homeAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အိမ်လိပ်စာ</FormLabel>
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
						name="homeNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>အိမ်အမှတ်</FormLabel>
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
						name="homeStreet"
						render={({ field }) => (
							<FormItem>
								<FormLabel>လမ်း</FormLabel>
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
						name="homeQuater"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ရပ်ကွက်</FormLabel>
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
						name="homeVillage"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ကျေးရွာ</FormLabel>
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
						name="homeTownship"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မြို့</FormLabel>
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
						name="homeDivisionState"
						render={({ field }) => (
							<FormItem>
								<FormLabel>တိုင်းဒေသကြီး/ခရိုင်</FormLabel>
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
						name="phoneNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဖုန်းနံပါတ်</FormLabel>
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
						name="numberOfSiblings"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မိသားစုဝင်ဦးရေ</FormLabel>
								<FormControl>
									<Input type="number" {...field} required />
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
						name="bankAccNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ဘဏ်အကောင့်နံပါတ်</FormLabel>
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
						name="paymentAppNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ငွေပေးချေမည့်အက်ပ်နံပါတ်</FormLabel>
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
						name="paymentAppType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ငွေပေးချေမည့်အက်ပ်အမျိုးအစား</FormLabel>
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
						name="nrcFPhoto"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မှတ်ပုံတင်(အရှေ့)</FormLabel>
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
						name="nrcBPhoto"
						render={({ field }) => (
							<FormItem>
								<FormLabel>မှတ်ပုံတင်(အနောက်)</FormLabel>
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

					<div className="col-start-1 col-span-2 flex justify-end">
						<Button type="submit" className="w-[200px] h-[50px] text-base bg-green-800 hover:bg-green-700 pt-1">
							အတည်ပြုမည်
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default MemberPage;
