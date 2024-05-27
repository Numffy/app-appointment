import { getServerSession } from "next-auth";
import { handler } from "../app/api/auth/[...nextauth]/route";
import {} from '../components/ClientNavBar';

async function NavBar() {
  const session = await getServerSession(handler);
  return <ClientNavBar session={session} />;
}

export default NavBar;
