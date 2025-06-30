import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header flex flex-col items-center justify-start min-h-32 pt-8">
      <h1 className="text-3xl font-bold underline mb-4">
        <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-300 text-white shadow-md border-2 border-white inline-block">
          Checkpoint : frontend
        </span>
      </h1>
      <Link
        to="/"
        className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-400 to-pink-200 text-rose-900 font-semibold shadow border-2 border-white transition-transform hover:scale-105 hover:shadow-lg"
      >
        Countries
      </Link>
    </header>
  );
}
