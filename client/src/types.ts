export interface Information {
  id: number;
  address?: string;
  phoneOne?: string;
  phoneTwo?: string;
  phoneThree?: string;
  phoneFour?: string;
  whatsappLink?: string;
  instLink?: string;
  youtubeLink?: string;
  ozonLink?: string;
  facebookLink?: string;
  telegramLink?: string;
  iframeMap?: string;
  email?: string;
}

export interface UsersType {
  id: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
  mainAdmin?: boolean;
  permission?: string;
  statusOn?: boolean;
  statusFill?: boolean;
  firstname?: string;
  secondname?: string;
  surname?: string;
  birthDate?: string;
  consentToMailing?: boolean;
  codeUser?: string;
  parentUser?: string;
  sort?: number;
}

export interface Topic {
  id: number;
  type: number;
  slug: string;
  title: string;
  description: string;
  img: string;
  imgName: string;
  sort: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Country {
  id: number;
  slug: string;
  title: string;
  description: string;
  img: string;
  imgName: string;
  sort: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface News {
  id: number;
  slug: string;
  img: string;
  imgTitle: string;
  title: string;
  previewText: string;
  textNews: string;
  shortText: string;
  sourceNews: string;
  sort?: number;
  seoTitle?: string;
  seoDescription?: string;
  topics: Topic[];
  countries: Country[];
}

export interface ReviewsType {
  id: number;
  title: string;
  subtitle?: string;
  text: string;
  img: string;
  sort?: number;
}

export interface SeoType {
  id: number;
  mainTitle : string;
  mainDesc  : string;
  searchTitle : string;
  searchDesc : string;
}