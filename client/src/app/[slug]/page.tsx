export const dynamic = 'force-dynamic';

import React from 'react';
import { Metadata } from "next";
import { News, Topic } from '@/types';
import { getOneTopic } from '@/actions/topics';
import Image from 'next/image';
import config from '../../../config';
import { getTopicNews } from '@/actions/news';
import { TopicNewsBlock } from '@/components/shared/news/topicNewsBlock';
import { notFound } from 'next/navigation';

export async function generateMetadata(
    { params }: { params: { slug: string } },
  ): Promise<Metadata> {
  const { slug } = await params
  const topic: Topic = await getOneTopic(slug);

  return {
      title: topic.title || "Тема" ,
      description: topic.description || "",
  }
}

type Props = {
    params: { slug: string };
};

export default async function OneCategory({
    params,
  }: Props) {
  const { slug } = await params
  const topic: Topic = await getOneTopic(slug);
  if (!topic) {
    notFound()
  }

  const news: News[] = await getTopicNews(topic.id);

  return (
    <>
      <section className='topic__entry container'>
        <div className='topic__entry__block'>
          <Image className='topic__entry__preview__img' width={1300} height={300} src={`${config.IMAGE_URL}/topic/${topic.img}`} alt={topic.imgName} />
          <h1 className='topic__entry__preview__title'>{topic.title}</h1>
        </div>
        <p className='topic__entry__description'>{topic.description}</p>
      </section>

      <section className='container'>
        <TopicNewsBlock news={news} />
      </section>
    </>
  );
};