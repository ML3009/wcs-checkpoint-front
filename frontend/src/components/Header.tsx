import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-rose-500 to-pink-300 shadow-md border-b-2 border-white flex flex-col items-center justify-center px-8 py-6">
      <h1 className="text-3xl font-bold mb-3 text-white">
        Checkpoint : frontend
      </h1>
      <Link
        to="/"
        className="px-4 py-2 text-white font-semibold transition-transform hover:scale-105 hover:shadow-lg"
      >
        Countries
      </Link>
    </header>
  );
}
