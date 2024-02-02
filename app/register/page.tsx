// import MainForm from '@/components/register/mainForm';
// import { getUserId } from '@/lib/auth/utils';
// import { prisma } from '@/lib/db';
// import { kv } from '@vercel/kv';
// import { redirect } from 'next/navigation';
// import React from 'react';

// const Register = async () => {
//     const userId = getUserId();
//     console.log("this is the userid", userId);
//     // If there's no userId, render the MainForm component.
//     if (!userId) {
//         redirect("/sign-in");

//     }

//     const isRegistered = await kv.get(`isRegistered:${userId}`);

//     // If the user is not found or any user field is falsy, render the MainForm component.
//     if (!isRegistered) {
//         console.log('User not found or one or more user fields are falsy, rendering MainForm.');

//     }

//     // If all user fields are truthy, redirect to the user dashboard.
//     console.log('All user fields are truthy, redirecting to user dashboard.');
//     return redirect('/student-dashboard');
// };

// export default Register;


// pages/register.tsx

import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import dynamic from 'next/dynamic';
import MainForm from '@/components/register/NewMainForm';

// const MainForm = dynamic(() => import('@/components/register/mainForm'), { ssr: false });

export default async function Register() {
    const userId = getUserId();

    if (!userId) {
        return redirect('/sign-in');
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { paymentConfirmation: true },
    });

    if (!user || !user.name || !user.class || !user.officialPhoneOrWhatsappNumber || !user.fullAddress) {
        return <MainForm />;
    }

    if (!user.paymentConfirmation || !user.paymentConfirmation?.paymentUrl) {
        return redirect('/make-payment');
    }

    if (user.paymentConfirmation && !user.paymentConfirmation.paymentConfirmed) {
        return redirect('/waiting-for-confirmation');
    }

    return redirect('/student-dashboard');
}
