import { useFetchData } from "@services/useFetchData";
import { useEffect, useState } from "react";
import { types } from "@data/types";
import { moves } from "@data/moves";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams();
  const [pokemonId, setPokemonId] = useState(id);
  const [isDisabled, setIsDisabled] = useState(true);
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const { data, isPending, error } = useFetchData(url);
  const [abilities, setAbilities] = useState([]);
  const typeIcon =
    types.find((type) => type.label === data?.types[0]?.type?.name)?.icon || "";
  const typeBgColor =
    types.find((type) => type.label === data?.types[0]?.type?.name)?.color ||
    "";
  const typeBgImage =
    types.find((type) => type.label === data?.types[0]?.type?.name)
      ?.background || "";

  const handleNextPokemon = () => {
    setPokemonId(+pokemonId + 1);
  };
  const handlePrevPokemon = (ev) => {
    ev.preventDefault();
    if (pokemonId > 0) {
      setPokemonId(+pokemonId - 1);
    }
  };

  console.log(pokemonId );

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
        <div className="container mx-auto max-w-[1280px] w-full py-10 px-4">
          <div className="flex justify-center items-center w-full flex-col">
            {/* Card */}
            <div
              className={`bg-gradient-to-b from-zinc-400 to-zinc-300 rounded-2xl p-2 w-full max-w-96 hover:scale-105 hover:rotate-[-1deg] hover:skew-x-1 hover:shadow-lg duration-150`}
            >
              <div
                className="w-full rounded-xl p-4"
                style={{
                  backgroundColor: typeBgColor,
                }}
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
                      className="w-full object-contain"
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
            <div className="flex">
              <button
                onClick={handlePrevPokemon}
                className="text-2xl border border-black flex items-center justify-center disabled:opacity-25"
                disabled={isDisabled}
              >
                prev
              </button>
              <button
                onClick={handleNextPokemon}
                className="text-2xl border border-black flex items-center justify-center"
              >
                next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
