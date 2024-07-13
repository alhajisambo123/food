"use client";

import Right from "@/components/icons/Right";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images.jpeg",
    "/pexels-photo-393047.webp",
    "/CPT780WU Image 1.jpg",
    "/hand mixture.jpg",
    "/coffee maker.webp",
    "/electric iron.webp",
    "/electric heater.png",
    "/bag.webp",
    "/laptop bag.webp",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change 3000 to adjust transition time in milliseconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          <span className="text-primary"> Gear Up for Success!</span>
          <br />
          Get Discounted Appliances Delivered to Your Dorm
          <br />
          Or Lecture hall
          {/* <span className="text-primary">Pizza</span> */}
        </h1>

        <div className="flex gap-4 text-sm pt-4 ">
          <button className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            layout="fill"
            objectFit="contain"
            alt={"image " + (index + 1)}
            className={`opacity-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
}
