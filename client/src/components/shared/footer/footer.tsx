import { Information, Topic } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Telegram } from '../telegram';

interface Props {
  info: Information;
  topics: Topic[],
}

export const Footer: React.FC<Props> = ({info, topics}) => {
  return (
    <footer className='footer'>
      <div className='container footer__container'>
        <div className='footer__block'>
          <Link href='/' className='logo'>
            <Image width={150} height={75} alt='Логотип' src={'/img/icons/logo.svg'} />
          </Link>
          {info.telegramLink && <Telegram telegramLink={info.telegramLink}/>}
        </div>
        <div className='footer__block'>
          {topics.map((topic) => (
            <nav className='header__bottom__box' key={topic.id}>
              <Link className='header__bottom__box__link' href={`/${topic.slug}`}>{topic.title}</Link>
            </nav>
          ))}
        </div>
        <p className='footer__left__text'>© 2025 Travel Orbit. Все права защищены.</p>
      </div>
    </footer>
  );
};