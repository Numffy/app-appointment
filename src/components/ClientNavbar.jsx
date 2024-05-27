"use client";

import { useState } from "react";
import Link from "next/link";

function ClientNavbar({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("Menu toggle:", !isOpen);
  };

  return (
    <nav className="bg-amber-300 py-4 px-4 h-16 flex justify-between items-center shadow-lg relative">
      <h1 className="font-bold text-2xl text-gray-800">Consultorio</h1>
      <button
        className="md:hidden text-gray-800 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <ul
        className={`md:flex gap-x-4 mr-5 font-semibold ${
          isOpen ? "absolute top-full left-0 w-full   mt-2" : "hidden"
        } md:block md:relative md:top-0 md:left-0 md:w-auto md:bg-transparent`}
      >
        {!session?.user ? (
          <>
            <li className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-gray-700">
              <Link href="/">Inicio</Link>
            </li>
            <li className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-gray-700">
              <Link href="/auth/login">Iniciar Sesión</Link>
            </li>
            <li className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-gray-700">
              <Link href="/auth/register">Registrarse</Link>
            </li>
          </>
        ) : (
          <>
            <li className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-gray-700">
              <Link href="/">Inicio</Link>
            </li>
            <li className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-gray-700">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="bg-black text-white px-4 py-2 rounded-lg mt-2 md:mt-0 hover:bg-gray-700">
              <Link href="/api/auth/signout">Cerrar Sesión</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default ClientNavbar;
