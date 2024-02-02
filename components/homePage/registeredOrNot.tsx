// components/RegisteredOrNot.server.tsx

import { getUserId } from '@/lib/auth/utils';
import { kv } from '@vercel/kv';
import { SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { RegistrationStatus } from '@/lib/api/redis/registeration-status';

export async function RegisteredOrNot() {
    const userId = getUserId();
    let linkHref = '/register'; // Default link
    let linkText = 'Register Now'; // Default text

    if (userId) {
        const registrationStatus = await kv.get<RegistrationStatus | null>(`tica:registrationStatus:${userId}`);

        if (registrationStatus === null) {
            // If registration status is null, use the default link and text
            linkHref = '/register';
            linkText = 'Register Now';
        } else {
            // Handle other known statuses
            switch (registrationStatus) {
                case RegistrationStatus.Registered:
                    linkHref = '/make-payment';
                    linkText = 'make registeration payment';
                    break;
                case RegistrationStatus.MadePayment:
                    linkHref = '/make-payment';
                    linkText = 'Make Payment';
                    break;
                case RegistrationStatus.PaymentNotConfirmed:
                    linkHref = '/waiting-for-confirmation';
                    linkText = 'Awaiting Confirmation';
                    break;
                case RegistrationStatus.PaymentConfirmed:
                    linkHref = '/student-dashboard';
                    linkText = 'Go to Dashboard';
                    break;
            }
        }
    }

    return (
        <div className="mt-8 flex flex-wrap gap-4 text-center">
            <SignedOut>
                <Link href="/sign-in" className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
                    Sign In
                </Link>
            </SignedOut>
            <SignedIn>
                <Link href={linkHref} className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto">
                    {linkText}
                </Link>
            </SignedIn>
            <Link href="/learn-more" className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                Learn More
            </Link>
        </div>
    );
}

export default RegisteredOrNot;
