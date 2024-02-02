
import { getExamIdForUser } from "@/lib/api/redis/exam-id";
import { getExamStatusKV } from "@/lib/api/redis/exam-status";
import { ExamStatusZustand } from "@/lib/store/zuestand-store";
import { kv } from "@vercel/kv";





export async function getExamStatus(userId: string): Promise<ExamStatusZustand | null> {
    console.log(`Starting to get exam details for user ID: ${userId}`);

    const examId = await getExamIdForUser(userId);
    console.log(`Exam ID for user ID ${userId}: ${examId}`);

    if (!examId) {
        console.log(`No exam ID found for user ID ${userId}`);
        return null
    }

    // const examStatusKey = `tica:exam-status:all:${examId}`;
    // console.log(`Exam status key: ${examStatusKey}`);

    const examStatusValue = await getExamStatusKV(examId)
    // console.log(`Exam details from KV for key ${examStatusKey}:`, examStatusValue);


    return examStatusValue;
}
