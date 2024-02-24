// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { User as PrismaUser, PaymentConfirmation, UserAuth, Result, ClassLevel, Role } from '@prisma/client';
// export enum PaymentStatus {
//     Confirmed = 'Confirmed',
//     NotConfirmed = 'Not Confirmed',
//     NotPayed = 'Not Payed',
// }

// export async function GET(req: NextRequest) {
//     console.log('Received GET request for users API');
//     const { searchParams } = req.nextUrl;
//     const page = searchParams.get('page') || '1';
//     const limit = searchParams.get('limit') || '10';
//     const sort = searchParams.get('sort') || 'name';
//     const order = searchParams.get('order') || 'asc';
//     const search = searchParams.get('search') || '';

//     console.log(`Query parameters: page=${page}, limit=${limit}, sort=${sort}, order=${order}, search=${search}`);

//     try {
//         const pageNumber = parseInt(page);
//         const pageSize = parseInt(limit);
//         const skip = (pageNumber - 1) * pageSize;

//         console.log(`Calculated pagination: pageNumber=${pageNumber}, pageSize=${pageSize}, skip=${skip}`);

//         console.log('Fetching users from database...');
//         const users = await prisma.user.findMany({
//             where: {
//                 OR: [
//                     { name: { contains: search, mode: 'insensitive' } },
//                     { officialEmail: { contains: search, mode: 'insensitive' } },
//                     // Add other searchable fields if needed
//                 ],
//             },
//             take: pageSize,
//             skip: skip,
//             orderBy: {
//                 [sort]: order,
//             },
//             include: {
//                 paymentConfirmation: {
//                     select: {
//                         paymentUrl: true,
//                         paymentConfirmed: true,
//                         examId: true,
//                     },
//                 },
//                 userAuth: {
//                     select: {
//                         role: true,
//                     },
//                 },
//                 result: {
//                     select: {
//                         totalScore: true,
//                         passed: true
//                     },
//                 },
//             },
//         });
//         console.log('Users fetched:', users);

//         console.log('Computing payment status for each user...');
//         const usersWithPaymentStatus = users.map((user) => {
//             const paymentStatus = user.paymentConfirmation
//                 ? user.paymentConfirmation.paymentUrl
//                     ? user.paymentConfirmation.paymentConfirmed
//                         ? PaymentStatus.Confirmed
//                         : PaymentStatus.NotConfirmed
//                     : PaymentStatus.NotPayed
//                 : PaymentStatus.NotPayed;
//             console.log(`User ID: ${user.id}, Payment Status: ${paymentStatus}`);
//             return {
//                 ...user,
//                 paymentStatus,
//             };
//         });

//         console.log('Counting total users for pagination...');
//         const totalUsers = await prisma.user.count({
//             where: {
//                 OR: [
//                     { name: { contains: search, mode: 'insensitive' } },
//                     { officialEmail: { contains: search, mode: 'insensitive' } },
//                     // Add other searchable fields if needed
//                 ],
//             },
//         });
//         console.log('Total users:', totalUsers);

//         const totalPages = Math.ceil(totalUsers / pageSize);
//         console.log('Total pages:', totalPages);

//         console.log('Sending response with users and total pages...');
//         return NextResponse.json({ users: usersWithPaymentStatus, totalPages });
//     } catch (error) {
//         console.error('Error occurred while fetching users:', error);
//         let errorMessage = '';
//         if (error instanceof Error) {
//             errorMessage = error.message;
//         } else {
//             errorMessage = String(error);
//         }
//         console.log('Sending error response...');
//         return NextResponse.json({ error: errorMessage }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkAuthPermission } from '@/lib/auth/utils';
import { Prisma } from '@prisma/client';
import { SortOption, PaymentStatus } from './types';




export async function GET(req: NextRequest) {
    await checkAuthPermission("only_admin_and_superadmin");

    console.log('Received GET request for users API');
    const { searchParams } = req.nextUrl;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const sort = searchParams.get('sort') as SortOption || SortOption.NameAsc;
    const order = searchParams.get('order') || 'asc';
    const search = searchParams.get('search') || '';
    const paymentFilter = searchParams.get('paymentFilter') || '';

    console.log(`Query parameters: page=${page}, limit=${limit}, sort=${sort}, order=${order}, search=${search}`);

    try {
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;

        console.log(`Calculated pagination: pageNumber=${pageNumber}, pageSize=${pageSize}, skip=${skip}`);

        let paymentWhereCondition: Prisma.PaymentConfirmationWhereInput | undefined;
        switch (paymentFilter) {
            case 'confirmed':
                paymentWhereCondition = { paymentConfirmed: true };
                break;
            case 'notConfirmed':
                paymentWhereCondition = { paymentConfirmed: false, NOT: { paymentUrl: null } };
                break;
            case 'notPayed':
                paymentWhereCondition = { paymentUrl: null };
                break;
        }


        let orderBy: Prisma.UserOrderByWithRelationInput;
        switch (sort) {
            case SortOption.NameAsc:
                orderBy = { name: 'asc' };
                break;
            case SortOption.NameDesc:
                orderBy = { name: 'desc' };
                break;
            case SortOption.RoleAsc:
                orderBy = { userAuth: { role: 'asc' } };
                break;
            case SortOption.RoleDesc:
                orderBy = { userAuth: { role: 'desc' } };
                break;
            case SortOption.TotalScoreAsc:
                orderBy = { result: { totalScore: 'asc' } };
                break;
            case SortOption.TotalScoreDesc:
                orderBy = { result: { totalScore: 'desc' } };
                break;
            // Add other cases for different sort options
            default:
                orderBy = { createdAt: 'desc' }; // Default sort option
        }

        console.log('Fetching users from database...');
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    // Add other searchable fields if needed
                ],
            },
            take: pageSize,
            skip: skip,
            orderBy: orderBy,
            select: {
                id: true,
                name: true,
                class: true,
                candidateProfile: true,
                createdAt: true,
                paymentConfirmation: {
                    select: {
                        paymentUrl: true,
                        paymentConfirmed: true,
                        examId: true,
                    },
                },
                userAuth: {
                    select: {
                        role: true,
                        imageUrl: true, // Assuming you want the imageUrl from userAuth as well
                    },
                },
                result: {
                    select: {
                        totalScore: true,
                        englishScore: true,
                        mathsScore: true,
                        generalStudiesScore: true,
                        aggregate: true,
                        createdAt: true,
                        position: true,
                        passed: true,
                    },
                },
            },
        });

        console.log('Users fetched:', users);

        console.log('Computing payment status for each user...');
        const usersWithPaymentStatus = users.map((user) => {
            const paymentStatus = user.paymentConfirmation
                ? user.paymentConfirmation.paymentUrl
                    ? user.paymentConfirmation.paymentConfirmed
                        ? PaymentStatus.Confirmed
                        : PaymentStatus.NotConfirmed
                    : PaymentStatus.NotPayed
                : PaymentStatus.NotPayed;
            console.log(`User ID: ${user.id}, Payment Status: ${paymentStatus}`);
            return {
                ...user,
                paymentStatus,
            };
        });

        console.log('Counting total users for pagination...');
        const totalUsers = await prisma.user.count({
            where: {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    // Add other searchable fields if needed
                ],
                paymentConfirmation: paymentWhereCondition,
            },
        });
        console.log('Total users:', totalUsers);

        const totalPages = Math.ceil(totalUsers / pageSize);
        console.log('Total pages:', totalPages);

        console.log('Sending response with users and total pages...');
        return NextResponse.json({ users: usersWithPaymentStatus, totalPages });
    } catch (error) {
        console.error('Error occurred while fetching users:', error);
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        console.log('Sending error response...');
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
