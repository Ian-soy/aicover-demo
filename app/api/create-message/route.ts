const axios = require("axios");
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  const { conversation_id, content } = await req.json();
  const url =
    process.env.COZE_BASE_URL +
    `/conversation/message/create?conversation_id=${conversation_id}`;
  const token = process.env.COZE_AK;

  let params = {
    role: "user",
    content,
    content_type: "text",
  };

  try {
    // 使用axios发送GET请求
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // 设置认证头部
        "Content-Type": "application/json",
      },
      data: params,
    });
    // 请求成功处理逻辑
    return respData(response.data);
  } catch (e) {
    console.log("upload cover failed: ", e);
    return respErr("upload cover failed");
  }
}
