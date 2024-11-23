import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const spanClass = "w-6 h-0.5 bg-black block mb-2 last:mb-0";

  const handleShowSidebar = () => {
    setShowSidebar(true);
    document.body.classList.add("overflow-hidden");
  };

  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="bg-sky-900 text-white">
        <div className="container mx-auto max-w-[1280px] w-full">
          <div className="flex items-center justify-between relative p-4">
            <Link
              to={"/"}
              className="static sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 "
            >
              <div className="font-bold sm:text-2xl">Lorem.</div>
            </Link>
            <div className="hidden sm:block">Lorem ipsum dolor sit amet.</div>
            <div className="flex items-center gap-4">
              <Link to={"/"} className="">
                <div className="flex items-center justify-center gap-1 sm:border border-black p-1 sm:py-1 sm:px-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-all">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <div className="text-xs hidden sm:block">Lorem, ipsum.</div>
                </div>
              </Link>
              <button>Lorem.</button>
              <button className="w-5 h-6 bg-black"></button>
              <button onClick={handleShowSidebar}>
                <span className={spanClass}></span>
                <span className={spanClass}></span>
                <span className={spanClass}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
