import { useFetchData } from "@services/useFetchData";
import { useEffect, useState } from "react";
import { types } from "@data/types";
import { moves } from "@data/moves";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import useSound from "use-sound";

export default function DetailsPage() {
  const { id } = useParams();
  const [pokemonId, setPokemonId] = useState(+id);
  const [isDisabled, setIsDisabled] = useState(true);
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const { data, isPending, error } = useFetchData(url);
  const [abilities, setAbilities] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const audioUrl = data?.cries?.latest;
  const [cries, setCries] = useSound(audioUrl);

  const typeIcon =
    types.find((type) => type.label === data?.types[0]?.type?.name)?.icon || "";
  const typeBgColor =
    types.find((type) => type.label === data?.types[0]?.type?.name)?.color ||
    "";
  const typeBgImage =
    types.find((type) => type.label === data?.types[0]?.type?.name)
      ?.background || "";

  useEffect(() => {
    setUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    if (pokemonId === 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [pokemonId]);
  useEffect(() => {
    if (data?.abilities) {
      const fetchAbilities = async () => {
        try {
          const abilities = await Promise.all(
            data?.abilities?.map(async (item) => {
              const response = await axios.get(item?.ability?.url);
              const data = response?.data;
              return data;
            })
          );
          setAbilities(abilities);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAbilities();
    }
  }, [data?.abilities]);

  useEffect(() => {
    if (data?.types) {
      const fetchTypes = async () => {
        try {
          const types = await Promise.all(
            data?.types?.map(async (item) => {
              const response = await axios.get(item?.type?.url);
              const data = response?.data;
              return data;
            })
          );
          setAllTypes(types);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTypes();
    }
  }, [data?.types]);

  useEffect(() => {
    setPokemonId(+id);
  }, [id]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto max-w-[1280px] w-full py-4 lg:py-10 px-4">
          <div className="flex justify-center items-center sm:items-start w-full gap-8 h-full flex-col sm:flex-row">
            {/* Card */}
            <div
              className={`bg-gradient-to-b from-zinc-400 to-zinc-300 rounded-2xl p-2 w-full max-w-72 hover:scale-105 hover:rotate-[-1deg] hover:skew-x-1 hover:shadow-lg duration-150`}
            >
              <div
                className="w-full rounded-xl p-4"
                style={{ backgroundColor: typeBgColor }}
              >
                <div className="flex items-center justify-between capitalize font-bold mb-4">
                  <p>{data?.name}</p>
                  <div className="flex gap-2">
                    <p>
                      {data?.stats[0]?.base_stat}{" "}
                      <span className="uppercase">
                        {data?.stats[0]?.stat?.name}
                      </span>
                    </p>
                    <div className="w-6 border rounded-full">
                      <img
                        className="w-full"
                        src={typeIcon}
                        alt={data?.types[0]?.type?.name}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div
                    className="w-full border border-zinc-100"
                    style={{
                      backgroundImage: `url(${typeBgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <img
                      className="w-full h-36 object-contain"
                      src={
                        data?.sprites?.other?.["official-artwork"]
                          ?.front_default
                      }
                      alt="artwork"
                    />
                  </div>
                  <ul className="flex justify-center gap-1 flex-wrap bg-white py-1 rounded-b">
                    {data?.stats?.slice(1).map((item, index) => {
                      const moveIcon = moves.find(
                        (move) => move.name === item?.stat?.name
                      )?.icon;

                      return (
                        <li key={index}>
                          <div className="flex justify-center text-xs items-center gap-1">
                            <p>{moveIcon}</p>
                            <p>{item?.base_stat}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="min-h-36">
                  {abilities?.map((item, index) => (
                    <div key={index}>
                      <p className="capitalize text-sm">
                        <span className="font-bold">{item?.name} </span>
                        <span className="italic">({item?.names[0]?.name})</span>
                      </p>
                      <p className="text-[8px]">
                        {item?.effect_entries[1]?.short_effect}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Card */}

            <div className="w-full sm:w-1/3 h-full sm:min-h-[410px] flex flex-col">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="capitalize text-2xl font-bold">{data?.name}</p>
                  <button
                    onClick={cries}
                    className="w-8 p-1 border border-black rounded-full"
                  >
                    <img
                      className="w-full"
                      src="https://cdn-icons-png.freepik.com/512/3917/3917655.png"
                      alt="sound"
                    />
                  </button>
                </div>
                <div className="flex gap-2 mb-4">
                  {allTypes.map((type, index) => (
                    <div key={index} className="w-32">
                      <img
                        className="w-full"
                        src={
                          type?.sprites?.["generation-viii"]?.["legends-arceus"]
                            ?.name_icon
                        }
                        alt=""
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <img
                      className="w-6"
                      src=" https://cdn-icons-png.freepik.com/512/15865/15865204.png?ga=GA1.1.1350735869.1732522360"
                      alt=""
                    />
                    <p className="capitalize font-bold">{data?.height / 10}M</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <img
                      className="w-6"
                      src="https://cdn-icons-png.freepik.com/512/16769/16769266.png?ga=GA1.1.1350735869.1732522360"
                      alt=""
                    />
                    <p className="capitalize font-bold">
                      {data?.weight / 10}KG
                    </p>
                  </div>
                </div>
                <div
                  className="flex justify-around gap-4 px-2 py-4 rounded-lg mb-4 bg-opacity-50"
                  style={{
                    backgroundColor: typeBgColor,
                  }}
                >
                  <div className="w-24 h-24 flex">
                    <img
                      className="w-full object-contain"
                      src={data?.sprites?.other?.showdown?.front_default}
                      alt=""
                    />
                  </div>
                  <div className="w-24 h-24 flex">
                    <img
                      className="w-full object-contain"
                      src={data?.sprites?.other?.showdown?.back_default}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link to={`/pokemon/${pokemonId - 1}`}>
                  <button
                    className="text-2xl w-12 flex items-center justify-center disabled:opacity-25 hover:opacity-50 duration-300"
                    disabled={isDisabled}
                  >
                    <img
                      className="w-full"
                      src="https://cdn-icons-png.freepik.com/512/6407/6407325.png"
                      alt=""
                    />
                  </button>
                </Link>
                <Link to={`/pokemon/${pokemonId + 1}`}>
                  <button className="text-2xl w-12 flex items-center justify-center hover:opacity-50 duration-300">
                    <img
                      className="w-full"
                      src="https://cdn-icons-png.freepik.com/512/6407/6407329.png?ga=GA1.1.558200659.1732516052"
                      alt=""
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
