'use client'

import { Information, News, Topic } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../ui/input';
import { useRouter } from 'next/navigation';
import { Variants } from './Variants';
import { getSearchHeaderNews } from '@/actions/news';
import { Telegram } from '../telegram';

interface Props {
  topics: Topic[],
  className: string,
  info: Information
}

export const Header: React.FC<Props> = ({topics, className, info}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useRouter();
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState<News[]>([])
  const [empty, setEmpty] = useState(false)
  const [totalNews, setTotalNews] = useState(0)

  const handleSearch = () => {
    if (searchActive && searchValue) {
      navigate.push(`/search?title=${searchValue}`)
      setSearchActive(false)
      setSearchValue('')
    } else if (!searchActive) {
      setSearchActive(true)
    } else {
      setSearchActive(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    setNews([]);
    setEmpty(false)

    const getSearchProducts = async () => {
      if (searchValue.trim()) { 
        const data = await getSearchHeaderNews(searchValue);
        if (data.news.length === 0) {
          setEmpty(true)
          setTotalNews(0)
        } else {
          setNews(data.news);
          setTotalNews(data.total)
        }
        setLoading(false)
      }
    };

    const timeoutId = setTimeout(getSearchProducts, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  return (
    <header 
      className={`header ${className}`}
      ref={headerRef}
    >
      <div className="header__top container">
        <Link href='/' className={`logo ${searchActive ? 'hide' : ''}`}>
          <Image width={150} height={75} alt='Логотип' src={'/img/icons/logo.svg'} />
        </Link>

        <div className='header__top__right'>
          <Input onKeyDown={(e) => e.key === 'Enter' && handleSearch()} classname={searchActive ? 'show' : ''} value={searchValue} setValue={setSearchValue} />
          <div className={`live__search ${searchValue ? 'show' : ''}`}>
            {loading && <div className='loader__wrapper'>
              <Image
                className='load'
                src={'/img/icons/load.webp'}
                width={60}
                height={60}
                alt='Загрузка'
              />
            </div>}
            <ul className='search__list'>
              {news && news.length > 0 && news.map((item) => (
                  <li className='search__list-li' key={item.id}>
                      <Link className='search__list-link' href={`/search/?title=${item.title}`} onClick={() => setSearchValue('')}>
                        {item.title}
                      </Link>
                  </li>
              ))}
              {empty && <li className='empty__search'>новостей не найдено</li>}
            </ul>
            {totalNews > 5 && <Link className='all__results' href={`/search/${searchValue}`}>Смотреть все варианты: {totalNews}</Link>}
          </div>
          {info.telegramLink && <Telegram telegramLink={info.telegramLink} />}
          <button onClick={handleSearch} className={`btn btn__search ${searchActive ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" 
              width="24" height="24" 
              viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
            </svg>
          </button>
        </div>
        <Variants topics={topics} />
      </div>
      <hr />

      <div className={`header__bottom container`}>
        {topics.map((topic) => (
          <nav className='header__bottom__box' key={topic.id}>
            <Link className='header__bottom__box__link' href={`/${topic.slug}`}>{topic.title}</Link>
          </nav>
        ))}
      </div>
      <hr />
    </header>
  );
};