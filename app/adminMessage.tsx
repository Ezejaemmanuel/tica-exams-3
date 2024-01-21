
import Link from 'next/link';
import { Role } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { getUserAuth } from "@/lib/auth/utils";
import { badgeVariants } from '@/components/ui/badge';
export default async function AdminMessage({
    searchParams,
}: {
    searchParams?: {
        userId?: string;
    };
}) {
    // console.log("this is the searchParams insideing of the adminmessage", searchParams);
    const { session } = await getUserAuth();
    if (!session) {
        return null
    }





    if (session.user?.role === Role.SUPERADMIN || session.user?.role === Role.ADMIN) {
        // if (queryUserId && queryUserId !== session.user.id) {
        //     return (
        //         <div className="fixed top-32 right-0 bg-gray-900 text-yellow-500 rounded-full p-4">
        //             <p>You are an admin in a user&apos;s dashboard whose userid is Available</p>
        //         </div>
        //     );
        // } else {
        return (
            <div className="fixed top-32 right-0 bg-gray-900 text-xs z-50 text-yellow-500 rounded-full p-4">
                <p>You are an admin. <Link href="/admin-dashboard" className={badgeVariants({
                })}>dashboard</Link></p>
            </div>
        );
    }
    return null
}


