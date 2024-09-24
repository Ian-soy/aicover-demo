'use client'

import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();
  const [description, setDescription] = useState("");
  const [longText, setLongText] = useState("");

  const handleSearch = () => {
    // router.push("/search?q=" + description);
    getOllamaSearch(description);
  };

  // 获取机器人列表
  const getOllamaSearch = async function (q: string) {
    try {
      const uri = "/api/ollama-api";
      const params = {
        q,
        m: "llama3.1:latest", // llama3.1:latest、wen2.5:latest
        s: false
      };

      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      })

      if (resp.ok) {
        const res = await resp.json();
        console.log("res.data.data=====>", res.data.response);
        if (res.data) {
          setLongText(res.data.response);
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900">
      <div className="h-full flex-1 overflow-hidden">
        <div className="w-full max-w-3xl mx-auto h-full flex flex-col">
          <div className="h-full w-full max-w-3xl mx-auto px-6 flex flex-col items-center justify-center">
            <h1 className="scroll-m-20 text-primary text-4xl font-extrabold tracking-tight lg:text-5xl cursor-pointer text-teal-600">
              <a href="/" className="flex items-center">
                <img
                  src="/ai-think.jpeg"
                  className="w-12 h-12 mr-2 rounded-full"
                  alt=""
                />
                AI-Think
              </a>
            </h1>
            <h2 className="text-xl text-center leading-7 text-slate-400 mt-8">
              新-代 AI 搜索引擎，搜得更快，答得更准
            </h2>
            <div className="mt-8 w-full relative">
              <textarea
                className="textarea textarea-bordered w-full max-h-36 min-h-28 px-4 py-4 rounded-lg bg-neutral-700 text-slate-300"
                placeholder="输入任何内容..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              ></textarea>
              <div className="absolute right-12 bottom-4 md:bottom-3.5">
                <div
                  className="flex items-center gap-x-1 mb-0 text-slate-300"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  <div
                    className="px-3 py-1 rounded-md hover:bg-base-200 cursor-pointer flex items-center gap-x-1.5 font-normal text-xs"
                    aria-haspopup="true"
                    aria-describedby="f8xeyra"
                    data-popupid="f8xeyra"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                    <span className="hidden md:block">搜索</span>
                  </div>
                </div>
              </div>
              <div
                className="absolute right-4 bottom-3.5 cursor-pointer font-bold rounded-full p-1.5 hover:bg-base-200 text-slate-300"
                onClick={() => {
                  handleSearch();
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="text-xs"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                </svg>
              </div>
            </div>

            <div className="leading-7 [&amp;:not(:first-child)]:mt-4"></div>

            <div className="text-slate-400 max-h-96 overflow-y-scroll mt-4">
              <pre className="whitespace-pre-line">{ longText }</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
