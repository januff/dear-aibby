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

      {/* <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/writingIcon.png"
          className="sm:w-12 sm:h-12 w-8 h-8"
          width={32}
          height={32}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          dearaibby.com
        </h1>
      </Link> */}
      
      {/* <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a> */}
    </header>
  );
}
