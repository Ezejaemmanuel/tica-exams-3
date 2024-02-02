// // pages/api/generate-data.ts
// import { faker } from '@faker-js/faker';
// import { prisma } from '@/lib/db';
// import { Role, ClassLevel, Option } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';


// function randomize<T>(array: T[]): T {
//     return array[Math.floor(Math.random() * array.length)];
// }

// function randomDate(years: number = 1): Date {
//     return faker.date.past({ years });
// }

// function generateSeed() {
//     const randomNumber = Math.floor(Math.random() * 10000000) + 1;
//     const timeInMilliseconds = new Date().getTime();
//     return randomNumber ^ timeInMilliseconds;
// }

// function createSeededFaker() {
//     const seedValue = generateSeed();
//     faker.seed(seedValue);
// }

// async function createUserAuthAndModel(selectedExamId: string) {
//     createSeededFaker();
//     const userAuthId = uuidv4();
//     const createdAt = randomDate();
//     const updatedAt = randomDate();

//     const userAuth = {
//         id: userAuthId,
//         email: faker.internet.email(),
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         createdAt: createdAt,
//         updatedAt: updatedAt,
//         banned: faker.datatype.boolean(),
//         role: randomize(Object.values(Role)),
//         userId: userAuthId,
//         emailAddresses: JSON.stringify([{ email: faker.internet.email() }]),
//         phoneNumbers: JSON.stringify([{ phoneNumber: faker.phone.number() }]),
//     };
//     await prisma.userAuth.create({ data: userAuth });

//     const paymentConfirmation = faker.datatype.boolean() ? {
//         create: {
//             paymentUrl: faker.internet.url(),
//             paymentConfirmed: faker.datatype.boolean(),
//             createdAt: createdAt,
//             updatedAt: updatedAt,
//             examId: selectedExamId, // Add this line
//         },
//     } : undefined;

//     const user = {
//         id: userAuthId,
//         name: `${userAuth.firstName} ${userAuth.lastName}`,
//         officialEmail: userAuth.email,
//         class: randomize(['JSS1', 'JSS2', 'SS1']),
//         dob: faker.date.past({ years: 18 }),
//         officialPhoneOrWhatsappNumber: faker.phone.number(),
//         fullAddress: faker.location.streetAddress(),
//         locality: faker.location.city(),
//         city: faker.location.city(),
//         state: faker.location.state(),
//         country: faker.location.country(),
//         homeAddress: faker.location.secondaryAddress(),
//         classLevel: randomize(Object.values(ClassLevel)),
//         createdAt: createdAt,
//         updatedAt: updatedAt,
//         userAuthId: userAuthId,
//         paymentConfirmation: paymentConfirmation,
//     };
//     await prisma.user.create({ data: user });
//     return { userAuthId, selectedExamId };
// }

// async function createQuestions(selectedExamId: string) {
//     for (let j = 0; j < 30; j++) {
//         createSeededFaker();
//         const questionCreatedAt = randomDate();
//         const questionUpdatedAt = randomDate();

//         const englishQuestion = {
//             question: faker.lorem.sentence(),
//             optionA: faker.lorem.word(),
//             optionB: faker.lorem.word(),
//             optionC: faker.lorem.word(),
//             optionD: faker.lorem.word(),
//             correctAnswer: randomize(Object.values(Option)),
//             examId: selectedExamId, // Reuse the selected examId
//             createdAt: questionCreatedAt,
//             updatedAt: questionUpdatedAt,
//         };
//         await prisma.englishQuestion.create({ data: englishQuestion });

//         const mathQuestion = {
//             question: faker.lorem.sentence(),
//             optionA: faker.lorem.word(),
//             optionB: faker.lorem.word(),
//             optionC: faker.lorem.word(),
//             optionD: faker.lorem.word(),
//             correctAnswer: randomize(Object.values(Option)),
//             examId: selectedExamId, // Reuse the selected examId
//             createdAt: questionCreatedAt,
//             updatedAt: questionUpdatedAt,
//         };
//         await prisma.mathQuestion.create({ data: mathQuestion });

//         const generalStudiesQuestion = {
//             question: faker.lorem.sentence(),
//             optionA: faker.lorem.word(),
//             optionB: faker.lorem.word(),
//             optionC: faker.lorem.word(),
//             optionD: faker.lorem.word(),
//             correctAnswer: randomize(Object.values(Option)),
//             examId: selectedExamId, // Reuse the selected examId
//             createdAt: questionCreatedAt,
//             updatedAt: questionUpdatedAt,
//         };
//         await prisma.generalStudiesQuestion.create({ data: generalStudiesQuestion });
//     }
// }

// async function createUserExam(userAuthId: string, selectedExamId: string) {
//     const createdAt = randomDate();
//     const updatedAt = randomDate();

//     const userExamData = {
//         userId: userAuthId,
//         examId: selectedExamId,
//         createdAt: createdAt,
//         updatedAt: updatedAt,
//     };
//     await prisma.userExam.create({ data: userExamData });
// }

// async function executeStep(step: number, selectedExamId: string, userAuthId?: string) {
//     switch (step) {
//         case 1:
//             return await createUserAuthAndModel(selectedExamId);
//         case 2:
//             await createQuestions(selectedExamId);
//             break;
//         case 3:
//             if (!userAuthId) {
//                 throw new Error('User auth ID is required for step 3');
//             }
//             await createUserExam(userAuthId, selectedExamId);
//             break;
//         default:
//             throw new Error('Invalid step');
//     }
// }
// export async function GET(request: NextRequest) {
//     try {
//         // Select a random examId for all users and questions
//         const exams = await prisma.exam.findMany({
//             select: { id: true },
//         });
//         const selectedExamId = "SS1-jan-2024-ss1_exam_2";

//         // Create 30 questions for each subject for the selected exam
//         await createQuestions(selectedExamId);

//         // Create 100 users and a userExam for each
//         // for (let i = 0; i < 300; i++) {
//         //     const userAuthId = await createUserAuthAndModel(selectedExamId);
//         //     // await createUserExam(userAuthId.userAuthId, userAuthId.selectedExamId);
//         // }

//         return NextResponse.json({ message: "Data generation completed successfully." }, { status: 200 });
//     } catch (error) {
//         console.error('Failed to create user auth:', error);
//         return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//     }
// }
