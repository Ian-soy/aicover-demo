"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function () {
  const [isDataFetched, setIsDataFetched] = useState(false);
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
        console.log(res.data, "res.data=====>");
        if (res.data) {
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  useEffect(() => {
    if (!isDataFetched) {
      getGptsSearchData(q);
    }
    setIsDataFetched(true);
  }, [isDataFetched]);

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
                        <p>
                          汉阳区是武汉市的一个重要组成部分，拥有丰富的历史文化和自然风光。以下是汉阳的主要旅游景点：
                        </p>
                        <h2>主要旅游景点</h2>
                        <ol>
                          <li>
                            <p>
                              <strong>归元禅寺</strong>
                            </p>
                            <ul>
                              <li>
                                归元禅寺是湖北省重点文物保护单位，属于曹洞宗，是武汉佛教的四大丛林之一。寺院环境宁静，是体验禅宗文化的理想之地。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>晴川阁</strong>
                            </p>
                            <ul>
                              <li>
                                晴川阁以其优美的建筑和文化底蕴著称，是湖北省重点文物保护单位。其名字来源于唐代诗人崔颢的诗句，被誉为“三楚胜境”。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>古琴台</strong>
                            </p>
                            <ul>
                              <li>
                                古琴台是与知音文化密切相关的景点，象征着与音乐和文化的紧密联系，适合音乐爱好者和游客前往参观。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>龟山电视塔</strong>
                            </p>
                            <ul>
                              <li>
                                该塔不仅是汉阳的地标性建筑，还提供了俯瞰武汉市区和长江的绝佳视角。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>汉阳月湖公园</strong>
                            </p>
                            <ul>
                              <li>
                                这是一个自然景观优美的公园，非常适合家庭和朋友们在此享受休闲时光，漫步于湖边。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>武汉动物园</strong>
                            </p>
                            <ul>
                              <li>
                                适合家庭游玩，园内有多种动物展览和生态环境，适合儿童和成人。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>武汉中华奇石馆</strong>
                            </p>
                            <ul>
                              <li>
                                在这里可以欣赏到各种奇特的矿石和岩石，对爱好自然和地质的游客来说是一个好去处。
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>
                              <strong>琴台文化艺术中心</strong>
                            </p>
                            <ul>
                              <li>
                                这是一个集文化、艺术和音乐于一体的场所，定期举办各种演出和展览，非常适合艺术爱好者。
                              </li>
                            </ul>
                          </li>
                        </ol>
                      </div>

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
                        来源
                        <div className="flex-1"></div>
                      </h2>
                      <div className="max-w-full overflow-x-auto pb-2 custom-scrollbar flex items-start gap-x-2">
                        <a
                          href="https://zhuanlan.zhihu.com/p/371791540"
                          target="_blank"
                          rel="nofollow"
                          className="border border-base-300 px-3 py-2 rounded-md w-40 text-xs leading-relaxed cursor-pointer hover:bg-base-300"
                          aria-describedby="6s348qo"
                          data-popupid="6s348qo"
                        >
                          <div className="font-medium flex items-center gap-x-1">
                            <span className="text-base-content text-primary">
                              1.
                            </span>
                            <div className="truncate">
                              2021最新最全武汉自由行攻略——汉阳篇 - 知乎
                            </div>
                          </div>
                          <div className="truncate">
                            2021最新最全武汉自由行攻略——汉阳篇.
                            武汉今年算是完全复苏啦，而且激发出民族热情的武汉人建设自己的家园更胜从前，花了不少气力去美化环境，基础设施和城市绿化真的上了一个档次，配合上武汉人最挑剔的美食传统，这个城市真的很适合大家
                            ...
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <img
                                className="aspect-square h-full w-full"
                                alt="zhuanlan.zhihu.com"
                                src="http://zhuanlan.zhihu.com/favicon.ico"
                              />
                            </span>
                            <span className="truncate">zhuanlan.zhihu.com</span>
                          </div>
                        </a>
                        <a
                          href="https://www.sohu.com/a/336908568_526457"
                          target="_blank"
                          rel="nofollow"
                          className="border border-base-300 px-3 py-2 rounded-md w-40 text-xs leading-relaxed cursor-pointer hover:bg-base-300"
                          aria-describedby="ipfj5z9"
                          data-popupid="ipfj5z9"
                        >
                          <div className="font-medium flex items-center gap-x-1">
                            <span className="text-base-content text-primary">
                              2.
                            </span>
                            <div className="truncate">
                              武汉旅游 汉阳必去的5个景点，不看后悔 - 搜狐
                            </div>
                          </div>
                          <div className="truncate">
                            汉阳是武汉城市起源之地，江汉朝宗于南岸嘴，武汉长江大桥横跨汉阳龟山与武昌蛇山之间。
                            汉阳是知音文化发源地，高山流水的典故便发生于此，境内有古琴台、晴川阁、归元禅寺等人文景观。
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                  className="text-xs text-base-content"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                                </svg>
                              </span>
                            </span>
                            <span className="truncate">www.sohu.com</span>
                          </div>
                        </a>
                        <a
                          href="http://wap.bytravel.cn/view/top10/index2404.html"
                          target="_blank"
                          rel="nofollow"
                          className="border border-base-300 px-3 py-2 rounded-md w-40 text-xs leading-relaxed cursor-pointer hover:bg-base-300"
                          aria-describedby="qkiwnko"
                          data-popupid="qkiwnko"
                        >
                          <div className="font-medium flex items-center gap-x-1">
                            <span className="text-base-content text-primary">
                              3.
                            </span>
                            <div className="truncate">
                              武汉市汉阳区十大旅游景点 - 博雅文化旅游网
                            </div>
                          </div>
                          <div className="truncate">
                            汉阳区十大旅游景点. 1. 归元寺 AAAA.
                            归元寺属曹洞宗，又称归元禅寺，是湖北省重点文物保护单位。
                            位于汉阳城内翠微路上。
                            归元寺与宝通禅寺、溪莲寺、正觉寺今称为武汉佛教的四大丛林。
                            归元禅寺创建于清顺治十五年
                            (1658)，归元寺之名取佛经"归元性不二，方便有多门"之语意。
                            占地4.67公顷，有殿舍200余间…… 2. 晴川阁 AAA.
                            晴川阁是湖北省重点文物保护单位。
                            位于武汉城内汉阳龟山东麓长江边的禹功矶上。
                            晴川阁始建于明代嘉靖年间，其名取自唐代诗人崔颢诗句晴川历历汉阳树。
                            有楚四名楼之誉。
                            因与对岸黄鹤楼隔江对峙，相映生辉，被称为三楚胜境。
                            晴川阁qíngchuāngé，又名晴川楼，位于武汉市汉…… 3.
                            古琴台 AAA.
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                  className="text-xs text-base-content"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                                </svg>
                              </span>
                            </span>
                            <span className="truncate">wap.bytravel.cn</span>
                          </div>
                        </a>
                        <a className="border border-base-300 px-3 py-2 rounded-md w-40 text-xs leading-relaxed cursor-pointer hover:bg-base-300">
                          <div className="font-medium flex items-center gap-x-1">
                            <span className="text-base-content font-medium">
                              查看全部
                            </span>
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              viewBox="0 0 512 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"></path>
                            </svg>
                          </div>
                          <div className="font-medium flex items-center gap-x-1">
                            <span className="text-primary">10</span>来源
                          </div>
                          <div className="flex items-center text-xs mt-1">
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                  className="text-xs text-base-content"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                                </svg>
                              </span>
                            </span>
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                                <svg
                                  stroke="currentColor"
                                  fill="currentColor"
                                  viewBox="0 0 512 512"
                                  className="text-xs text-base-content"
                                  height="1em"
                                  width="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
                                </svg>
                              </span>
                            </span>
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <img
                                className="aspect-square h-full w-full"
                                alt="japantravel.navitime.com"
                                src="http://japantravel.navitime.com/favicon.ico"
                              />
                            </span>
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <img
                                className="aspect-square h-full w-full"
                                alt="cn.tripadvisor.com"
                                src="http://cn.tripadvisor.com/favicon.ico"
                              />
                            </span>
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <img
                                className="aspect-square h-full w-full"
                                alt="chinese.visitkorea.or.kr"
                                src="http://chinese.visitkorea.or.kr/favicon.ico"
                              />
                            </span>
                            <span className="relative flex shrink-0 overflow-hidden w-4 h-4 rounded-full mr-1">
                              <img
                                className="aspect-square h-full w-full"
                                alt="big5chinese.visitkorea.or.kr"
                                src="http://big5chinese.visitkorea.or.kr/favicon.ico"
                              />
                            </span>
                          </div>
                        </a>
                      </div>
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
