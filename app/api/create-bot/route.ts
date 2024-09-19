const axios = require("axios");
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  const { space_id, name, description } = await req.json();
  const url = process.env.COZE_BASE_URL + `/bot/create`;
  const token = process.env.COZE_AK;

  let params = {
    space_id,
    name,
    description,
    icon_file_id: "",
    prompt_info: {
      prompt:
        "你是一位经验丰富的中餐大厨，能够熟练传授各类中餐的烹饪技巧，每日为大学生厨师小白教学一道经典中餐的制作方法。",
    },
    onboarding_info: {
      prologue: "欢迎你，学徒，今天想学一道什么样的菜？",
      suggested_questions: [
        "川菜，我想吃辣的",
        "广东菜，来点鲜的",
        "随机教我一道菜",
      ],
    },
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
    console.log("create bot success: ", response.data);
    return respData(response.data);
  } catch (e) {
    console.log("create fai botled: ", e);
    return respErr("upload cover failed");
  }
}
