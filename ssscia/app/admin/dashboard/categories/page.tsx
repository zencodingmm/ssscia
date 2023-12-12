import { AddNewCategory } from "./addCategory";
import { Categories, columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;

async function getData(): Promise<Categories[] | undefined> {
	try {
		const response = await fetch("http://localhost:4000/api/categories", {
			next: {
				revalidate: 0,
			},
		});
		const data = await response.json();
		const categories: Categories[] = data.map((category: any, index: number) => {
			let catType = "";

			switch (category.cat_type) {
				case 1:
					catType = "သတင်း";
					break;
				case 2:
					catType = "ဝန်ဆောင်မှု";
					break;
				case 3:
					catType = "အသင်းအဖွဲ့";
					break;
				case 4:
					catType = "အကြောင်း";
					break;
				default:
					catType = "unknown";
					break;
			}
			return {
				dbId: category.id,
				id: (index + 1).toString(), // Use index as a number and then convert it to a string
				cat_type: catType,
				description: category.description,
			};
		});
		return categories;
	} catch (error) {
		// Handle the error appropriately, for example, you can log the error or throw it again
	}
}

export default async function CategoryPage() {
	const data: any = await getData();
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-4xl font-extrabold mb-6 text-center">News Categories</h1>
			<div className="flex justify-end items-center gap-2 my-5">
				<AddNewCategory />
			</div>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
