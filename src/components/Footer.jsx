import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [socials] = useState([
    { label: "social1", route: "/" },
    { label: "social2", route: "/" },
    { label: "social3", route: "/" },
  ]);

  const [links] = useState([
    { label: "link1", route: "/" },
    { label: "link2", route: "/" },
    { label: "link3", route: "/" },
    { label: "link4", route: "/" },
  ]);

  return (
    <>
      <div className="bg-black text-white">
        <div className="container mx-auto max-w-[1280px] w-full p-4">
          <div className="flex items-center justify-center flex-col gap-12">
            <h1 className="text-4xl font-black">Lorem.</h1>
            <ul className="flex items-center gap-8">
              {socials.map((social, index) => (
                <li key={index}>
                  <Link className="hover:opacity-70 duration-300">
                    <div className="w-8 h-8 bg-white"></div>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-8">
              {links.map((link, index) => (
                <li key={index}>
                  <Link className="hover:opacity-70 duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="py-6 border-t w-full">
          <p className="text-center">&#169;Lorem, ipsum.</p>
        </div>
      </div>
    </>
  );
}
