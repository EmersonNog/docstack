import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import only_logo from "../assets/only_logo.png";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFileText,
  IconInfoCircle,
  IconHome,
  IconMenu2,
} from "@tabler/icons-react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Botão hamburguer no mobile */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 text-blue-600"
        >
          <IconMenu2 size={28} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 flex flex-col
          ${expanded ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* Cabeçalho com logo e botão */}
        <div
          className={`flex items-center px-4 py-4 border-b border-gray-200 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          <div
            className={`flex items-center ${
              expanded ? "gap-2" : "justify-center w-full"
            }`}
          >
            {expanded ? (
              <img src={logo} alt="DocStack" className="h-8" />
            ) : (
              <img src={only_logo} alt="DocStack" className="h-8" />
            )}
          </div>

          {expanded && (
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen(false);
                } else {
                  setExpanded((prev) => !prev);
                }
              }}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <IconChevronLeft size={20} />
            </button>
          )}

          {!expanded && (
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen(false);
                } else {
                  setExpanded(true);
                }
              }}
              className="absolute right-2 text-blue-600 hover:text-blue-800 transition"
            >
              <IconChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Navegação */}
        <nav className="flex flex-col mt-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center ${
                expanded ? "justify-start" : "justify-center"
              } gap-3 px-4 py-2 hover:bg-blue-50 transition ${
                isActive
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700"
              }`
            }
          >
            <IconHome size={22} className="text-blue-600" />
            {expanded && <span>Início</span>}
          </NavLink>

          <NavLink
            to="/relatorio"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center ${
                expanded ? "justify-start" : "justify-center"
              } gap-3 px-4 py-2 hover:bg-blue-50 transition ${
                isActive
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700"
              }`
            }
          >
            <IconFileText size={22} className="text-blue-600" />
            {expanded && <span>Relatório Fotográfico</span>}
          </NavLink>

          <NavLink
            to="/sobre"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center ${
                expanded ? "justify-start" : "justify-center"
              } gap-3 px-4 py-2 hover:bg-blue-50 transition ${
                isActive
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700"
              }`
            }
          >
            <IconInfoCircle size={22} className="text-blue-600" />
            {expanded && <span>Sobre</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
