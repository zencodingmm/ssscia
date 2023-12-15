import Image from 'next/image';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { BiSolidQuoteAltRight } from 'react-icons/bi';
import React from 'react';

const team = [
	{
		src: '/team/team1.jpg',
		memberName: 'ဦးမောင်မောင်',
		position: 'ဥက္ကဋ္ဌ',
		phone: '099999999',
		email: 'mgmg@gmail.com',
		content:
			'Mark Ruffalo သည် 1990 ခုနှစ်တွင် ၎င်း၏စင်မြင့်ကို ပွဲဦးထွက်ပြသခဲ့ပြီး ဆယ်စုနှစ်တစ်ခုအကြာတွင် ၎င်း၏အသက်မွေးဝမ်းကြောင်းလုပ်ငန်းသည် You Can Count on Me ဇာတ်ကားတွင် အဓိကပါဝင်သရုပ်ဆောင်ခဲ့သည်။ Eternal Sunshine of the Spotless Mind နှင့် Shutter Island ကဲ့သို့သော ထိပ်တန်းရုပ်ရှင်များတွင် အပိုင်းများပါ၀င်လာပြီး 2012 တွင် Ruffalo သည် smash live-action ဇာတ်ကား The Avengers တွင် Hulk ကို သရုပ်ဖော်သောအခါ အဆင့်အသစ်သို့ ဦးတည်သွားသည်ကို တွေ့ရှိခဲ့သည်။ 2010 ခုနှစ်၏ The Kids Are All Right ဇာတ်ကားအတွက် အကယ်ဒမီဆုများ ရရှိထားပြီးဖြစ်သော Ruffalo သည် Foxcatcher နှင့် Spotlight ဇာတ်ကားများတွင် ၎င်း၏ အခန်းကဏ္ဍအတွက် နောက်ထပ် အော်စကာ ဆန်ကာတင်စာရင်းများ ထပ်မံရရှိခဲ့သည်။',
	},
	{
		src: '/team/team2.jpg',
		memberName: 'ဒေါ်အေးအေး',
		position: 'အဖွဲ့ဝင်',
		phone: '099999999',
		email: 'mgmg@gmail.com',
		content:
			'Ruffalo သည် smash live-action ဇာတ်ကား The Avengers တွင် Hulk ကို သရုပ်ဖော်သောအခါ အဆင့်အသစ်သို့ ဦးတည်သွားသည်ကို တွေ့ရှိခဲ့သည်။ 2010 ခုနှစ်၏ The Kids Are All Right ဇာတ်ကားအတွက် အကယ်ဒမီဆုများ ရရှိထားပြီးဖြစ်သော Ruffalo သည် Foxcatcher နှင့် Spotlight ဇာတ်ကားများတွင် ၎င်း၏ အခန်းကဏ္ဍအတွက် နောက်ထပ် အော်စကာ ဆန်ကာတင်စာရင်းများ ထပ်မံရရှိခဲ့သည်။',
	},
	{
		src: '/team/team1.jpg',
		memberName: 'ဦးမောင်မောင်',
		position: 'ဥက္ကဋ္ဌ',
		phone: '099999999',
		email: 'mgmg@gmail.com',
		content:
			'Mark Ruffalo သည် 1990 ခုနှစ်တွင် ၎င်း၏စင်မြင့်ကို ပွဲဦးထွက်ပြသခဲ့ပြီး ဆယ်စုနှစ်တစ်ခုအကြာတွင် ၎င်း၏အသက်မွေးဝမ်းကြောင်းလုပ်ငန်းသည် You Can Count on Me ဇာတ်ကားတွင် အဓိကပါဝင်သရုပ်ဆောင်ခဲ့သည်။ Eternal Sunshine of the Spotless Mind နှင့် Shutter Island ကဲ့သို့သော ထိပ်တန်းရုပ်ရှင်များတွင် အပိုင်းများပါ၀င်လာပြီး 2012 တွင် Ruffalo သည် smash live-action ဇာတ်ကား The Avengers တွင် Hulk ကို သရုပ်ဖော်သောအခါ အဆင့်အသစ်သို့ ဦးတည်သွားသည်ကို တွေ့ရှိခဲ့သည်။ 2010 ခုနှစ်၏ The Kids Are All Right ဇာတ်ကားအတွက် အကယ်ဒမီဆုများ ရရှိထားပြီးဖြစ်သော Ruffalo သည် Foxcatcher နှင့် Spotlight ဇာတ်ကားများတွင် ၎င်း၏ အခန်းကဏ္ဍအတွက် နောက်ထပ် အော်စကာ ဆန်ကာတင်စာရင်းများ ထပ်မံရရှိခဲ့သည်။',
	},
	{
		src: '/team/team2.jpg',
		memberName: 'ဒေါ်အေးအေး',
		position: 'အဖွဲ့ဝင်',
		phone: '099999999',
		email: 'mgmg@gmail.com',
		content:
			'Ruffalo သည် smash live-action ဇာတ်ကား The Avengers တွင် Hulk ကို သရုပ်ဖော်သောအခါ အဆင့်အသစ်သို့ ဦးတည်သွားသည်ကို တွေ့ရှိခဲ့သည်။ 2010 ခုနှစ်၏ The Kids Are All Right ဇာတ်ကားအတွက် အကယ်ဒမီဆုများ ရရှိထားပြီးဖြစ်သော Ruffalo သည် Foxcatcher နှင့် Spotlight ဇာတ်ကားများတွင် ၎င်း၏ အခန်းကဏ္ဍအတွက် နောက်ထပ် အော်စကာ ဆန်ကာတင်စာရင်းများ ထပ်မံရရှိခဲ့သည်။',
	},
];

async function fetchMembers() {
	const response = await fetch(`http://localhost:4000/api/posts?cattype=3`, {
		next: {
			revalidate: 0,
		},
	});
	return await response.json();
}

async function fetchCategories() {
	const response = await fetch(`http://localhost:4000/api/categories/news/type?type=3`, {
		next: {
			revalidate: 0,
		},
	});

	const data = await response.json();
	return data;
}

const TeamPage = async () => {
	const { posts } = await fetchMembers();
	const categories = await fetchCategories();

	console.log('posts =>', posts);
	console.log('categories => ', categories);

	if (posts.length === 0) return <div className="flex justify-center items-center h-[50vh]"><span>No posts.</span></div>;

	return (
		<section className="container grid grid-cols-1 md:grid-cols-2 gap-6 ">
			{posts.map((info: any, index: number) => (
				<div key={index} className="space-y-5 p-10 rounded-md shadow-lg">
					<div className="flex items-start gap-3">
						<Image src={`http://localhost:4000/uploads/posts/${info.images}`} alt="team image1" width={80}
							   height={80} className="rounded-full" />
						<div>
							<h1 className="font-bold">{info.title}</h1>
							<p className="font-bold text-xs">{categories.find((cat: any) => cat.id == info.category_id).description}</p>
							{/* <p className="text-gray-400 text-xs mt-1">{info.phone}</p> */}
							<p className="text-gray-400 text-xs">{info.links}</p>
						</div>
					</div>

					<div className="indent-8 relative text-justify">
						<BiSolidQuoteAltLeft className="w-6 h-6 text-orange-600 inline-block absolute left-0 -top-1" />
						<div className="font-semibold mb-2 text-sm leading-tight sm:leading-normal overflow-hidden"
							 dangerouslySetInnerHTML={{ __html: info.description }} />
						<BiSolidQuoteAltRight className="w-6 h-6 text-orange-600 inline-block ml-2" />
					</div>
				</div>
			))}
		</section>
	);
};

export default TeamPage;
