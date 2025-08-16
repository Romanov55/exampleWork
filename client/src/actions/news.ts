'use server'

import { $host } from '.';
import config from '../../config';

export async function getMainNews() {
    try {
        const { data } = await $host(`${config.BASE_URL}/news/main`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}

export async function getSearchHeaderNews(value: string) {
    try {
        const { data } = await $host(`${config.BASE_URL}/news/header-search/${value}`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}

export async function getSearchNews(value: string) {
    try {
        const { data } = await $host(`${config.BASE_URL}/news/search/${value}`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}

export async function getTopicNews(topicId: number) {
    try {
        const { data } = await $host(`${config.BASE_URL}/news/topic/${topicId}`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}

export async function getOneNews(slug: string) {
    try {
        const { data } = await $host(`${config.BASE_URL}/news/one/${slug}`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}