const axios = require("axios");
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  const { conversation_id, content, bot_id } = await req.json();
  const url =
    process.env.COZE_CHAT_BASE_URL + `/chat?conversation_id=${conversation_id}`;
  const token = process.env.COZE_AK;

  let params = {
    bot_id,
    user_id: "123",
    stream: true,
    auto_save_history: true,
    additional_messages: [
      {
        role: "user",
        content: content,
        content_type: "text",
        type: "question",
      },
    ],
  };

  try {
    // 使用axios发送GET请求
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`, // 设置认证头部
        "Content-Type": "application/json",
      },
      data: params,
    });
    // 请求成功处理逻辑
    console.log("response====>", response);
    return respData(response.data);
  } catch (e) {
    console.log("upload cover failed: ", e);
    return respErr("upload cover failed");
  }
}
