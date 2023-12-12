import React from "react";
import Image from "next/image";

const images = [
	{ src: "/partners/aa.jpg", title: "aa" },
	{ src: "/partners/awba.jpg", title: "awba" },
	{ src: "/partners/dana.jpg", title: "ဓန" },
	{ src: "/partners/dny.jpg", title: "dny" },
	{ src: "/partners/kbz.jpg", title: "kbz" },
	{ src: "/partners/msp.jpg", title: "msp" },
	{ src: "/partners/sgb.jpg", title: "sgb" },
	{ src: "/partners/toetatthu.jpg", title: "toe tat thu" },
	{ src: "/partners/uab.jpg", title: "uab" },
	{ src: "/partners/zpt.jpg", title: "spt" },
];
const imgClass = "grayscale hover:grayscale-0 hover:scale-150 duration-300";
const leftImg = " col-span-1 md:col-start-3 lg:col-start-2";
const lastImg = " col-span-1 md:col-start-2 lg:col-start-3";
const PartnerLogos = () => {
	return (
		<div className="container">
			<h1 className="text-center text-3xl text-gray-500 mb-10">
				Our <strong>Partners</strong>
			</h1>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-10">
				{images.map((img, index) => {
					if (index == images.length - 2) {
						return (
							<div key={index} className={leftImg}>
								<h1 className="text-center uppercase mb-8">
									{img.title}
								</h1>
								<Image
									src={img.src}
									width={120}
									height={80}
									alt=""
									className={imgClass}
								></Image>
							</div>
						);
					}
					if (index == images.length - 1) {
						return (
							<div key={index} className={lastImg}>
								<h1 className="text-center uppercase mb-5">
									{img.title}
								</h1>
								<Image
									src={img.src}
									width={120}
									height={80}
									alt=""
									className={imgClass}
								></Image>
							</div>
						);
					}
					return (
						<div key={index}>
							<h1 className="text-center uppercase mb-5">{img.title}</h1>
							<Image
								src={img.src}
								width={120}
								height={80}
								alt=""
								className={imgClass}
							></Image>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PartnerLogos;
