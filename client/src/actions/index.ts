'use server'

import axios from "axios";
import { cookies } from "next/headers";

const $host = axios.create({
  baseURL: '/api'
});

const $authHost = axios.create({
  baseURL: '/api'
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authInterceptor = (config: any) => {
  // Получаем токен из куки
  const token = cookies().get('token__user')?.value;
  
  // Если токен есть, добавляем его в заголовок авторизации
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $authHost, $host
};
