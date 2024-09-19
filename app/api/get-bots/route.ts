const axios = require("axios");
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  const { space_id } = await req.json();
  const url =
    process.env.COZE_BASE_URL +
    `/space/published_bots_list?space_id=${space_id}`;
  const token = process.env.COZE_AK;

  try {
    // 使用axios发送GET请求
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // 设置认证头部
      },
    });
    // 请求成功处理逻辑
    return respData(response.data);
  } catch (e) {
    console.log("upload cover failed: ", e);
    return respErr("upload cover failed");
  }
}
