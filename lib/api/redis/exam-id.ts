import { kv } from "@vercel/kv";
import { safeKVOperation } from "@/lib/api/redis/safeKvOperation";
import { prisma } from "@/lib/db";
export const EXAM_IDS_CACHE_KEY = "tica:all-exam-ids";

// Function to retrieve all examIds with caching

export async function getAllExamIds(): Promise<string[] | null> {

    // Try to get the examIds from the cache

    // If the examIds are not in the cache, fetch them from the database
    console.log('ExamIds not found in cache, fetching from database');
    const currentDate = new Date();
    const exams = await prisma.exam.findMany({
        where: {
            date: {
                gte: currentDate, // Filter exams whose date is greater than or equal to the current date
            },
        },
        select: {
            id: true, // Only select the id field
        },
    });

    // Extract the examIds from the exams
    const examIds = exams.map(exam => exam.id);

    // If examIds are found, store them in the cache
    if (!(examIds.length > 0)) {
        return null;
    }
    return examIds;

}




// Function to delete all examIds from the cache
// export async function deleteAllExamIdsFromCache(): Promise<void> {
//     console.log('Attempting to delete all examIds from cache');
//     await safeKVOperation(() => kv.del(EXAM_IDS_CACHE_KEY));
//     console.log('All examIds deleted from cache');
// }

// Function to get the examId for a user with caching
export async function getExamIdForUser(userId: string): Promise<string | null> {
    console.log('Attempting to get examId for user:', userId);
    const cacheKey = `tica:examId:${userId}`;
    console.log('Generated cache key:', cacheKey);

    // Try to get the examId from the cache
    let examId = await safeKVOperation(() => kv.get<string>(cacheKey));

    // If the examId is not in the cache, fetch it from the database
    if (!examId) {
        console.log('ExamId not found in cache, fetching from database');
        const userExam = await prisma.userExam.findUnique({
            where: {
                userId: userId
            },
            select: {
                examId: true
            }
        });

        // Assuming there is only one exam per user, take the first result
        if (userExam) {
            examId = userExam.examId;
            console.log('Storing examId in cache:', examId);
            await safeKVOperation(() => kv.set(cacheKey, examId));
        }
    }

    console.log('Retrieved examId:', examId);
    return examId;
}

// Function to set the examId for a user

// Function to delete the examId for a user
export async function deleteExamIdForUser(userId: string): Promise<number | null> {
    console.log('Attempting to delete examId for user:', userId);
    const cacheKey = `tica:examId:${userId}`;
    console.log('Generated cache key:', cacheKey);
    const result = await safeKVOperation(() => kv.del(cacheKey));
    console.log('Result of deleting examId:', result);
    return result;
}
