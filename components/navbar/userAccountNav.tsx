// // UserAccountNav.js
// "use client";

// // import { Avatar, AvatarFallback } from './ui/avatar'
// import Image from 'next/image'
// // import { Icons } from './Icons'
// import { FaSchool } from 'react-icons/fa' // Import the school icon from react-icons
// import Link from 'next/link'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
// // import { useSession } from '@clerk/nextjs';

// import { Button } from '../ui/button';
// import { Icons } from './icons';
// import { Avatar, AvatarFallback } from '../ui/avatar';
// // import { Gem } from 'lucide-react'
// // import { signOut, useSession } from 'next-auth/react'

// const UserAccountNav = () => {
   

   
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger
//                 asChild
//                 className='overflow-visible'>
//                 <Button className='rounded-full h-8 w-8 aspect-square bg-blue-500 text-white'>
//                     <Avatar className='relative w-8 h-8'>
//                         {session?.user.image ? (
//                             <div className='relative aspect-square h-full w-full'>
//                                 <Image
//                                     fill
//                                     src={session.user.image}
//                                     alt='profile picture'
//                                     referrerPolicy='no-referrer'
//                                 />
//                             </div>
//                         ) : (
//                             <AvatarFallback>
//                                 <span className='sr-only'>{session?.user.name}</span>
//                                 <Icons.user className='h-4 w-4 text-white' />
//                             </AvatarFallback>
//                         )}
//                     </Avatar>
//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent className='bg-blue-500 text-white rounded-lg shadow-md transition-all ease-in-out duration-500' align='end'>
//                 <div className='flex items-center justify-start gap-2 p-2'>
//                     <div className='flex flex-col space-y-0.5 leading-none'>
//                         {session?.user.name && (
//                             <p className='font-medium text-sm text-white'>
//                                 {session?.user.name}
//                             </p>
//                         )}
//                         {session?.user.email && (
//                             <p className='w-[200px] truncate text-xs text-white'>
//                                 {session?.user.email}
//                             </p>
//                         )}
//                     </div>
//                 </div>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem asChild>
//                     <Link href='/dashboard'>Student Dashboard</Link>
//                 </DropdownMenuItem>

//                 <DropdownMenuItem asChild>
//                     {false ? (
//                         <Link href='/dashboard/billing'>
//                             Manage Subscription
//                         </Link>
//                     ) : (
//                         <Link href='/pricing'>
//                             Upgrade{' '}
//                             <Gem className='text-blue-600 h-4 w-4 ml-1.5' />
//                         </Link>
//                     )}
//                 </DropdownMenuItem>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className='cursor-pointer'>
//                     Log out
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }

// export default UserAccountNav
