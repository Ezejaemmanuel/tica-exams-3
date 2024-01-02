import Link from 'next/link'
// import MaxWidthWrapper from './MaxWidthWrapper'
// import { buttonVariants } from './ui/button'
import { FaSchool } from 'react-icons/fa' // Import the school icon from react-icons
// import { ArrowRight } from 'lucide-react'
// import UserAccountNav from './UserAccountNav'
// import MobileNav from './MobileNav'
import { getUserAuth } from '@/lib/auth/utils'
import { ModeToggle } from '../mode-toogle'
import MobileNav from './mobileNav'
import MaxWidthWrapper from '../maxWidthWrapper';
import { buttonVariants } from '../ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = async () => {
    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-blue-900 bg-black text-white transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between'>
                    <Link href='/'
                        className='flex justify-evenly space-x-4  items-center z-40 font-semibold text-lg text-purple-500 transition-all'
                    >
                        <FaSchool size={30} /> {/* Use the school icon here */}
                        <span className='px-1'>TICA</span> {/* Replace 'School Name' with your actual school name */}
                    </Link>
                    <div>
                        <div className='sm:hidden flex items-center space-x-3'>
                            <UserButton afterSignOutUrl='/' />

                            <ModeToggle />

                            <MobileNav />
                        </div>

                        <div className='hidden items-center space-x-4 sm:flex'>
                            <SignedOut>
                                <>
                                    <Link
                                        href='/pricing'
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'sm',
                                        }) + ' text-white hover:text-primary transition-all'}>
                                        News
                                    </Link>
                                    <Link
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'sm',
                                        }) + ' text-white hover:text-primary transition-all'} href={'/register'}>
                                        Register
                                    </Link>
                                    <UserButton afterSignOutUrl='/' />
                                </>
                            </SignedOut>
                            <SignedIn>
                                <>
                                    <Link
                                        href='/student-dashboard'
                                        className={buttonVariants({
                                            variant: 'ghost',
                                            size: 'sm',
                                        }) + ' text-white hover:text-primary transition-all'}>
                                        Dashboard
                                    </Link>
                                    <UserButton afterSignOutUrl='/' />

                                    {/* <UserAccountNav /> */}
                                </>
                            </SignedIn>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar
