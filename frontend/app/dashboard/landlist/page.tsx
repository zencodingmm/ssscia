"use client";
import axios from "axios";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
import useAuthStore from "@/lib/store";
import { useEffect, useState } from "react";
import MemberLogin from "@/components/users/memberLogin";

export default function DemoPage() {
	const [fetched, setFetched] = useState(false);
	const [data, setData] = useState([]);
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
			.get(`http://localhost:4000/api/landfactors/members/${id}`)
			.then((response) => {
				setFetched(false);
				const users: any = response.data.map((user: any, index: number) => {
					return {
						id: (index + 1).toString(), // Use index as a number and then convert it to a string
						userId: user.userid,
						memberId: user.member_id,
						numberOfMap: user.number_of_map,
						own: user.own,
						rent: user.rent,
						acreAge: user.acreage,
						pitchNo: user.pitch_no,
						ownershipNo: user.ownership_no,
						landType: user.land_type,
						acresOfLandOwned: user.acres_of_land_owned,
						acresOfLandGround: user.acres_of_land_ground,
						formSevenFormOnehundredfiveAcresOfContract: user.form_seven_form_onehundredfive_acres_of_contract,
						formSevenAcresOfApplied: user.form_seven_acres_of_applied,
						namesOfNeighborOfFarmEast: user.names_of_neighbor_of_farm_east,
						namesOfNeighborOfFarmWest: user.names_of_neighbor_of_farm_west,
						namesOfNeighborOfFarmSouth: user.names_of_neighbor_of_farm_south,
						namesOfNeighborOfFarmNorth: user.names_of_neighbor_of_farm_north,
						numberOfFamilyMembersByGrandparents: user.number_of_family_members_by_grandparents,
						applyFamilyOneName: user.apply_family_one_name,
						applyFamilyOneNrc: user.apply_family_one_nrc,
						applyFamilyTwoName: user.apply_family_two_name,
						applyFamilyTwoNrc: user.apply_family_two_nrc,
						timeValue: user.time_value,
					};
				});

				setData(users);
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
