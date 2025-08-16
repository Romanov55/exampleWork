'use server'

import { $host } from '.';
import config from '../../config';

export async function getInfo() {
    try {
        const { data } = await $host(`${config.BASE_URL}/info`);
        return data
    }
    catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}