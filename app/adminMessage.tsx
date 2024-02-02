import Link from 'next/link';
import { Role } from "@prisma/client";
import { getUserAuth } from "@/lib/auth/utils";
import { badgeVariants } from '@/components/ui/badge';

export default async function AdminMessage({
    searchParams,
}: {
    searchParams?: {
        userId?: string;
    };
}) {
    let session;
    try {
        const auth = await getUserAuth();
        session = auth.session;
    } catch (error) {
        console.error('Failed to get user auth:', error);
        return null; // Do not render the component if there's an error
    }

    if (!session || !session.user.role) {
        return null;
    }

    if (session.user?.role === Role.SUPERADMIN || session.user?.role === Role.ADMIN) {
        return (
            <div className="fixed top-32 right-0 bg-gray-900 text-xs z-50 text-yellow-500 rounded-full p-4">
                <p>You are an admin. <Link href="/admin-dashboard" className={badgeVariants({})}>dashboard</Link></p>
            </div>
        );
    }
    return null;
}
