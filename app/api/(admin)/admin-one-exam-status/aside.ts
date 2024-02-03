import { prisma } from "@/lib/db";
import { Exam } from "@prisma/client";

export async function getExamDetailsById(examId: string): Promise<Exam | null> {
    try {
        const examDetails = await prisma.exam.findUnique({
            where: {
                id: examId,
            },
        });

        if (!examDetails) {
            console.log(`No exam found with ID: ${examId}`);
            return null;
        }

        return examDetails;
    } catch (error) {
        console.error('Failed to retrieve exam details:', error);
        throw error; // Rethrow the error or handle it as per your application's error handling policy
    }
}
