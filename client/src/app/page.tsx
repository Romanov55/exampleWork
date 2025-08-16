import { getMainNews, getTopicNews } from "@/actions/news";
import { News, SeoType, Topic } from "@/types";
import Image from "next/image";
import config from "../../config";
import Link from "next/link";
import { Metadata } from "next";
import { getSeo } from "@/actions/seo";
import { TopicNewsBlock } from "@/components/shared/news/topicNewsBlock";
import { getTopics } from "@/actions/topics";

export const metadata = async (): Promise<Metadata> => {
  const seo = await getSeo() as SeoType
    
  return {
    title: seo.mainTitle || 'Главная',
    description: seo.mainDesc || '',
  };
};

export default async function Home() {
  const mainNews = await getMainNews() as News[]
  const topics = await getTopics(1) as Topic[]

  return (
    <>
      <section className="base container">
        <div className="base__center">
          {mainNews?.slice(0, 2).map((item) => (
            <Link 
              className={`base__news`}
              key={item.id}
              href={`/news/${item.slug}`}
            >
              <Image
                src={`${config.IMAGE_URL}/news/${item.img}`}
                alt={item.imgTitle}
                width={770}
                height={480}
                className="news__img"
              />
              <div className="base__inside__block">
                <p className="news__topic">{item.topics[0].title}</p>
                <p className="news__title">{item.title}</p>
                <p className="news__preview">{item.previewText}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="base__extreme">
          {mainNews?.slice(2,4).map((item) => (
            <Link 
              className={`base__news`} 
              key={item.id}
              href={`/news/${item.slug}`}
            >
              <Image
                src={`${config.IMAGE_URL}/news/${item.img}`}
                alt={item.imgTitle}
                width={770}
                height={480}
                className="news__img"
              />
              <div className="base__inside__block">
                <p className="news__topic">{item.topics[0].title}</p>
                <p className="news__title">{item.title}</p>
                <p className="news__preview">{item.previewText}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="base__extreme">
          {mainNews?.slice(4, 6).map((item) => (
            <Link 
              className={`base__news`} 
              key={item.id}
              href={`/news/${item.slug}`}
            >
              <Image
                src={`${config.IMAGE_URL}/news/${item.img}`}
                alt={item.imgTitle}
                width={770}
                height={480}
                className="news__img"
              />
              <div className="base__inside__block">
                <p className="news__topic">{item.topics[0].title}</p>
                <p className="news__title">{item.title}</p>
                <p className="news__preview">{item.previewText}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {topics.map(async (topic, index) => {
        const topicNews = await getTopicNews(topic.id) as unknown as News[]

        return (
          <div key={topic.id} className="main__topic container">
            {index < 5 ? (
              index === 0 ? (
                <h2 className="main__topic__title">{topic.title}</h2>
              ) : index === 1 ? (
                <h3 className="main__topic__title">{topic.title}</h3>
              ) : index === 2 ? (
                <h4 className="main__topic__title">{topic.title}</h4>
              ) : index === 3 ? (
                <h5 className="main__topic__title">{topic.title}</h5>
              ) : (
                <h6 className="main__topic__title">{topic.title}</h6>
              )
            ) : (
              <div className="main__topic__title">{topic.title}</div>
            )}

            <TopicNewsBlock news={topicNews} />
          </div>
        )
      })}
      
    </>
  );
}
