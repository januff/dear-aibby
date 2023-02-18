import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { AdvisorType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [advice, setAdvice] = useState("");
  const [advisor, setAdvisor] =  useState<AdvisorType>("Abby");
  // const [bio, setBio] = useState("");
  // const [vibe, setVibe] = useState<VibeType>("Professional");
  // const [generatedBios, setGeneratedBios] = useState<String>("");

  console.log("Streamed response: ", advice);

  // const prompt = `YOU ARE PLAYING THE ROLE OF AN OLD-FASHIONED ADVICE COLUMNIST. THE TONE OF YOUR REPLIES SHOULD BE SENSIBLE, FAIRLY ARCHAIC, STERN AND STRONGLY WORDED, AND NO LONGER THAN 150 WORDS. CONCLUDE YOUR RESPONSE WITH TWO OR THREE CONTEXTUALLY APPROPRIATE EMOJIS AND BASE IT ON THIS CONTEXT: ${question}`;

  const prompt = `YOU ARE PLAYING THE ROLE OF AN OLD-FASHIONED ADVICE COLUMNIST, EXCEPT THIS ONE IS GOING SLIGHTLY MAD. THE TONE OF YOUR REPLIES SHOULD BE INSULTING, QUICK-TEMPERED, AND EASILY DISTRACTED, AND NO LONGER THAN 150 WORDS. CONCLUDE YOUR RESPONSE WITH TWO OR THREE CONTEXTUALLY APPROPRIATE EMOJIS AND BASE IT ON THIS CONTEXT: ${question}`; 
 
  // const prompt =
  //   vibe === "Funny"
  //     ? `Generate 2 funny twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated bio is at max 20 words and base it on this context: ${bio}${
  //         bio.slice(-1) === "." ? "" : "."
  //       }`
  //     : `Generate 2 ${vibe} twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 20 words and base them on this context: ${bio}${
  //         bio.slice(-1) === "." ? "" : "."
  //       }`;

  const generateAdvice = async (e: any) => {
    e.preventDefault();
    setAdvice("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAdvice((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    // <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen  bg-flowers-pattern bg-[length:300px_300px]">
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Dear AIbby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-start text-center px-4 mt-12 sm:mt-20">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/januff/dear-aibby"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          <Image src="/logo.png" width={100} height={100} alt="Aibby" />
        </h1> */}
        <p className="text-slate-200 mt-5">HEARTFELT ADVICE FROM THE SOUL OF A NEW MACHINE</p>
        <Image src="/demojis.png" width={600} height={400} alt="Aibby" />
        <div className="max-w-xl w-full">
          {/* <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/writingIcon.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Ask Aibby your toughest life question.
            </p>
          </div> */}
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "Dear Aibby, I got big problems. What do I do?"
            }
          />

          {/* <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Select your advisor.</p>
          </div>
          <div className="block">
            <DropDown advisor={advisor} setAdvisor={(newAdvisor) => setAdvisor(newAdvisor)} />
          </div> */}

          {!loading && (
            <button
              className="bg-black rounded-xl text-slate-200 font-medium px-4 py-1 sm:mt-10 mt-4 hover:bg-black/80 w-full tracking-tighter"
              onClick={(e) => generateAdvice(e)}
            >
              SHOW ME THE WAY
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {advice && (
                <>
                  {/* <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your generated advice
                    </h2>
                  </div> */}
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                      onClick={() => {
                        navigator.clipboard.writeText(advice);
                        toast("Advice copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                      key={advice}
                    >
                      <p>{advice}</p>
                    </div>
                  </div>
                  {/* <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedBios
                      .substring(generatedBios.indexOf("1") + 3)
                      .split("2.")
                      .map((generatedBio) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedBio);
                              toast("Bio copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generatedBio}
                          >
                            <p>{generatedBio}</p>
                          </div>
                        );
                      })}
                  </div> */}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>

        <div className="px-4 text-xs bg-white py-3 leading-normal text-purple-700 rounded-lg" role="alert">
          <p>All content generated at Dearaibby.com, including emojis, is presented for entertainment purposes only. It is not intended to replace or substitute for any financial, medical, legal, any other professional advice, or the unsolicited opinions of families, friends, or Twitter reply guys. Under no conditions should you take it seriously.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
