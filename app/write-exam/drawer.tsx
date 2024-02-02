"use client";
import React from 'react';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerClose,
} from "@/components/ui/drawer";
import SubjectBadges from './subjectSection';
import { Button } from '@/components/ui/button';

const SubjectBadgesDrawer = () => {
    return (
        <div className="md:hidden "> {/* Hide the drawer trigger on larger screens */}
            <Drawer>
                <DrawerTrigger asChild>
                    <Button className=" md:hidden  w-auto sm:w-auto px-4 py-2 text-white  focus:outline-none focus:ring-2 text-sm bg-rose-500 rounded-md ">See Progress</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Subjects</h2>
                        <SubjectBadges />
                        <DrawerClose asChild>
                            <button className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md">Close</button>
                        </DrawerClose>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default SubjectBadgesDrawer;
