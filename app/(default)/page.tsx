import Covers from "@/components/covers";
import Hero from "@/components/hero";
import Input from "@/components/input";
import { Metadata } from "next";
import { getCovers } from "@/models/cover";
import { getNewsCountByTitle } from "@/models/news";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}`,
    },
  };
}

export default async function () {
  const covers = await getCovers(1, 60);
  const count = await getNewsCountByTitle(
    "武汉市2024年度部分事业单位公开招聘一览表"
  );
  console.log("count111====>", count);

  return (
    <div className="w-full px-6">
      <Hero />
      <Input />
      <Covers cate="latest" covers={covers} showTab={true} />
    </div>
  );
}
