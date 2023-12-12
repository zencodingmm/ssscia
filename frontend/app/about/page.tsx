import Image from "next/image";
async function fetchAbout() {
	const response = await fetch(`http://localhost:4000/api/posts?cattype=4`);
	const data = await response.json();
	return data;
}
const Page = async () => {
	const { posts } = await fetchAbout();
	return (
		<section>
			{posts.map((post: any, index: number) => {
				return (
					<div key={index} className="container flex flex-col lg:flex-row items-center gap-12 ">
						<Image src={`http://localhost:4000/uploads/posts/${post.images}`} width={550} height={300} alt="about image" />
						<div className="space-y-5">
							<h1 className="text-4xl font-bold text-gray-600 text-center lg:text-left">{post.title}</h1>

							<div className="text-gray-500" dangerouslySetInnerHTML={{ __html: post.description }} />
						</div>
					</div>
				);
			})}
		</section>
	);
};

export default Page;
