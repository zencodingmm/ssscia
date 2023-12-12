import { BsFillFileEarmarkFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { FaChartSimple, FaSackDollar } from "react-icons/fa6";
import { TbSpeakerphone, TbSettingsCog } from "react-icons/tb";
import { ImHammer2 } from "react-icons/im";
import { RiFileShield2Line } from "react-icons/ri";
import { IoBus } from "react-icons/io5";
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
	console.log(categories);
	return (
		<section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-5 gap-y-10 mt-10">
			{categories ? (
				categories.map((category: any, index: number) => {
					return (
						<div key={index} className="group flex flex-col items-center gap-3 border px-12 py-14 relative">
							<div className="group w-14 h-14 rounded-full bg-green-800 grid place-items-center absolute -top-8 group-hover:bg-white group-hover:border group-hover:border-green-800 group-hover:scale-110 duration-300">
								<Link href={`/services/${category.id}`}>
									<TbSettingsCog className="text-2xl text-white group-hover:text-green-800" />
								</Link>
							</div>
							<h1 className="text-lg font-bold mb-1">{category.description}</h1>
							<p className="text-sm text-center text-gray-500">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
						</div>
					);
				})
			) : (
				<div className="col-span-1 md:col-span-2 lg:col-span-3  gap-x-5 gap-y-10 mt-10">No service.</div>
			)}
		</section>
	);
};

export default ServicesPage;
