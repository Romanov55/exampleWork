import { News } from '@/types';
import Image from 'next/image';
import React from 'react';
import config from '../../../../config';
import Link from 'next/link';

interface Props {
  news: News[];
  type?: number;
}

export const TopicNewsBlock: React.FC<Props> = ({news, type}) => {
  if (!Array.isArray(news)) {
    news = [];
  }

  return (
    <div className='topic__news'>
      {news.length > 0 ? (
        (type === 2 ? news.slice(0, 4) : news).map((item) => (
          <Link
            href={`/news/${item.slug}`}
            className='topic__news__item'
            key={item.id}
          >
            <Image
              className='news__img'
              width={315}
              height={217}
              src={`${config.IMAGE_URL}/news/${item.img}`}
              alt={item.imgTitle}
            />
            <div className='topic__text__block'>
              <p className='news__topic'>{item.topics[0].title}</p>
              <p className='news__title'>{item.title}</p>
              <p className='news__preview'>{item.previewText}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>Таких новостей ещё нет</p>
      )}
    </div>
  );
};