import axios from "axios";
import { LoanMember, columns } from "./columns";
import { DataTable } from "./data-table";
import { get } from "http";

async function getData(): Promise<LoanMember[]> {
	try {
		const response = await axios.get("http://localhost:4000/api/loansubmittion");

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
