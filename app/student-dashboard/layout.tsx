import type { Metadata } from 'next'
import SideBarNavigation from './sideBar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon, BellIcon } from '@radix-ui/react-icons'
import { FaMailBulk } from 'react-icons/fa'
import { Suspense } from 'react'
import { CardSkeleton } from './cardsSkeleton'


export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col mt-24 min-h-screen ">
            <header className="flex items-center justify-between p-4  border-b shadow-md ">
                <div className="flex items-center space-x-4">

                    <Sheet >
                        <SheetTrigger>
                            <button className="lg:hidden">
                                <HamburgerMenuIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side={"left"} >
                            <SideBarNavigation className={"mt-24"} />
                        </SheetContent>
                    </Sheet>

                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Student Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <Sett className="w-6 h-6 text-gray-500 dark:text-gray-400" /> */}
                    <BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <FaMailBulk className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
            </header>
            <div className="flex flex-1 bg-slate-200  dark:bg-black overflow-hidden">

                <aside className="hidden w-64 p-4 bg-white dark:bg-gray-950 border-r shadow-lg  lg:block">
                    <SideBarNavigation />
                </aside>
                <div className='bg-slate-200 mx-auto dark:bg-black'>
                    {children}
                </div>
            </div>

        </div>

    )
}