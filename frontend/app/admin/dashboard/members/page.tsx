import axios from "axios";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;
async function getData(): Promise<Users[]> {
	try {
		const response = await axios.get("http://localhost:4000/api/members");
		const users: Users[] = response.data.map((user: any, index: number) => {
			return {
				id: (index + 1).toString(), // Use index as a number and then convert it to a string
				dbId: user.id,
				user_id: user.userid,
				member_id: user.member_id,
				first_name: user.first_name,
				last_name: user.last_name,
				father_name: user.father_name,
				education: user.education,
				ethnicity: user.ethnicity,
				religion: user.religion,
				nrc: user.nrc,
				company_name: user.company_name,
				company_address: user.company_address,
				corn_business_life: user.corn_business_life,
				home_address: user.home_address,
				email_address: user.email_address,
				home_no: user.home_no,
				home_street: user.home_street,
				home_quater: user.home_quater,
				home_village: user.home_village,
				home_township: user.home_township,
				home_division_state: user.home_division_state,
				number_of_siblings: user.number_of_siblings,
				phone_no: user.phone_no,
				bank_acc_no: user.bank_acc_no,
				bank_name: user.bank_name,
				payment_app_number: user.payment_app_number,
				payment_app_type: user.payment_app_type,
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
