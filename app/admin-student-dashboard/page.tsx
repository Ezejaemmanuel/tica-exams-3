// pages/student-dashboard.tsx

import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import { Suspense } from 'react';
import { CardSkeleton } from '../student-dashboard/cardsSkeleton';
import MainContents from './aside';



export default async function StudentDashboard() {

    return (
        <div className='mx-auto'>
            <Suspense fallback={<CardSkeleton />}>
                <MainContents />
            </Suspense>
        </div>
    );
}
