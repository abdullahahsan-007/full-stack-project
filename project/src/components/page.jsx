import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full bg-black">
      <ul className="flex justify-between items-center w-full max-w-6xl mx-auto p-5 border-b border-gray-700">
        
        <li className="text-cyan-400 font-bold text-xl">
          <Link href="/">TaskManager</Link>
        </li>

        
        <li className="flex gap-6">
          <Link href="/" className="text-white hover:text-cyan-400 transition">
            Home
          </Link>
        
        </li>
      </ul>
    </div>
  );
}
