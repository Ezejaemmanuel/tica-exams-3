// pages/make-payment.tsx

import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import PaymentProofUploader from './aside';

export default async function MakePaymentsPage() {
    const userId = getUserId();

    if (!userId) {
        return redirect('/sign-in');
    }

    const paymentConfirmation = await prisma.paymentConfirmation.findUnique({
        where: { userId },
    });

    if (!paymentConfirmation) {
        redirect("/register")
    }
    if (!paymentConfirmation?.paymentUrl && paymentConfirmation?.examId) {
        return (
            <div className='flex justify-center items-center min-h-screen px-4'>
                <PaymentProofUploader examId_={paymentConfirmation?.examId} />
            </div>
        );
    }

    if (!paymentConfirmation?.paymentConfirmed) {
        redirect('/waiting-for-confirmation');
    }

    redirect('/student-dashboard');
}
