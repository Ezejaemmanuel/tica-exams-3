import MainForm from '@/components/register/mainForm';
import { getUserId } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

const Register = async () => {
    const userId = getUserId();
    console.log("this is the userid", userId);
    // If there's no userId, render the MainForm component.
    if (!userId) {
        redirect("/sign-in");

    }

    // Fetch the user from the database.
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    console.log("this is the useer data ", user);
    // If the user is not found or any user field is falsy, render the MainForm component.
    if (!user || Object.values(user).some(field => !field)) {
        console.log('User not found or one or more user fields are falsy, rendering MainForm.');
        return <MainForm />;
    }

    // If all user fields are truthy, redirect to the user dashboard.
    console.log('All user fields are truthy, redirecting to user dashboard.');
    return redirect('/student-dashboard');
};

export default Register;
