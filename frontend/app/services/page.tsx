import { TbSettingsCog } from "react-icons/tb";
import Link from "next/link";

async function fetchServiceCategories() {
	try {
		const response = await fetch(`http://localhost:4000/api/categories/news/type?type=2`, {
			next: {
				revalidate: 0,
			},
		});
		const categories = await response.json();
		return categories;
	} catch (error) {}
}

const ServicesPage = async () => {
	const categories = await fetchServiceCategories();

	return (
		<section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 mt-10">
			{categories ? (
				categories.map((category: any, index: number) => {
					return (
						<Link href={`/services/${category.id}`} key={index} className="group flex flex-col items-center gap-3 border px-12 py-14 shadow-sm hover:shadow-md rounded-lg">
							<h1 className="text-lg font-bold mb-1">{category.description}</h1>
							<p className="text-sm text-center text-gray-500">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
						</Link>
					);
				})
			) : (
				<div className="col-span-1 md:col-span-2 lg:col-span-3  gap-x-5 gap-y-10 mt-10">No service.</div>
			)}
		</section>
	);
};

export default ServicesPage;
