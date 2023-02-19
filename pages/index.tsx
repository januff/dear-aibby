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

  console.log("Streamed response: ", advice);

  const prompt = `YOU ARE PLAYING THE ROLE OF AN OLD-FASHIONED ADVICE COLUMNIST, EXCEPT THIS ONE IS GOING SLIGHTLY MAD. THE TONE OF YOUR REPLIES SHOULD BE INSULTING, QUICK-TEMPERED, AND EASILY DISTRACTED, AND NO LONGER THAN 150 WORDS. CONCLUDE YOUR RESPONSE WITH TWO OR THREE CONTEXTUALLY APPROPRIATE EMOJIS AND BASE IT ON THIS CONTEXT: ${question}`; 

  const notify = () => toast('All content generated at Dearaibby.com, including emojis, is presented for entertainment purposes only. It is not intended to replace or substitute for any financial, medical, legal, any other professional advice, or the unsolicited opinions of families, friends, or Twitter reply guys. Under no conditions should you take it seriously.');
 
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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Dear AIbby</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-start text-center px-4 mt-4 sm:mt-4">
        <p className="text-slate-200 mt-5">HEARTFELT ADVICE FROM THE SOUL OF A NEW MACHINE</p>
        <Image src="/demojis.png" width={600} height={400} alt="Aibby" />
        <div className="max-w-xl w-full">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "Dear Aibby, I got big problems. What do I do?"
            }
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-slate-200 font-medium px-4 py-1 sm:mt-4 mt-4 hover:bg-black/80 w-full tracking-tighter"
              onClick={(e) => generateAdvice(e)}
            >
              SHOW ME THE WAY
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-4 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {advice && (
                <>
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
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>

        {/* <div>
          <button onClick={notify}>Caution!</button>
          <Toaster 
            position="bottom-center"
          />
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
