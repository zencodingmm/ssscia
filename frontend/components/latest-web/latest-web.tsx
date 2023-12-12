import React from "react";

export default function LatestWeb() {
	return (
		<div className="bg-gray-100">
			<div className="container flex flex-col lg:flex-row gap-10 items-center ">
				<div>
					<h1 className="text-3xl font-bold text-gray-500 text-center mb-4">
						We&apos;ve updated &nbsp; <br className="block md:hidden" />
						<span className="text-orange-600">
							&quot; latest websites &quot;
						</span>
					</h1>
					<p className="text-center px-8">
						Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint
						occaecat cupidatat non proident, sunt in culpa qui officia
						deserunt mollit anim id est laborum.
					</p>
				</div>
				<div>
					<button className="w-[150px] h-[50px] uppercase bg-white outline text-green-800   rounded-lg hover:text-white hover:bg-green-800 duration-300">
						see more
					</button>
				</div>
			</div>
		</div>
	);
}
