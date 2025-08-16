'use client'

import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  value?: string;
}

export const SearchInput: React.FC<Props> = ({value}) => {
  const [searchValue, setSearchValue] = useState(value);

  return (
    <section className='container'>
      <div className='search__block'>
        <input className='search__block-input' type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <Link className='search__block-button' href={`/search/?title=${searchValue}`}>Поиск</Link>
      </div>
    </section>
  );
};