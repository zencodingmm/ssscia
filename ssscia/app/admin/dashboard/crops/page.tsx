import axios from "axios";
import { Cropfactors, columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;

async function getData(): Promise<Cropfactors[]> {
	try {
		const response = await axios.get("http://localhost:4000/api/cropfactors");
		const cropfactors: Cropfactors[] = response.data.map((cropfactor: any, index: number) => {
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
		return cropfactors;
	} catch (error) {
		// Handle the error appropriately, for example, you can log the error or throw it again
		console.error("Error fetching data:", error);
		throw error; // Re-throwing the error for the calling function to catch or handle it
	}
}

export default async function DemoPage() {
	const data: any = await getData();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
