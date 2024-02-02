// pages/api/update-exam-ids.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
// pages/api/update-exam-ids.ts



// Mapping from old exam IDs to new exam IDs
const examIdMapping: { [key: string]: string } = {
    'ss1-1-2024': 'SS1-jan-2024-first-exam',
    'jss1-1-2024': 'JSS1-jan-2024-jss1-exams-second-exam',
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Start a transaction to ensure atomicity
        for (const [oldExamId, newExamId] of Object.entries(examIdMapping)) {
            // Check if the old examId exists
            const oldExam = await prisma.exam.findUnique({
                where: { id: oldExamId },
            });

            if (!oldExam) {
                throw new Error(`Exam with ID "${oldExamId}" not found.`);
            }

            // Check if the new examId already exists
            const existingExam = await prisma.exam.findUnique({
                where: { id: newExamId },
            });

            if (existingExam) {
                throw new Error(`Exam with new ID "${newExamId}" already exists.`);
            }

            // Update the Exam model
            await prisma.exam.update({
                where: { id: oldExamId },
                data: { id: newExamId },
            });

            // Update related models
            // Update the UserExam model
            await prisma.userExam.updateMany({
                where: { examId: oldExamId },
                data: { examId: newExamId },
            });

            // Update the EnglishQuestion model
            await prisma.englishQuestion.updateMany({
                where: { examId: oldExamId },
                data: { examId: newExamId },
            });

            // Update the MathQuestion model
            await prisma.mathQuestion.updateMany({
                where: { examId: oldExamId },
                data: { examId: newExamId },
            });

            // Update the GeneralStudiesQuestion model
            await prisma.generalStudiesQuestion.updateMany({
                where: { examId: oldExamId },
                data: { examId: newExamId },
            });
        }

        // If the transaction is successful, send a success response
        return NextResponse.json({ message: 'Exam IDs updated successfully' });
    } catch (error) {
        console.error('Failed to update exam IDs:', error);
        return NextResponse.json({ message: 'Failed to update exam IDs', error }, { status: 500 });
    }
}

