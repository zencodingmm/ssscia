import axios from "axios";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Users[]> {
	try {
		const response = await axios.get("http://localhost:4000/api/users");
		const users: Users[] = response.data.map((user: any, index: number) => {
			return {
				id: (index + 1).toString(), // Use index as a number and then convert it to a string
				userid: user.userid,
				user_name: user.user_name,
				email: user.email,
				phone_no: user.phone_no,
				address: user.address,
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
