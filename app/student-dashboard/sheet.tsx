"use client";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import SideBarNavigation from './sideBar';

const SheetSide = () => {
    const pathname = usePathname(); // Use the usePathname hook to get the current pathname
    const [isOpen, setIsOpen] = useState(false); // Initialize the open state to false

    useEffect(() => {
        // This effect sets the Sheet's open state to false when the pathname changes
        setIsOpen(false);
    }, [pathname]); // Depend on pathname to re-run this effect

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <button className="lg:hidden" onClick={() => setIsOpen(true)}>
                    <HamburgerMenuIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SideBarNavigation className={"mt-24"} />
            </SheetContent>
        </Sheet>
    );
};

export default SheetSide;
