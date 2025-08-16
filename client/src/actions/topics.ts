'use server'

import { $host } from '.';
import config from '../../config';

export async function getTopics(type: number) {
    try {
        const { data } = await $host(`${config.BASE_URL}/topic/${type}`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}

export async function getOneTopic(slug: string) {
    try {
        const { data } = await $host(`${config.BASE_URL}/topic/one/${slug}`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}