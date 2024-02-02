// "use client";
// import React from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { HomeIcon, FileIcon, CheckIcon, CalendarIcon, TextIcon } from '@radix-ui/react-icons';
// import { FaBookOpen,FaMoneyBill } from 'react-icons/fa';
// import { cn } from '@/lib/utils';

// const links = [
//     { href: '/admin-dashboard', icon: HomeIcon, text: 'Dashboard' },
//     { href: '/admin-dashboard/setExamDetails', icon: FileIcon, text: 'exam details' },
//     { href: '/admin-dashboard/exam-status', icon: CheckIcon, text: 'exam status' },
//     { href: '/admin-dashboard/setExams', icon: CalendarIcon, text: 'set exam questions' },
//     { href: '/admin-dashboard/manual-payment', icon: FaMoneyBill, text: 'Registeration Payments' },
//     { href: '/admin-dashboard/student-forum', icon: TextIcon, text: 'Student Forum' },
// ];

// const SideBarNavigation = ({ className }: { className?: string }) => {
//     const pathname = usePathname();
//     const isRouteActive = (href: string) => {
//         // Check if the current pathname is exactly the home route
//         if (href === '/admin-dashboard') {
//             return pathname === href;
//         }
//         // Check if the current pathname starts with the link and is not just a subpath of the home route
//         return pathname.startsWith(href) && (pathname === href || pathname.charAt(href.length) === '/');
//     };

//     return (
//         <nav className={cn("space-y-10 ", className)}>
//             {links.map((link, index) => (
//                 <Link key={index} href={link.href} className={`flex relative items-center space-x-2 rounded-md p-2 ${isRouteActive(link.href)
//                     ? 'text-rose-600 ring-2 ring-rose-600'
//                     : 'text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600'
//                     }`}
//                 >
//                     <link.icon className="w-5 h-5" />
//                     <span>{link.text}</span>
//                     <span
//                         className="absolute top-0 animate-pulse right-0 px-2 py-1 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-xs text-white">3
//                     </span>
//                 </Link>
//             ))}
//         </nav>
//     );
// };

// export default SideBarNavigation;

"use client";
// SideBarNavigation.tsx
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, FileIcon, CheckIcon, CalendarIcon, TextIcon } from '@radix-ui/react-icons';
import { FaMoneyBill } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { StatusType } from '@/lib/api/redis/genericStatus';
// Import the status type

const links = [
    { href: '/admin-dashboard', icon: HomeIcon, text: 'Dashboard' },
    { href: '/admin-dashboard/setExamDetails', icon: FileIcon, text: 'exam details' },
    { href: '/admin-dashboard/exam-status', icon: CheckIcon, text: 'exam status' },
    { href: '/admin-dashboard/setExams', icon: CalendarIcon, text: 'set exam questions' },
    { href: '/admin-dashboard/manual-payment', icon: FaMoneyBill, text: 'Registration Payments', statusKey: StatusType.NewPayments },
    { href: '/admin-dashboard/student-forum', icon: TextIcon, text: 'Student Forum' },
];

const SideBarNavigation = ({ className }: { className?: string }) => {
    const pathname = usePathname();
    const isRouteActive = (href: string) => {
        // Check if the current pathname is exactly the home route
        if (href === '/admin-dashboard') {
            return pathname === href;
        }
        // Check if the current pathname starts with the link and is not just a subpath of the home route
        return pathname.startsWith(href) && (pathname === href || pathname.charAt(href.length) === '/');
    };

    return (
        <nav className={cn("space-y-10 ", className)}>
            {links.map((link, index) => (
                <Link key={index} href={link.href} className={`flex relative items-center space-x-2 rounded-md p-2 ${isRouteActive(link.href)
                    ? 'text-rose-600 ring-2 ring-rose-600'
                    : 'text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600'
                    }`}
                >
                    <link.icon className="w-5 h-5" />
                    <span>{link.text}</span>
                    {/* <span
                            className="absolute top-0 animate-pulse right-0 px-2 py-1 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-xs text-white"
                        >

                        </span> */}


                </Link>
            ))}
        </nav>
    );
};

export default SideBarNavigation;
