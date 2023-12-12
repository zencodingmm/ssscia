import axios from "axios";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
export const revalidate = 0;
async function getData(): Promise<Users[]> {
	try {
		const response = await axios.get("http://localhost:4000/api/landfactors");
		const users: Users[] = response.data.map((land: any, index: number) => {
			return {
				id: (index + 1).toString(), // Use index as a number and then convert it to a string
				dbId: land.id,
				userId: land.userid,
				memberId: land.member_id,
				numberOfMap: land.number_of_map,
				own: land.own,
				rent: land.rent,
				acreAge: land.acreage,
				pitchNo: land.pitch_no,
				ownershipNo: land.ownership_no,
				landType: land.land_type,
				acresOfLandOwned: land.acres_of_land_owned,
				acresOfLandGround: land.acres_of_land_ground,
				formSevenFormOnehundredfiveAcresOfContract: land.form_seven_form_onehundredfive_acres_of_contract,
				formSevenAcresOfApplied: land.form_seven_acres_of_applied,
				namesOfNeighborOfFarmEast: land.names_of_neighbor_of_farm_east,
				namesOfNeighborOfFarmWest: land.names_of_neighbor_of_farm_west,
				namesOfNeighborOfFarmSouth: land.names_of_neighbor_of_farm_south,
				namesOfNeighborOfFarmNorth: land.names_of_neighbor_of_farm_north,
				numberOfFamilyMembersByGrandparents: land.number_of_family_members_by_grandparents,
				applyFamilyOneName: land.apply_family_one_name,
				applyFamilyOneNrc: land.apply_family_one_nrc,
				applyFamilyTwoName: land.apply_family_two_name,
				applyFamilyTwoNrc: land.apply_family_two_nrc,
				timeValue: land.time_value,
			};
		});
		return users;
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
