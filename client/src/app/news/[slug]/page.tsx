export const dynamic = 'force-dynamic';

import React from 'react';
import { Metadata } from "next";
import { News } from '@/types';
import { getOneNews } from '@/actions/news';
import Image from 'next/image';
import config from '../../../../config';
import { notFound } from 'next/navigation';
import { TopicNewsBlock } from '@/components/shared/news/topicNewsBlock';
import Link from 'next/link';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = await params
  const news: News = await getOneNews(slug);

  return {
    title: news.seoTitle || news.title || "Новость",
    description: news.seoDescription || "",
  }
}

type Props = {
    params: { slug: string };
};

export default async function OneCategory({
    params,
  }: Props) {
  const { slug } = await params
  const {news, other} : {news: News, other: News[]} = await getOneNews(slug);
  if (!news) {
    notFound()
  }

  return (
    <>
      <section className='article container'>
        <h1 className='article__title'>{news.title}</h1>
        <Image className='article__img' width={500} height={250} alt={news.imgTitle} src={`${config.IMAGE_URL}/news/${news.img}`} />

        <div className="article__info" dangerouslySetInnerHTML={{ __html: news.textNews }} />


        <div className='article__topics'>
          {news.topics && news.topics.map((topic) => (
            <Link key={topic.id} href={`/${topic.slug}`} className='article__topics__link' >{topic.title}</Link>
          ))}
        </div>
      </section>

      {other.length > 0 &&<section className='container'>
        <p className='main__topic__title'>По этой же теме</p>
        <TopicNewsBlock news={other} />
      </section>}
    </>
  );
};