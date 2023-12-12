"use client";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const slides = [
	{
		url: "/slideImages/feature-1.jpg",
	},
	{
		url: "/slideImages/feature-2.jpg",
	},
	{
		url: "/slideImages/feature-3.jpg",
	},

	{
		url: "/slideImages/feature-4.jpg",
	},
	{
		url: "/slideImages/feature-5.jpg",
	},
];

function SwiperCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoSlideDuration = 3000;
    useEffect(() => {
        const autoSlide = setInterval(() => {
          const isLastSlide = currentIndex === slides.length - 1;
          const newIndex = isLastSlide ? 0 : currentIndex + 1;
          setCurrentIndex(newIndex);
        }, autoSlideDuration);
    
        return () => {
          clearInterval(autoSlide); // Clear interval on component unmount or change
        };
      }, [currentIndex, autoSlideDuration]);
  


	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	return (
		<div className="max-w-full hidden md:block  h-[400px] lg:h-[600px] relative group">
			<div
				style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
				className="w-full h-full  bg-center bg-cover duration-500"
			></div>
			{/* Left Arrow */}
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
				<BsChevronLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
				<BsChevronRight onClick={nextSlide} size={30} />
			</div>
		</div>
	);
}

export default SwiperCarousel;
