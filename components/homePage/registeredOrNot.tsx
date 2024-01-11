"use client";
import { useUserRegistered } from '@/lib/tenstack-hooks/checjkRegistered';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';

const RegisteredOrNot = () => {
    const { data: isUserRegistered, isLoading, isError } = useUserRegistered();


    return (
        <div className="mt-8 flex flex-wrap gap-4 text-center">
            <SignedOut>
                <Link href="/register" className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                    Register Now

                </Link>
            </SignedOut>
            <SignedIn>
                {isUserRegistered ? (
                    <Link href="/student-dashboard" className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto">
                        Dashboard

                    </Link>
                ) : (
                    <Link href="/register" className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                        Register Now

                    </Link>
                )}
            </SignedIn>
            <Link href="/learn-more" className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                Learn More

            </Link>
        </div>
    );
};

export default RegisteredOrNot;
