import { respData, respErr } from "@/lib/resp";
import getResponseFromOllama from "@/services/ollamaService";

export async function POST(req: Request) {
  const { q, m, s } = await req.json();

  try {
    // 使用axios发送GET请求
    const response = await getResponseFromOllama({ 
        q,
        m,
        s
    });

    // 请求成功处理逻辑
    return respData(JSON.parse(response));
  } catch (e) {
    console.log("create fai botled: ", e);
    return respErr("upload cover failed");
  }
}
