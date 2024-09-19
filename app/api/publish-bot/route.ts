const axios = require("axios");
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  const { bot_id } = await req.json();
  const url = process.env.COZE_BASE_URL + `/bot/publish`;
  const token = process.env.COZE_AK;

  let params = {
    bot_id,
    connector_ids: ["API"],
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
    console.log("publish bot success: ", response.data);
    return respData(response.data);
  } catch (e) {
    console.log("upload cover failed: ", e);
    return respErr("upload cover failed");
  }
}
