"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./map.css";
import { MapContainer, FeatureGroup, TileLayer, LayersControl, LayerGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store";
import axios from "axios";
import MemberLogin from "@/components/users/memberLogin";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	userId: z.string(),
	memberId: z.string(),
	numberOfMap: z.string().min(2, {
		message: "Must be at least 2 characters.",
	}),
	own: z.any(),
	rent: z.any(),
	acreAge: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	pitchNo: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	ownershipNo: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	landType: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	acresOfLandOwned: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	acresOfLandGround: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	formSevenFormOnehundredfiveAcresOfContract: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	formSevenAcresOfApplied: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	namesOfNeighborOfFarmEast: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	namesOfNeighborOfFarmWest: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	namesOfNeighborOfFarmSouth: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	namesOfNeighborOfFarmNorth: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	numberOfFamilyMembersByGrandparents: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	applyFamilyOneName: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	applyFamilyOneNrc: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	applyFamilyTwoName: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	applyFamilyTwoNrc: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	timeValue: z.string().max(100, {
		message: "Must be less than 100 characters",
	}),
	photoFormSeven: z.instanceof(File),
	photoFormOnehundredfive: z.instanceof(File),
	photoContract: z.instanceof(File),
	photoAncestralProperty: z.instanceof(File),
	photoOther: z.instanceof(File),
	photoHouseholdChart: z.instanceof(File),
});

const Map = () => {
	const [showForm, setShowForm] = useState(false);
	const polygonRef = useRef([]);
	const { userID, memberID, setIsMember, setMemberID, isMember } = useAuthStore();
	const center: L.LatLngExpression = [20.7825, 96.0691];
	let data: any = [];
	const { polygons, addPolygon } = useAuthStore();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userId: "",
			memberId: "",
			own: false,
			rent: false,
			acreAge: "",
			pitchNo: "",
			ownershipNo: "",
			landType: "",
			acresOfLandOwned: "",
			acresOfLandGround: "",
			formSevenFormOnehundredfiveAcresOfContract: "",
			formSevenAcresOfApplied: "",
			namesOfNeighborOfFarmEast: "",
			namesOfNeighborOfFarmWest: "",
			namesOfNeighborOfFarmSouth: "",
			namesOfNeighborOfFarmNorth: "",
			numberOfFamilyMembersByGrandparents: "",
			applyFamilyOneName: "",
			applyFamilyOneNrc: "",
			applyFamilyTwoName: "",
			applyFamilyTwoNrc: "",
			timeValue: "",
			photoFormSeven: new File([], ""),
			photoFormOnehundredfive: new File([], ""),
			photoContract: new File([], ""),
			photoAncestralProperty: new File([], ""),
			photoOther: new File([], ""),
			photoHouseholdChart: new File([], ""),
		},
	});

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`)
			.then((response) => {
				if (response.data) {
					setIsMember(true);
					setMemberID(response.data.member_id);
				} else {
					setIsMember(false);
				}
			})
			.catch((err) => {
				setIsMember(false);
			});
	}, [isMember]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		// toast("Land factors were successfully created.")
		// @ts-ignore
		const formData = new FormData();
		formData.append("userid", userID);
		formData.append("member_id", memberID);
		formData.append("number_of_map", values.numberOfMap);
		formData.append("own", values.own);
		formData.append("rent", values.rent);
		formData.append("acreage", values.acreAge);
		formData.append("pitch_no", values.pitchNo);
		formData.append("ownership_no", values.ownershipNo);
		formData.append("land_type", values.landType);
		formData.append("acres_of_land_owned", values.acresOfLandOwned);
		formData.append("acres_of_land_ground", values.acresOfLandGround);
		formData.append("form_seven_form_onehundredfive_acres_of_contract", values.formSevenFormOnehundredfiveAcresOfContract);
		formData.append("form_seven_acres_of_applied", values.formSevenAcresOfApplied);
		formData.append("names_of_neighbor_of_farm_east", values.namesOfNeighborOfFarmEast);
		formData.append("names_of_neighbor_of_farm_west", values.namesOfNeighborOfFarmWest);
		formData.append("names_of_neighbor_of_farm_south", values.namesOfNeighborOfFarmSouth);
		formData.append("names_of_neighbor_of_farm_north", values.namesOfNeighborOfFarmNorth);
		formData.append("number_of_family_members_by_grandparents", values.numberOfFamilyMembersByGrandparents);
		formData.append("apply_family_one_name", values.applyFamilyOneName);
		formData.append("apply_family_one_nrc", values.applyFamilyOneNrc);
		formData.append("apply_family_two_name", values.applyFamilyTwoName);
		formData.append("apply_family_two_nrc", values.applyFamilyTwoNrc);
		formData.append("time_value", values.timeValue);
		formData.append("photo_form_seven", values.photoFormSeven);
		formData.append("photo_form_onehundredfive", values.photoFormOnehundredfive);
		formData.append("photo_contract", values.photoContract);
		formData.append("photo_ancestral_property", values.photoAncestralProperty);
		formData.append("photo_other", values.photoOther);
		formData.append("photo_household_chart", values.photoHouseholdChart);

		axios
			.post("http://localhost:4000/api/landfactors", formData, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				router.push("/dashboard");
				router.refresh();
				form.reset();
				form.resetField("photoAncestralProperty");
				form.resetField("photoContract");
				form.resetField("photoFormOnehundredfive");
				form.resetField("photoFormSeven");
				form.resetField("photoHouseholdChart");
				form.resetField("photoOther");
				toast("Inserted data.");
			})
			.catch((err) => console.log(err))
			.finally(() => {
				router.replace("/dashboard");
			});
	}

	const handleCreate = (e: any) => {
		console.log("Created!");
		const { layerType, layer } = e;
		if (layerType === "polygon") {
			// const polygonData = layer.toGeoJSON().geometry.coordinates;
			const polygonData = layer.getLatLngs();
			for (let i = 0; i < polygonData[0].length; i++) {
				data.push([polygonData[0][i].lat, polygonData[0][i].lng]);
			}

			// @ts-ignore
			polygonRef.current = [...data];
			data = [];

			form.setValue("numberOfMap", JSON.stringify(polygonRef.current));
			// @ts-ignore
			setShowForm(true);
		}
	};

	const handleEdit = (e: any) => {
		polygonRef.current = [];
		data = [];
	};

	const handleDelete = (e: any) => {
		polygonRef.current = [];
		data = [];
	};

	if (!isMember) return <MemberLogin />;

	return (
		<div className="w-full flex justify-between items-start">
			<div className="w-full p-2 h-screen overflow-hidden">
				<MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ width: "100%", height: "100%", borderRadius: "10px" }} id="map">
					{/* <TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/> */}

					<TileLayer attribution="Google Maps Satellite" url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}" />
					<TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />

					<FeatureGroup>
						<EditControl
							position="topright"
							onEdited={(e) => handleEdit(e)}
							onCreated={(e) => handleCreate(e)}
							onDeleted={(e) => handleDelete(e)}
							draw={{
								rectangle: false,
								polyline: false,
								circle: false,
								marker: false,
								circlemarker: false,
							}}
							edit={false}
						/>
					</FeatureGroup>
				</MapContainer>
			</div>

			{showForm && (
				<div className="flex bg-slate-100 flex-col h-screen items-start overflow-y-scroll p-3">
					<h1 className="text-xl font-bold mb-3 text-center">မြေယာဆိုင်ရာအချက်အလက်များ</h1>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" encType="multipart/form-data">
							<FormField
								control={form.control}
								name="numberOfMap"
								render={({ field }) => (
									<FormItem>
										<FormLabel>မြေပုံရှိနံပါတ်</FormLabel>
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
							<div className="flex items-center gap-12">
								<FormField
									control={form.control}
									name="own"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ကိုယ်ပိုင်</FormLabel>
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
									name="rent"
									render={({ field }) => (
										<FormItem>
											<FormLabel>အငှား</FormLabel>
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
								name="acreAge"
								render={({ field }) => (
									<FormItem>
										<FormLabel>စိုက်ဧက</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} required />
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
								name="pitchNo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ကွင်းအမှတ်</FormLabel>
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
								name="ownershipNo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ဦးပိုင်အမှတ်</FormLabel>
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
								name="landType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>မြေအမျိုးအစား</FormLabel>
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
								name="acresOfLandOwned"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ပိုင်ဆိုင်သည့်မြေဧက</FormLabel>
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
								name="acresOfLandGround"
								render={({ field }) => (
									<FormItem>
										<FormLabel>မြေပြင်ရှိမြေဧက</FormLabel>
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
								name="formSevenFormOnehundredfiveAcresOfContract"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ပုံစံ(၇)/ပုံစံ(၁၀၅)/စာချုပ်ပါမြေဧက</FormLabel>
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
								name="formSevenAcresOfApplied"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ပုံစံ(၇)လျှောက်ထားလိုသည့်မြေဧက</FormLabel>
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
								name="namesOfNeighborOfFarmEast"
								render={({ field }) => (
									<FormItem>
										<FormLabel>တောင်သူအမည်(အရှေ့ဘက်)</FormLabel>
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
								name="namesOfNeighborOfFarmWest"
								render={({ field }) => (
									<FormItem>
										<FormLabel>တောင်သူအမည်(အနောက်ဘက်)</FormLabel>
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
								name="namesOfNeighborOfFarmSouth"
								render={({ field }) => (
									<FormItem>
										<FormLabel>တောင်သူအမည်(တောင်ဘက်)</FormLabel>
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
								name="namesOfNeighborOfFarmNorth"
								render={({ field }) => (
									<FormItem>
										<FormLabel>တောင်သူအမည်(မြောက်ဘက်)</FormLabel>
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
								name="numberOfFamilyMembersByGrandparents"
								render={({ field }) => (
									<FormItem>
										<FormLabel>မိသားစုဝင်အရေအတွက်</FormLabel>
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
								name="applyFamilyOneName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ထောက်ခံမည့်မိသားစုဝင်(၁) အမည်</FormLabel>
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
								name="applyFamilyOneNrc"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ထောက်ခံမည့်မိသားစုဝင်(၁) မှတ်ပုံတင်အမှတ်</FormLabel>
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
								name="applyFamilyTwoName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ထောက်ခံမည့်မိသားစုဝင်(၂) အမည်</FormLabel>
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
								name="applyFamilyTwoNrc"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ထောက်ခံမည့်မိသားစုဝင်(၂) မှတ်ပုံတင်အမှတ်</FormLabel>
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
								name="timeValue"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ကာလတန်ဖိုး</FormLabel>
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
								name="photoFormSeven"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ပုံစံ(၇) ဓာတ်ပုံ</FormLabel>
										<FormControl>
											<Input accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
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
								name="photoFormOnehundredfive"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ပုံစံ(၁၀၅) ဓာတ်ပုံ</FormLabel>
										<FormControl>
											<Input accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
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
								name="photoContract"
								render={({ field }) => (
									<FormItem>
										<FormLabel>စာချုပ်ဓာတ်ပုံ</FormLabel>
										<FormControl>
											<Input accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
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
								name="photoAncestralProperty"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ဘိုးဘွားပိုင်မြေဓာတ်ပုံ</FormLabel>
										<FormControl>
											<Input accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
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
								name="photoOther"
								render={({ field }) => (
									<FormItem>
										<FormLabel>အခြား</FormLabel>
										<FormControl>
											<Input accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
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
								name="photoHouseholdChart"
								render={({ field }) => (
									<FormItem>
										<FormLabel>အိမ်ထောင်စုဇယားဓာတ်ပုံ</FormLabel>
										<FormControl>
											<Input accept=".jpg, .jpeg, .png, .svg, .gif, .webp" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} type="file" required />
										</FormControl>
										{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end">
								<Button type="submit" variant="default" className="bg-green-800 hover:bg-green-700 flex items-center justify-center pt-1">
									အတည်ပြုမည်
								</Button>
							</div>
						</form>
					</Form>
				</div>
			)}
		</div>
	);
};

export default Map;
