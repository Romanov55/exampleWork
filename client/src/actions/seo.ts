import config from "../../config";
import { $host } from ".";

export async function getSeo() {
    try {
        const { data } = await $host.get(`${config.BASE_URL}/seo`, {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });
        return data;
    } catch (error) {
        console.error("Ошибка запроса:", error);
        return { error: "Ошибка запроса" };
    }
}