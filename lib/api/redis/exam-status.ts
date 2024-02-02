import { kv } from "@vercel/kv";
import { safeKVOperation } from "./safeKvOperation";
import { prisma } from "@/lib/db";
import { ExamStatusZustand } from "@/lib/store/zuestand-store";
export async function setExamStatusKV(examId: string, examStatus: ExamStatusZustand) {
    const key = `tica:exam-status:all:${examId}`;
    return safeKVOperation(() => kv.set(key, examStatus));
}

// Function to retrieve the current exam status KV value

export async function getExamStatusKV(examId: string): Promise<ExamStatusZustand | null> {
    const key = `tica:exam-status:all:${examId}`;
    let examStatus = await safeKVOperation(() => kv.get<ExamStatusZustand>(key));

    if (!examStatus) {
        // Query the Prisma database for the exam status
        const exam = await prisma.exam.findUnique({
            where: {
                id: examId,
            },
            select: {
                date: true,
                startTime: true,
                lengthOfExam: true,
                // Assuming you have a way to determine the exam status based on the exam data
            },
        });
        console.log("thtis is the exam that is returned from the database", exam)
        if (exam) {
            // Determine the exam status based on the exam data
            // This is a simplified example. You'll need to implement the logic
            // to determine the status based on the current date/time and the exam's schedule

            // Construct the ExamStatusZustand object
            examStatus = {
                examDateTime: exam.date || undefined,
                length: exam.lengthOfExam || undefined,
            };

            // Set the retrieved status to the cache
            await safeKVOperation(() => kv.set(key, examStatus));
        } else {
            // If the exam is not found in the database, return a default value with the status NotYet
            return null;
        }
    }

    return examStatus;
}



// Function to update only the exam status without affecting other properties
// export async function updateExamStatusOnly(examId: string, newStatus: ExamStatus) {
//     const currentExamStatus = await getExamStatusKV(examId);
//     if (!currentExamStatus) {
//         console.error("Exam status not found for examId:", examId);
//         return;
//     }

//     // Update the status field only
//     const updatedExamStatus: ExamStatusZustand = {
//         ...currentExamStatus,
//         status: newStatus,
//     };

//     // Save the updated exam status back to KV
//     const key = `tica:exam-status:all:${examId}`;
//     return safeKVOperation(() => kv.set(key, updatedExamStatus));
// }
// src/app/api/user-exam-status/aside-functions.ts
export enum UserExamStatus {
    NotYet = 'not-yet',
    Ongoing = 'ongoing',
    Submitted = 'submitted',
    ResultPresent = 'result-present',
}
// src/app/api/user-exam-status/kv-operations.ts
export async function setUserExamStatusKV(userId: string, examStatus: UserExamStatus) {
    const key = `tica:user-exam-status:${userId}`;
    return safeKVOperation(() => kv.set(key, examStatus));
}

export async function getUserExamStatusKV(userId: string): Promise<UserExamStatus> {
    const key = `tica:user-exam-status:${userId}`;
    const userExamStatus = await safeKVOperation(() => kv.get<UserExamStatus>(key));
    if (!userExamStatus) {
        return UserExamStatus.NotYet;
    }
    return userExamStatus;
}
