import { types } from "@data/types";

export default function Section4() {
  return (
    <>
      <div className="bg-amber-100">
        <div className="container mx-auto max-w-[1024px] w-full py-10 px-4">
          <div className="text-center flex flex-col gap-2">
            <p className="uppercase font-semibold">Lorem, ipsum dolor.</p>
            <h1 className="font-black text-4xl">Lorem, ipsum.</h1>
            <p className="font-bold text-xl">Lorem, ipsum dolor.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 py-8">
            {types.map((type, index) => (
              <div
                key={index}
                className="w-[calc((100%/4)-0.8rem)] md:w-[calc((100%/7)-0.87rem)]"
              >
                <div className="rounded-full overflow-hidden border border-black">
                  <img
                    className="w-full"
                    src={type.icon}
                    alt={type.label}
                  />
                </div>
                <p className="capitalize text-xs sm:text-base text-center mt-4">
                  {type.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
