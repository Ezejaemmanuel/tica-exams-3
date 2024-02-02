import { getUserAuth } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { createUser } from './aside';
import AutoSignOut from './autoSignout';
const SyncUserComponent = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in")
    }
    const user = await prisma.userAuth.findUnique({
        where: { id: userId },
    });
    if (user) {
        redirect("/register");
    }
    const fromSyncingUser = await createUser();
    if (!fromSyncingUser) {
        <AutoSignOut />
    } else {
        redirect("/register");
    }



};

// Since React components cannot be asynchronous, this approach is conceptual
// and would need adaptation to fit into a real application structure.

export default SyncUserComponent;
