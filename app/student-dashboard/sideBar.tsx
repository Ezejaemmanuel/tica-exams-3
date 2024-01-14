"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, FileIcon, CheckIcon, CalendarIcon, TextIcon } from '@radix-ui/react-icons';
import { FaBookOpen } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const links = [
    { href: '/student-dashboard', icon: HomeIcon, text: 'Home' },
    { href: '/student-dashboard/exam-status', icon: FileIcon, text: 'Exams Status' },
    { href: '/student-dashboard/admission-status', icon: CheckIcon, text: 'Admission Status' },
    { href: '/student-dashboard/exam-schedule', icon: CalendarIcon, text: 'Exam Schedule' },
    { href: '/student-dashboard/course-materials', icon: FaBookOpen, text: 'Course Materials' },
    { href: '/student-dashboard/student-forum', icon: TextIcon, text: 'Student Forum' },
];

const SideBarNavigation = ({ className }: { className?: string }) => {
    const pathname = usePathname();
    const isRouteActive = (href: string) => {
        // Check if the current pathname is exactly the home route
        if (href === '/student-dashboard') {
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
                    <span
                        className="absolute top-0 right-0 px-2 py-1 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-xs text-white">3
                    </span>
                </Link>
            ))}
        </nav>
    );
};

export default SideBarNavigation;
