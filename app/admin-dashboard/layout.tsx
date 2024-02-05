import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { BellIcon } from "lucide-react";
import { FaMailBulk } from "react-icons/fa";
import AdminDashboardFromSizeLimiter from "./size-boundry";
import { checkAuthPermission } from "@/lib/auth/utils";
import SideBarNavigation from "@/components/admin-dashboard/sidebar";
import SheetSide from "./sheetAside";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    await checkAuthPermission("only_admin_and_superadmin")
    return (
        <AdminDashboardFromSizeLimiter>
            <div className="flex flex-col mt-8 min-h-screen ">
                <header className="flex items-center justify-between p-4 border-b shadow-md ">
                    <div className="flex items-center space-x-4">
                        <SheetSide />
                        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Student Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        <FaMailBulk className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </div>
                </header>
                <div className="flex flex-1 bg-slate-200 dark:bg-black overflow-hidden">
                    <div className='bg-slate-200 mx-auto dark:bg-black'>
                        {children}
                    </div>
                </div>
            </div>
        </AdminDashboardFromSizeLimiter>
    );
}