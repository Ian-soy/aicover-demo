import { getNews } from "@/models/news";
import { News } from "@/types/news";

export default async function () {
  const page = 1;
  const limit = 60;

  let news: News[] = [];
  news = await getNews(page, limit);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900 text-slate-300">
      <div className="w-full h-full">
        <div className="h-full pt-8 flex items-start gap-x-0 pb-8">
          <div className="h-full flex-1 overflow-y-auto custom-scrollbar pt-8">
            <div className="w-full px-8">
              <div className="px-0 pb-24">
                <div>
                  <div className="flex w-full md:max-w-2xl mx-auto items-start pb-4 mb-4">
                    <div className="flex-1 w-full md:max-w-2xl mx-auto ">
                      { news.map((item, index) => {
                        return (
                          <div key={index}>
                            <h3 className="mt-4 text-lg font-medium flex items-center gap-x-2 py-2">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M16 2H8C4.691 2 2 4.691 2 8v12a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 13c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v7z"></path>
                                <circle cx="9.5" cy="11.5" r="1.5"></circle>
                                <circle cx="14.5" cy="11.5" r="1.5"></circle>
                              </svg>
                              { index+1 }、{ item.title }
                              <div className="flex-1"></div>
                            </h3>
                            <div className="text-sm text-slate-400 decoration-dashed underline">创建时间：{ item.created_at }</div>
                            <div className="mt-4 leading-loose text-sm content break-all">
                              <pre className="whitespace-pre-line">
                                {item.content}
                              </pre>
                            </div>

                            <div className="divide-double h-px mt-8 bg-gray-500"></div>
                          </div>
                        )
                      }
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
