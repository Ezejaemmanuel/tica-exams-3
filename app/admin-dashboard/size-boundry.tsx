// BeforePage.tsx
"use client";
import React from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import AlertDialogOnlyOnDesktop from '@/components/admin-dashboard/alart';

interface AdminDashboardFromSizeLimiterProps {
    children: React.ReactNode;
}

const AdminDashboardFromSizeLimiter: React.FC<AdminDashboardFromSizeLimiterProps> = ({ children }) => {
    const { width } = useWindowSize();

    const isMobile = width !== null && width < 650;

    if (isMobile) {
        return <AlertDialogOnlyOnDesktop />;
    }

    return <>{children}</>;
};

export default AdminDashboardFromSizeLimiter;
