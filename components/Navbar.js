import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  console.log(data);

  return (
    <div className="flex justify-between bg-blue-800 text-white space-x-4 px-20 py-3 font-semibold text-lg">
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/missions">Missions</Link>
        <Link href="/launches">Launches</Link>
      </div>
      <div>
        {data === null && (
          <Link href="/api/auth/signin">
            <a
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign In
            </a>
          </Link>
        )}
        {data && (
          <div className="flex justify-around items-center space-x-5">
            <img className="h-10 rounded-full" src={data.user.image} alt=""/> 
            <Link href="/api/auth/signout">
            <a
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign Out
            </a>
          </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
