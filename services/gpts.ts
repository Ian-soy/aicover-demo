import { Gpts } from "@/types/gpts";

export const searchGpts = async (question: string): Promise<Gpts[]> => {
  console.log("searchGpts: ", question);

  const uri = `${process.env.INDEX_API_BASE_URI}/gpts/search`;

  const data = {
    question: question,
  };

  try {
    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INDEX_API_KEY}`,
      },
      body: JSON.stringify(data),
    });
    const res = await resp.json();
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    console.log("request gpts search failed: ", e);
  }

  return [];
};
