// pages/student-dashboard.tsx

import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import { Suspense } from 'react';
import { CardSkeleton } from './cardsSkeleton';
import MainContents from './newMainContent';


export default async function StudentDashboard() {
    const userId = getUserId();

    if (!userId) {
        return redirect('/sign-in');
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { paymentConfirmation: true },
    });

    if (!user || !user.paymentConfirmation?.paymentUrl) {
        redirect('/make-payment');
    }
    if (!user.paymentConfirmation.paymentConfirmed) {
        redirect("/waiting-for-confirmation")
    }

    return (
        <div className='mx-auto'>
            <Suspense fallback={<CardSkeleton />}>
                <MainContents />
            </Suspense>
        </div>
    );
}
