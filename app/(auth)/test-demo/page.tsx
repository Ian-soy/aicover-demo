// import { useEffect } from "react";
"use client";

import { useEffect, useState } from "react";
import { Bot } from "@/types/bot";
import { toast } from "sonner";

export default function Page() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // `/ 获取机器人列表
  const getBots = async function () {
    try {
      const uri = "/api/get-bots";
      const params = {
        space_id: "7410283731380518938",
      };

      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          setBots(res.data.data.space_bots);
          toast.info("get bot list success...");
          createChat(res.data.data.space_bots[0].bot_id);
          return;
        }
      }

      setBots([]);
    } catch (e) {
      setBots([]);
      console.log("get info failed: ", e);
    }
  };

  // 创建会话
  const createConversation = async function () {
    try {
      const uri = "/api/create-conversation";
      const params = {};
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        console.log(resp, "res.data=====>");
        const res = await resp.json();
        console.log(res.data.data, "res.data.data=====>");
        if (res.data) {
          localStorage.setItem("cvs_id", res.data.data.id);
          return;
        }
      }

      localStorage.setItem("cvs_id", "");
    } catch (e) {
      localStorage.setItem("cvs_id", "");
      console.log("get info failed: ", e);
    }
  };

  // 获取会话信息
  const getConversation = async function () {
    try {
      const uri = "/api/get-conversation";
      const params = {
        conversation_id: localStorage.getItem("cvs_id") || "",
      };
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        console.log(res.data.data, "res.data.data=====>");
        if (res.data) {
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  // 创建信息
  const createMessage = async function () {
    try {
      const uri = "/api/create-message";
      const params = {
        conversation_id: localStorage.getItem("cvs_id") || "",
        content: "早上好，今天星期几",
      };
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
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

  // 创建chat
  const createChat = async function (bot_id: string) {
    try {
      const uri = "/api/create-chat";
      const params = {
        conversation_id: localStorage.getItem("cvs_id") || "",
        content: "早上好，今天星期几",
        bot_id,
      };
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        console.log(res.data, "res.data=====>");
        if (res.data) {
          toast.info("create chat success...");
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  // 创建bot
  const createBot = async function () {
    try {
      const uri = "/api/create-bot";
      const params = {
        name: "每日学一菜",
        description: "每天教你一道菜的做法，暑假之后你将成为中餐大厨～",
        space_id: "7410283731380518938",
      };
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        console.log(res.data, "res.data=====>");
        if (res.data) {
          toast.info("bot create success...");
          publishBot(res.data.data.bot_id);
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  // 发布bot
  const publishBot = async function (bot_id: string) {
    try {
      const uri = "/api/publish-bot";
      const params = {
        bot_id: bot_id,
      };
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (resp.ok) {
        const res = await resp.json();
        console.log(res.data, "res.data=====>");
        if (res.data) {
          toast.info("bot publish success...");
          localStorage.setItem("bot_id", res.data.data.bot_id);
          createChat(res.data.data.bot_id);
          return;
        }
      }
    } catch (e) {
      console.log("get info failed: ", e);
    }
  };

  // 获取gtps搜索数据
  const getGptsSearchData = async function () {
    try {
      const uri = "/api/get-gpts";
      const params = {
        query: "现在几点钟，今天的天气怎么样，明天天气怎么样",
      };

      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
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
      if (!localStorage.getItem("bot_id")) {
        getBots();
        // createBot();
        // getGptsSearchData();
      }
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        {bots.length
          ? bots.map((bot: Bot) => (
              <div key={bot.bot_id}>
                <img
                  src={bot.icon_url}
                  alt={bot.bot_name}
                  width="80"
                  height="80"
                />
                <p
                  id={bot.bot_id}
                  className="text-base font-semibold leading-7 text-indigo-600"
                >
                  {bot.bot_id}
                </p>
                <p
                  id={bot.bot_name}
                  className="text-base font-semibold leading-7 text-indigo-600"
                >
                  {bot.bot_name}
                </p>
                <p
                  id={bot.description}
                  className="text-base font-semibold leading-7 text-indigo-600"
                >
                  {bot.description}
                </p>
              </div>
            ))
          : "没有机器助手，请先创建......"}
      </div>
    </div>
  );
}
