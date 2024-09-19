import { respData, respErr } from "@/lib/resp";
import { searchGpts } from "@/services/gpts";
import { News, Element, MyObject } from "@/types/news";
import { genUuid } from "@/lib";
import { insertNews, getNewsCountByTitle } from "@/models/news";

export async function POST(req: Request) {
  const { query } = await req.json();
  if (!query) {
    return respErr("invalid params");
  }

  let contentObject: MyObject = {
    answerText: {},
    follow_up: [],
    answerCard: {},
  };

  try {
    const vectorData: any = await searchGpts(query);

    vectorData.messages.map((item: Element) => {
      if (item.type === "answer" && item.content_type === "text") {
        // content_type: "text";
        contentObject.answerText = item;
      } else if (item.type === "answer" && item.content_type === "card") {
        // content_type: "card";
        contentObject.answerCard = item.content ? JSON.parse(item.content) : "";
      } else if (item.type === "follow_up") {
        contentObject.follow_up.push(item);
      }
    });

    const created_at = new Date().toISOString();
    const new_uuid = genUuid();
    const news: News = {
      title: query,
      content: contentObject.answerText.content,
      created_at: created_at,
      new_uuid: new_uuid,
    };
    let count = await getNewsCountByTitle(query);
    if (!Number(count)) {
      await insertNews(news);
    }
    return respData(contentObject);
  } catch (e) {
    console.log("upload file failed: ", e);
    return respErr("upload cover failed");
  }
}
