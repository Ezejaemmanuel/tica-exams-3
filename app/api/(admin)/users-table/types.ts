import { User as PrismaUser, PaymentConfirmation, UserAuth, Result, ClassLevel, Role, Prisma } from '@prisma/client';

export enum PaymentStatus {
    Confirmed = 'Confirmed',
    NotConfirmed = 'Not Confirmed',
    NotPayed = 'Not Payed',
}

export enum SortOption {
    NameAsc = 'name-asc',
    NameDesc = 'name-desc',
    RoleAsc = 'role-asc',
    RoleDesc = 'role-desc',
    TotalScoreAsc = 'totalScore-asc',
    TotalScoreDesc = 'totalScore-desc',
    // Add other sort options as needed
}
export type User = {
    paymentStatus: PaymentStatus;
    name: string;
    class: string;
    id: string;
    candidateProfile: string;
    createdAt: Date;
    paymentConfirmation?: {
        paymentUrl?: string;
        paymentConfirmed: boolean;
        examId: string;
    };
    userAuth?: {
        role: Role;
        imageUrl?: string;
    };
    result?: {
        totalScore: number;
        englishScore: number;
        mathsScore: number;
        generalStudiesScore: number;
        aggregate: number;
        createdAt: Date;
        position: number;
        passed: boolean;
    };
};

export type UsersResponse = {
    users: User[];
    totalPages: number;
};
