import { getServerSession } from "next-auth";

import Link from "next/link";
import { handler } from "../app/api/auth/[...nextauth]/route";
async function NavBar() {
  const session = await getServerSession(handler);
  return (
    <nav className="flex justify-between bg-amber-300 py-4 h-16">
      <h1 className="font-bold ml-3 text-xl ">Dr Fonseca</h1>
      <ul className="flex gap-x-4 mr-5 font-bold  ">
        {!session?.user ? (
          <>
            {" "}
            <li className="flex bg-black text-white px-3 py-5 rounded-xl justify-center items-center">
              <Link href="/">Inicio</Link>
            </li>
            <li className="flex bg-black text-white  px-3 py-5 rounded-xl justify-center items-center">
              <Link href="/auth/login">Inicias Sesion</Link>
            </li>
            <li className="flex bg-black text-white px-3 py-5 rounded-xl justify-center items-center">
              <Link href="/auth/register">Registrarse</Link>
            </li>
          </>
        ) : (
          <>
            <li className="flex bg-black text-white px-3 py-5 rounded-xl justify-center items-center">
              <Link href="/">Inicio</Link>
            </li>

            <li className="flex bg-black text-white px-3 py-5 rounded-xl justify-center items-center">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="flex bg-black text-white px-3 py-5 rounded-xl justify-center items-center">
              <Link href="/api/auth/signout">Cerrar Sesion</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
