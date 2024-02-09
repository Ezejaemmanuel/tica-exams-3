import React, { Suspense } from 'react'
import AdminDashboard from '@/components/admin-dashboard/admin-dashboard'
import TableSkeleton from '@/components/admin-dashboard/tableSkeleton'
import { checkAuthPermission } from '@/lib/auth/utils';

const AdminDashboardPage = async () => {
    await checkAuthPermission("only_admin_and_superadmin");
    // fallback = {< TableSkeleton rows = { 40} columns = { 10} />}
    return (
        <Suspense >
            <div className='overflow-x-auto'>
                <AdminDashboard />
            </div>
        </Suspense>
    )
}

export default AdminDashboardPage