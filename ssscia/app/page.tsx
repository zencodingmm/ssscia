import LatestWeb from "@/components/latest-web/latest-web";
import NewsCard from "@/components/news/NewsCard";
import NewsContainer from "@/components/news/NewsContainer";
import PartnerLogos from "@/components/partnerLogos/partnerLogos";
import SwiperCarousel from "@/components/swiper/swiper";

export const revalidate = 0;

export default function Home() {

	
	return (
		<div>
			<SwiperCarousel />
			<LatestWeb />
			<NewsContainer />
			<PartnerLogos />
		</div>
	);
}
