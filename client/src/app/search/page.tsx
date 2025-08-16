/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import { getSeo } from "@/actions/seo";
import { getSearchNews } from "@/actions/news";
import { News, SeoType } from "@/types";
import { TopicNewsBlock } from "@/components/shared/news/topicNewsBlock";
import { SearchInput } from "@/components/shared/searchInput";

export const metadata = async (): Promise<Metadata> => {
  const seo = await getSeo() as SeoType
    
  return {
    title: seo.searchTitle || 'Поиск',
    description: seo.searchDesc || '',
  };
};

export default async function Search({searchParams}: {searchParams: any}) {
  const news = await getSearchNews(`${searchParams.title}`) as News[]
  
  return (
    <>
      <SearchInput value={searchParams.title} />

      <section className='container'>
        <TopicNewsBlock news={news} />
      </section>
    </>
  );
}
