import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { arts } from "@data/arts";
import "swiper/css";
import "swiper/css/navigation";
import next from "@assets/icons/next.png";

export default function Hero() {
  const [slide, setSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setSlide(swiper.realIndex);
  };

  return (
    <>
      <div className="bg-amber-400">
        <div className="max-w-[1024px] mx-auto flex justify-center items-center p-4">
          <div className="flex items-center justify-center w-1/3 hidden sm:flex">
            {arts.slice(slide, slide + 1).map((art, index) => (
              <span
                key={index}
                style={{ writingMode: "vertical-lr", scale: "-1" }}
              >
                Art by{" "}
                <Link
                  className="hover:underline duration-300 font-bold"
                  to={art.link}
                  target="_blank"
                >
                  {art?.artist}
                </Link>
              </span>
            ))}
          </div>
          <Swiper
            slidesPerView={1}
            loop={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
            }}
            onSlideChange={handleSlideChange}
          >
            {arts.map((art, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center h-[480px] w-full">
                  <p className="absolute top-2 right-2 bg-black px-2 py-1 sm:hidden">
                    Art by:{" "}
                    <Link to={art.link} target="_blank" className="font-bold">
                      {art.artist}
                    </Link>
                  </p>
                  <img
                    className="object-cover w-full h-full"
                    src={art.source}
                    alt={`Art by ${art.artist}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hidden sm:flex items-center justify-center w-1/3">
            <button className="custom-next flex flex-col items-center justify-center gap-2">
              <span style={{ writingMode: "vertical-lr" }}>Next</span>
              <div className="border border-black rounded flex items-center justify-center px-1 w-8">
                <img className="w-full" src={next} alt="arrow" />
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center pb-4">
          <button className="py-1 px-4 bg-black text-white rounded-full hover:bg-opacity-70 duration-300">
            Lorem, ipsum.
          </button>
        </div>
      </div>
    </>
  );
}
