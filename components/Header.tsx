import Image from "next/image";
import Github from "../components/GitHub";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full pb-7 sm:px-4 px-2">
      <a
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
        href="https://github.com/januff/dear-aibby"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </a>
      
      <h1 className="text-slate-900">
          <Image src="/logo.png" width={200} height={120} alt="Aibby" />
      </h1>

      <a
        className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
        href="https://github.com/Nutlope/twitterbio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          width={22}
          height={22}
        />
      </a>
    </header>
  );
}
