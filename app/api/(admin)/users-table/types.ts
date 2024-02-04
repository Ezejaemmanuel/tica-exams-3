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
export type User = PrismaUser & {
    paymentStatus: PaymentStatus; // Computed field, not in Prisma model
    paymentConfirmation?: PaymentConfirmation & {
        paymentUrl?: string;
        paymentConfirmed: boolean;
        examId: string;
        updatedAt: Date;
    };
    userAuth?: UserAuth & {
        role: Role;
        imageUrl?: string;
    };
    result?: Result & {
        totalScore: number;
        passed: boolean;
    };
};

export type UsersResponse = {
    users: User[];
    totalPages: number;
};
