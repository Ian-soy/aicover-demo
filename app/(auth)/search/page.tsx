"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { MyObject } from "@/types/news";

export default function () {
  let contentObject: MyObject = {
    answerText: {},
    follow_up: [],
    answerCard: {},
  };
  const router = useRouter();

  const [searchAnswer, setSearchAnswer] = useState(contentObject);
  const q = useSearchParams().get("q") || "";

  // 获取gtps搜索数据
  const getGptsSearchData = async function (q: string) {
    try {
      const uri = "/api/get-gpts";
      const data = {
        query: q,
      };

      if (!q) {
        toast.error("请输入描述");
        return;
      }

      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          setSearchAnswer(res.data);
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  const clickNewSearch = (content: string | undefined) => {
    setSearchAnswer(contentObject);
    router.replace(`/search?q=${content}`);
    getGptsSearchData(content || "");
  };

  useEffect(() => {
    getGptsSearchData(q);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900 text-slate-300">
      <div className="w-full h-full">
        <div className="h-full pt-8 flex items-start gap-x-0 pb-8">
          <div className="h-full flex-1 overflow-y-auto custom-scrollbar pt-8">
            <div className="w-full px-8">
              <div className="px-0 pb-24">
                <div>
                  <div className="flex w-full md:max-w-2xl mx-auto items-start pb-4 mb-4">
                    <div className="flex-1 w-full md:max-w-2xl mx-auto ">
                      <h2 className="text-xl break-all">{q}</h2>

                      <h2 className="mt-4 text-lg font-medium flex items-center gap-x-2 py-2">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path>
                          <circle cx="9.5" cy="11.5" r="1.5"></circle>
                          <circle cx="14.5" cy="11.5" r="1.5"></circle>
                        </svg>
                        答案
                        <div className="flex-1"></div>
                      </h2>
                      <div className="mt-4 leading-loose text-sm content break-all">
                        {!searchAnswer.answerText.content ? (
                          <p>处理中。。。</p>
                        ) : (
                          <pre className="whitespace-pre-line">
                            {searchAnswer.answerText.content}
                          </pre>
                        )}
                      </div>

                      {searchAnswer.answerText.content ? (
                        <div>
                          <h2 className="mt-6 text-lg font-medium mb-4 flex items-center gap-x-2">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="none"
                                d="M12,3 L21,7.5 L12,12 L3,7.5 L12,3 Z M16.5,10.25 L21,12.5 L12,17 L3,12.5 L7.5,10.25 L7.5,10.25 M16.5,15.25 L21,17.5 L12,22 L3,17.5 L7.5,15.25 L7.5,15.25"
                              ></path>
                            </svg>
                            其他相关兴趣
                            <div className="flex-1"></div>
                          </h2>
                          <div className="max-w-full overflow-x-auto pb-2 custom-scrollbar gap-x-2">
                            {searchAnswer.follow_up.length
                              ? searchAnswer.follow_up.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      rel="nofollow"
                                      className="border border-base-300 px-3 py-2 rounded-md text-xs leading-relaxed cursor-pointer hover:bg-base-300 mb-4 table"
                                      aria-describedby="6s348qo"
                                      data-popupid="6s348qo"
                                    >
                                      <div
                                        className="font-medium flex items-center gap-x-1"
                                        onClick={() => {
                                          clickNewSearch(item.content);
                                        }}
                                      >
                                        <div className="truncate">
                                          {item.content}
                                        </div>
                                        <div>
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
                                    </div>
                                  );
                                })
                              : "处理中。。。"}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
