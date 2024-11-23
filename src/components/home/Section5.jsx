import { useState } from "react";

export default function Section5() {
  const [images, setImages] = useState([
    { label: "slide 1", source: "https://placehold.co/300x200" },
    { label: "slide 2", source: "https://placehold.co/300x200" },
    { label: "slide 3", source: "https://placehold.co/300x200" },
  ]);

  return (
    <>
      <div className="bg-slate-100">
        <div className="container mx-auto max-w-[1280px] w-full py-10 px-4">
          <div className="text-center flex flex-col gap-2 mb-8">
            <p className="uppercase font-semibold">Lorem, ipsum dolor.</p>
            <h1 className="font-black text-4xl">Lorem, ipsum.</h1>
            <p className="font-bold text-xl">Lorem, ipsum dolor.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center sm:divide-x sm:divide-y-0 divide-y divide-black">
            {images.map((image, index) => (
              <div className="py-4 sm:py-0 sm:px-6" key={index}>
                <img src={image.source} alt={image.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
