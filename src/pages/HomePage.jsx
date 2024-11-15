import { useState } from "react";
import { useFetchData } from "../../services/useFetchData";

export default function HomePage() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const { data, isPending, error } = useFetchData(url);

  console.log(data);
  return <>HOME</>;
}
