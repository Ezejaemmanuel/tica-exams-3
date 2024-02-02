import { kv } from "@vercel/kv";

export async function getAllAnswers(userId: string) {
    try {
        const answers = await kv.hgetall<Record<string, string>>(`tica:answers:${userId}`);
        return answers;
    } catch (error) {
        console.error('Error retrieving all answers:', error);
        return null;
    }
}