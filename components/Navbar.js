import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-blue-800 text-white space-x-4 px-10 py-3 font-semibold text-lg">
      <Link href="/">Home</Link>
      <Link href="/missions">Missions</Link>
      <Link href="/launches">Launches</Link>
    </div>
  );
};

export default Navbar;
