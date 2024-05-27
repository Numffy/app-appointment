import { getServerSession } from "next-auth";
import { handler } from "../app/api/auth/[...nextauth]/route";
import ClientNavbar from '../components/ClientNavBar';

async function NavBar() {
  const session = await getServerSession(handler);
  return <ClientNavbar session={session} />;
}

export default NavBar;
