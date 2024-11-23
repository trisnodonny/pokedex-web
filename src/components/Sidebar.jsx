import { Link } from "react-router-dom";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const navLinks = [
    { label: "lorem", route: "/", icon: "" },
    { label: "lorem", route: "/", icon: "" },
    { label: "lorem", route: "/", icon: "" },
  ];
  const handleCloseSidebar = () => {
    setShowSidebar(false);
    document.body.classList.remove("overflow-hidden");
  };
  return (
    <>
      <div className="relative z-50">
        <nav
          className={`fixed top-0 right-0 ${
            showSidebar ? "w-full sm:w-1/3 opacity-100" : "w-0 opacity-0"
          } bg-black h-screen z-50 duration-300 overflow-hidden`}
        >
          <div className="p-8 text-white">
            <div className="flex justify-end w-full">
              <button
                onClick={handleCloseSidebar}
                className="w-4 h-4 bg-white rounded-full hover:bg-opacity-60 duration-300"
              ></button>
            </div>
            <div>
              <ul>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.route}>
                      <div className="flex items-center justify-between w-full border-b py-4">
                        <div className="flex items-center gap-2 hover:opacity-80 transition-all">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <p>{link.label}</p>
                        </div>
                        <span className="after:content-['>'] hover:opacity-80 transition-all after:font-black"></span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <div
          onClick={handleCloseSidebar}
          className={`fixed z-30 top-0 right-0 bottom-0 left-0 bg-black transition-all duration-500 ${
            showSidebar ? "bg-opacity-20" : "bg-opacity-0 pointer-events-none"
          }`}
        ></div>
      </div>
    </>
  );
}
