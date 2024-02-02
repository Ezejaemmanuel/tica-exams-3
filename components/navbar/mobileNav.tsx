// MobileNav.js
"use client"

// import { FaSchool } from 'react-icons/fa' // Import the school icon from react-icons
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { signOut } from 'next-auth/react'

import { Button } from '../ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { FaSchool } from 'react-icons/fa'
import { SignInButton, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs'

const MobileNav = () => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleOpen = () => setOpen((prev) => !prev)

    const pathname = usePathname()

    useEffect(() => {
        if (isOpen) toggleOpen()
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            toggleOpen()
        }
    }

    return (
        <div className='sm:hidden'>
            <HamburgerMenuIcon
                onClick={toggleOpen}
                className='relative z-50 h-5 w-5 text-white hover:text-primary transition-all'
            />

            {isOpen ? (
                <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
                    <ul className='absolute bg-black text-white rounded-lg shadow-md grid w-full gap-3 px-10 pt-20 pb-8 transition-all'>
                        <SignedOut >
                            <>
                                <li className='my-3 h-px w-full bg-black' />
                                <li>
                                    <SignInButton afterSignInUrl='/sync-user' afterSignUpUrl='/sync-user' mode='modal' />
                                </li>
                                <li className='my-3 h-px w-full bg-black' />
                                <li>
                                    <Link
                                        onClick={() =>
                                            closeOnCurrent('/school-news')
                                        }
                                        className='flex items-center w-full font-semibold text-white hover:text-primary transition-all'
                                        href='/school-news'>
                                        <FaSchool size={30} color="white" /> News
                                    </Link>
                                </li>

                            </>
                        </SignedOut>
                        <SignedIn>
                            <>
                                <li>
                                    <Link
                                        onClick={() =>
                                            closeOnCurrent('/student-dashboard')
                                        }
                                        className='flex items-center w-full font-semibold text-white hover:text-primary transition-all'
                                        href='/student-dashboard'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className='my-3 h-px w-full bg-white' />
                                <li>
                                    <Link
                                        onClick={() =>
                                            closeOnCurrent('/school-news')
                                        }
                                        className='flex items-center w-full font-semibold text-white hover:text-primary transition-all'
                                        href='/school-news'>
                                        News
                                    </Link>
                                </li>


                            </>
                        </SignedIn>
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default MobileNav
