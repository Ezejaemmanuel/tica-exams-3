// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/EYpbsfCSZBd
//  */
// import Link from "next/link"
// import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
// import { JSX, SVGProps } from "react"
// import { BellIcon, HomeIcon, FileIcon, CheckIcon, CalendarIcon, TextIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
// import { FaBookOpen, FaMailBulk } from "react-icons/fa"
// import MainContents from "./mainContents"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import SideBarNavigation from "./sideBar"


// export default function StudentDashboardComponent() {
//     return (
//         <div className="dark flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
//             <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 shadow-md">
//                 <div className="flex items-center space-x-4">

//                     <Sheet>
//                         <SheetTrigger>
//                             <button className="lg:hidden">
//                                 <HamburgerMenuIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                             </button>
//                         </SheetTrigger>
//                         <SheetContent>
                            
//                         </SheetContent>
//                     </Sheet>

//                     <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Student Dashboard</h1>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     {/* <Sett className="w-6 h-6 text-gray-500 dark:text-gray-400" /> */}
//                     <BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                     <FaMailBulk className="w-6 h-6 text-gray-500 dark:text-gray-400" />
//                 </div>
//             </header>
//             <div className="flex flex-1 overflow-hidden">

//                 <aside className="hidden w-64 p-4 border-r bg-white dark:bg-gray-800 lg:block shadow-lg">
//                     {/* <nav className="space-y-2">
//                         <Link className="flex items-center space-x-2 text-rose-600 ring-2 ring-rose-600 rounded-md p-2" href="#">
//                             <HomeIcon className="w-5 h-5" />
//                             <span>Home</span>
//                         </Link>
//                         <Link
//                             className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
//                             href="#"
//                         >
//                             <FileIcon className="w-5 h-5" />
//                             <span>Exams</span>
//                         </Link>
//                         <Link
//                             className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
//                             href="#"
//                         >
//                             <CheckIcon className="w-5 h-5" />
//                             <span>Admission Status</span>
//                         </Link>
//                         <Link
//                             className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
//                             href="#"
//                         >
//                             <CalendarIcon className="w-5 h-5" />
//                             <span>Exam Schedule</span>
//                         </Link>
//                         <Link
//                             className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
//                             href="#"
//                         >
//                             <FaBookOpen className="w-5 h-5" />
//                             <span>Course Materials</span>
//                         </Link>
//                         <Link
//                             className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
//                             href="#"
//                         >
//                             <TextIcon className="w-5 h-5" />
//                             <span>Student Forum</span>
//                         </Link>
//                     </nav> */}
//                     <SideBarNavigation/>
//                 </aside>
//             </div>
//         </div>
//     )
// }
