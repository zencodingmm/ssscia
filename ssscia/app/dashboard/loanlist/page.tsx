"use client";
import axios from "axios";
import { LoanMember, columns } from "./columns";
import { DataTable } from "./data-table";
import { get } from "http";
import useAuthStore from "@/lib/store";
import { useEffect, useState } from "react";
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
		getData();
	}, [memberID]);

	function getData() {
		const response = axios
			.get(`http://localhost:4000/api/loansubmittion/members/${memberID}`)
			.then((response) => {
				setFetched(false);
				const users: any = response.data.map((loanmember: any, index: number) => {
					return {
						dbId: loanmember.id,
						id: (index + 1).toString(), // Use index as a number and then convert it to a string
						userId: loanmember.userid,
						memberId: loanmember.memberid,
						loanSubmitDate: loanmember.loan_submit_date,
						loanAmount: loanmember.loan_amount,
						landValueAndAcresToBeInsured: loanmember.land_value_and_acres_to_be_insured,
						isApplyPerson: loanmember.is_apply_person,
						relationshipWithSupporters: loanmember.relationship_with_supporters,
						isCurrentCropCultivation: loanmember.is_current_crop_cultivation,
						isTakenLoan: loanmember.is_taken_loan,
						proofOfRepayment: loanmember.proof_of_repayment,
						isHealthAndChronicDisease: loanmember.is_health_and_chronic_disease,
						supporterOneName: loanmember.supporter_one_name,
						supporterOneNrc: loanmember.supporter_one_nrc,
						supporterOneDob: loanmember.supporter_one_dob,
						supporterOneAge: loanmember.supporter_one_age,
						supporterOnePlace: loanmember.supporter_one_place,
						supporterOnePhone: loanmember.supporter_one_phone,
						supporterTwoName: loanmember.supporter_two_name,
						supporterTwoNrc: loanmember.supporter_two_nrc,
						supporterTwoDob: loanmember.supporter_two_dob,
						supporterTwoPlace: loanmember.supporter_two_place,
						supporterTwoPhone: loanmember.supporter_two_phone,
						healthSupporter: loanmember.health_supporter,
						photographOfLandToBeInsured: loanmember.photograph_of_land_to_be_insured,
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
