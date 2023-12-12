"use client";
import React from "react";
import Link from "next/link";
import { CiTwitter, CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { AiOutlineSkype } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
	const path = usePathname();
	const isPrintRoute = /^\/print(\/.*)?$/.test(path);
	const isUserDashboard = /^\/dashboard(\/.*)?$/.test(path);
	const isAdminDashboard = /^\/admin(\/.*)?$/.test(path);
	return (
		<footer
			className={`bg-green-900 text-gray-400 mt-6 ${
				isAdminDashboard || isPrintRoute || isUserDashboard ? "hidden" : ""
			}`}
		>
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-14 text-sm">
				<div className="space-y-5 ">
					<h1 className="text-white text-lg">SSSCIA</h1>
					<div>
						<p>Something Street, Some City, Some Town.</p>
						<p>New York, NY 535022</p>
						<p>United States</p>
					</div>
					<div>
						<p>Phone: 09-12345678, 09-12345679</p>
						<p>Email: ssscia@gmail.com</p>
					</div>
				</div>
				<div className="space-y-5">
					<h1 className="text-white">သတင်း</h1>
					<div className="grid grid-cols-2 gap-3">
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								ပြည်တွင်း
							</Link>
						</div>
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								စီးပွားရေး
							</Link>
						</div>
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								ကျန်းမာရေးဆိုင်ရာ
							</Link>
						</div>
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								တောင်သူဦးကြီးများ
							</Link>
						</div>
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								ကမ္ဘာလုံးဆိုင်ရာ
							</Link>
						</div>
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								ပြောင်းစိုက်ပျိုးရေး
							</Link>
						</div>
						<div className="flex items-center">
							<IoIosArrowForward className="text-orange-600 font-bold" />
							<Link
								href={"/news"}
								className="hover:text-orange-600 duration-300"
							>
								နည်းပညာ
							</Link>
						</div>
					</div>
				</div>
				<div className="space-y-5">
					<h1 className="text-white">အကြောင်း</h1>
					<p className="text-justify">
						၂၀၀၉ ခုနှစ်မှယနေ့အထိ ၁၂ နှစ်တိုင်တိုင်
						မြန်မာနိုင်ငံလုပ်ငန်းရှင်များ အားကိုးရသော POS
						ဆော့ဖ်ဝဲပေါင်းများစွာ ထုတ်လုပ်ခဲ့ပြီး လုပ်ငန်းပေါင်း ၆၀၀၀
						ကျော်တွင် အသုံးပြုနေကြပြီဖြစ်သည်။ အခြားနိုင်ငံများသို့
						တင်ပို့ရောင်းချရသည်အထိ လူကြိုက်များကာ ကုမ္ပဏီထုတ်
						ဆော့ဖ်ဝဲအတန်းထဲတွင် စျေးအသက်သာဆုံးနှင့် ဝန်ဆောင်မှု
						အကောင်းဆုံးအဖြစ် နာမည်ကြီးပါသည်။ GSTS ၏မူဝါဒဖြစ်သော cheap,
						easy, useful ဆိုသည့်အတိုင်း လုပ်ငန်းရှင်များ အကျိုးရှိမှုကို
						အစဉ်ရှေးရှု၍ feedback များအား အစဉ်အမြဲ ကြိုဆိုလျှက်ရှိပါသည်။
					</p>
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-between items-center gap-5 bg-green-950 px-5 md:px-10 lg:px-28 py-5">
				<div>
					<p className="text-sm">
						&copy;&nbsp; {new Date().getFullYear()} &nbsp;
						<strong>SSSCIA</strong>. All Rights Reserved.
					</p>
					<p className="text-sm">
						Designed by{" "}
						<Link href={""} className="text-orange-600">
							Yoon Han Thar
						</Link>
					</p>
				</div>
				<div className="flex gap-2 justify-center items-center ">
					<Link
						href={""}
						className="w-10 h-10 bg-orange-600 rounded-full grid place-items-center hover:bg-orange-500 duration-300"
					>
						<CiTwitter className="w-6 h-6 text-white" />
					</Link>
					<Link
						href={""}
						className="w-10 h-10 bg-orange-600 rounded-full grid place-items-center hover:bg-orange-500 duration-300"
					>
						<CiFacebook className="w-6 h-6 text-white" />
					</Link>
					<Link
						href={""}
						className="w-10 h-10 bg-orange-600 rounded-full grid place-items-center hover:bg-orange-500 duration-300"
					>
						<CiInstagram className="w-6 h-6 text-white" />
					</Link>
					<Link
						href={""}
						className="w-10 h-10 bg-orange-600 rounded-full grid place-items-center hover:bg-orange-500 duration-300"
					>
						<AiOutlineSkype className="w-6 h-6 text-white" />
					</Link>
					<Link
						href={""}
						className="w-10 h-10 bg-orange-600 rounded-full grid place-items-center hover:bg-orange-500 duration-300"
					>
						<CiLinkedin className="w-6 h-6 text-white" />
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
