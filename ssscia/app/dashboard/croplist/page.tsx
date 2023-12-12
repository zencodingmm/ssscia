"use client";
import axios from "axios";
import { Cropfactors, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import useAuthStore from "@/lib/store";
import MemberLogin from "@/components/users/memberLogin";

export default function DemoPage() {
	const [data, setData] = useState([]);
	const [fetched, setFetched] = useState(false);
	const { memberID, isMember, userID, setIsMember, setMemberID } = useAuthStore();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/members/${userID}`)
			.then((response) => {
				setIsMember(true);
				setMemberID(response.data.member_id);
			})
			.catch((err) => {
				setIsMember(false);
			});
	}, []);

	useEffect(() => {
		getData(memberID);
	}, [memberID]);

	function getData(id: string) {
		axios
			.get(`http://localhost:4000/api/cropfactors/members/${id}`)
			.then((response) => {
				setFetched(false);
				const cropfactors: any = response.data.map((cropfactor: any, index: number) => {
					return {
						id: cropfactor.id, // Use index as a number and then convert it to a string
						userId: cropfactor.userid,
						memberId: cropfactor.member_id,
						landImprovement: cropfactor.land_improvement,
						landImprovementCosts: cropfactor.land_improvement_costs,
						typeOfSeedName: cropfactor.type_of_seed_name,
						typeOfSeedBedsNo: cropfactor.type_of_seed_beds_no,
						typeOfSeedCost: cropfactor.type_of_seed_cost,
						typeOfSeedBuyShop: cropfactor.type_of_seed_buy_shop,
						manureName: cropfactor.manure_name,
						manureBedsNo: cropfactor.manure_beds_no,
						manureCost: cropfactor.manure_cost,
						manureManpower: cropfactor.manure_manpower,
						manureBuyShop: cropfactor.manure_buy_shop,
						pesticidesType: cropfactor.pesticides_type,
						pesticidesFrequencyOfSpraying: cropfactor.pesticides_type,
						pesticidesManpower: cropfactor.pesticides_manpower,
						pesticidesCost: cropfactor.pesticides_cost,
						pesticidesBuyShop: cropfactor.pesticides_buy_shop,
						typesOfCropsGrownAndAcreage: cropfactor.types_of_crops_grown_and_acreage,
						harvestingAndThreshingOwn: cropfactor.harvesting_and_threshing_own,
						harvestingAndThreshingRental: cropfactor.harvesting_and_threshing_rental,
						harvestingAndThreshingType: cropfactor.harvesting_and_threshing_type,
						harvestingAndThreshingManpower: cropfactor.harvesting_and_threshing_manpower,
						harvestingAndThreshingSavingsCosts: cropfactor.harvesting_and_threshing_savings_costs,
						harvestingAndThreshingDeviceName: cropfactor.harvesting_and_threshing_device_name,
						oneAcreOutput: cropfactor.one_acre_output,
						totalYield: cropfactor.total_yield,
						salesFairOrDealer: cropfactor.sales_fair_or_dealer,
						salesFairOrDealerPriceReceived: cropfactor.sales_fair_or_dealer_price_received,
						isLoan: cropfactor.is_loan,
						loanPerson: cropfactor.loan_person,
						isSeedLoan: cropfactor.is_seed_loan,
						seenLoanPerson: cropfactor.seen_loan_person,
						isFertilizerLoan: cropfactor.is_fertilizer_loan,
						fertilizerLoanPerson: cropfactor.fertilizer_loan_person,
					};
				});

				setData(cropfactors);
				setFetched(true);
			})
			.catch((err) => {
				setData([]);
				setFetched(true);
			});
	}

	if (!isMember) return <MemberLogin />;

	if (fetched)
		return (
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		);
}
