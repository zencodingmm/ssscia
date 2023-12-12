import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

interface NewsCardProps {
	id: number;
	description: string;
	createdAt: string;
	links: string;
	images: string;
	title: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	id,
	description,
	createdAt,
	links,
	images,
	title,
}) => {
	const formattedDate = format(new Date(createdAt), "MMMM dd, yyyy");
	return (
		<div className="group h-[300px] overflow-hidden rounded-sm relative flex flex-col items-center justify-center">
			<Image
				width={400}
				height={400}
				src={images}
				alt=""
				className="object-cover w-full h-full"
			/>
			<div className="group-hover:opacity-100 opacity-0 transition  duration-300 absolute bottom-0 w-full rounded-sm p-4">
				<Link href={`/news/${id}`}>
					<div className="group bg-white backdrop-blur-md space-y-1 p-3 rounded-sm">
						<h1 className="font-bold text-lg line-clamp-2">{title}</h1>
						<div
							dangerouslySetInnerHTML={{ __html: description }}
							className="line-clamp-2 text-sm text-left lg:text-justify"
						/>
						{/* <a href={links} className="text-xs text-gray-600">
						{links}
					</a> */}
						<p className="text-xs text-gray-600">{formattedDate}</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default NewsCard;
