import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useFetchData } from "@services/useFetchData";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

export default function Section2() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const randomNum = Math.floor(Math.random() * 1025);
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=${randomNum}&limit=8`
  );
  const [details, setDetails] = useState([]);
  const { data, isPending, error } = useFetchData(url);

  useEffect(() => {
    if (data?.results) {
      const fetchDetails = async () => {
        try {
          const details = await Promise.all(
            data?.results?.map(async (item) => {
              const response = await axios.get(item?.url);
              const data = response?.data;
              return data;
            })
          );
          setDetails(details);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDetails();
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto max-w-[1280px] w-full py-10 px-4">
          <div className="text-center flex flex-col gap-2">
            <p className="uppercase font-semibold">Lorem, ipsum dolor.</p>
            <h1 className="font-black text-4xl">Lorem, ipsum.</h1>
            <p className="font-bold text-xl">Lorem, ipsum dolor.</p>
          </div>

          {details.length > 0 && (
            <Swiper
              className="!py-8 sm:my-8"
              slidesPerView={screenWidth > 640 ? 4 : 3}
              loop={true}
              modules={[Navigation]}
              navigation={{
                nextEl: ".custom-next2",
                prevEl: ".custom-prev2",
              }}
            >
              {details.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full border-0 sm:first:border-x sm:border-r sm:border-black"
                >
                  <Link
                    to={`pokemon/${item?.id}`}
                    className="sm:px-6 px-1 w-full block group"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2 sm:mb-4 w-full">
                      <p
                        className="hidden lg:block capitalize italic"
                        style={{ writingMode: "vertical-rl", scale: "-1" }}
                      >
                        {item?.types[0]?.type?.name}
                      </p>
                      <div className="flex w-full sm:w-52 xl:h-52 border border-black sm:group-hover:-rotate-6 sm:duration-300 p-2 lg:p-4">
                        <img
                          className="w-full"
                          src={
                            item?.sprites?.other?.["official-artwork"]
                              ?.front_default
                          }
                          alt={item?.name}
                        />
                      </div>
                    </div>
                    <div className="flex ">
                      <p className="line-clamp-2 text-sm sm:text-base">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Voluptas, possimus!
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="flex items-center justify-center w-full gap-8">
            <button className="custom-prev2 flex justify-center items-center">
              prev
            </button>
            <span className="block w-1/12 h-[0.5px] bg-black"></span>
            <button className="custom-next2 flex justify-center items-center">
              next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
