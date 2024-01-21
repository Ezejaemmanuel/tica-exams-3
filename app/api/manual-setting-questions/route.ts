// // pages/api/add-questions.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { englishQuestions } from './english';
// import { generalKnowledgeQuestions } from './general';
// import { mathQuestions } from './maths';

// // Helper function to convert string to Option enum type
// function toOption(answer: string): 'A' | 'B' | 'C' | 'D' {
//     console.log("this is the answer option", answer);
//     if (answer === 'A' || answer === 'B' || answer === 'C' || answer === 'D') {
//         return answer;
//     }
//     throw new Error(`Invalid answer option: ${answer} ooo`);
// }

// export async function GET(req: NextRequest) {

//     // Normally, you would check for user authentication and permissions here
//     // For demonstration purposes, this step is omitted

//     try {
//         // Create a new exam record
//         const newExam = await prisma.exam.upsert({
//             where: { id: "jss1-1-2024" },
//             create: {
//                 id: 'jss1-1-2024',
//                 date: new Date('2024-01-15'),
//                 startTime: new Date('2024-01-15T10:00:00Z'), // Adjust timezone offset as needed
//                 EndTime: new Date('2024-01-15T10:45:00Z'), // Adjust timezone offset as needed
//                 classLevel: 'JSS1',
//             },
//             update: {
//                 id: 'jss1-1-2024',
//                 date: new Date('2024-01-15'),
//                 startTime: new Date('2024-01-15T10:00:00Z'), // Adjust timezone offset as needed
//                 EndTime: new Date('2024-01-15T10:45:00Z'), // Adjust timezone offset as needed
//                 classLevel: 'JSS1',
//             },
//         });

//         // Start a transaction to add all questions linked to the new exam
//         await prisma.$transaction([
//             prisma.mathQuestion.createMany({
//                 data: mathQuestions.map(q => ({
//                     questionNumber: q.questionNumber,
//                     question: q.question,
//                     optionA: q.optionA,
//                     optionB: q.optionB,
//                     optionC: q.optionC,
//                     optionD: q.optionD,
//                     correctAnswer: toOption(q.correctAnswer),
//                     examId: newExam.id,
//                 })),
//             }),
//             prisma.generalStudiesQuestion.createMany({
//                 data: generalKnowledgeQuestions.map(q => ({
//                     questionNumber: q.questionNumber,
//                     question: q.question,
//                     optionA: q.optionA,
//                     optionB: q.optionB,
//                     optionC: q.optionC,
//                     optionD: q.optionD,
//                     correctAnswer: toOption(q.correctAnswer),
//                     examId: newExam.id,
//                 })),
//             }),
//             prisma.englishQuestion.createMany({
//                 data: englishQuestions.map(q => ({
//                     questionNumber: q.questionNumber,
//                     question: q.question,
//                     optionA: q.optionA,
//                     optionB: q.optionB,
//                     optionC: q.optionC,
//                     optionD: q.optionD,
//                     correctAnswer: toOption(q.correctAnswer),
//                     examId: newExam.id,
//                 })),
//             }),
//         ]);

//         // If the transaction is successful, return a success response
//         return NextResponse.json({ message: 'Exam and questions added successfully' }, { status: 200 });
//     } catch (error) {
//         console.error('Request error', error);
//         // If there's an error, return an error response
//         return NextResponse.json({ error: 'An error occurred while adding the exam and questions' }, { status: 500 });
//     }
// }
