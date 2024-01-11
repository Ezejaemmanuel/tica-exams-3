/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EYpbsfCSZBd
 */
import Link from "next/link"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { JSX, SVGProps } from "react"
import { BellIcon, HomeIcon, FileIcon, CheckIcon, CalendarIcon, TextIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { FaBookOpen, FaMailBulk } from "react-icons/fa"


export default function StudentDashboardComponent() {
    return (
        <div className="dark flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 shadow-md">
                <div className="flex items-center space-x-4">
                    <button className="lg:hidden">
                        <HamburgerMenuIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Student Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <Sett className="w-6 h-6 text-gray-500 dark:text-gray-400" /> */}
                    <BellIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <FaMailBulk className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden w-64 p-4 border-r bg-white dark:bg-gray-800 lg:block shadow-lg">
                    <nav className="space-y-2">
                        <Link className="flex items-center space-x-2 text-rose-600 ring-2 ring-rose-600 rounded-md p-2" href="#">
                            <HomeIcon className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                        <Link
                            className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
                            href="#"
                        >
                            <FileIcon className="w-5 h-5" />
                            <span>Exams</span>
                        </Link>
                        <Link
                            className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
                            href="#"
                        >
                            <CheckIcon className="w-5 h-5" />
                            <span>Admission Status</span>
                        </Link>
                        <Link
                            className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
                            href="#"
                        >
                            <CalendarIcon className="w-5 h-5" />
                            <span>Exam Schedule</span>
                        </Link>
                        <Link
                            className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
                            href="#"
                        >
                            <FaBookOpen className="w-5 h-5" />
                            <span>Course Materials</span>
                        </Link>
                        <Link
                            className="flex items-center space-x-2 text-gray-500 hover:text-rose-600 hover:ring-2 hover:ring-rose-600 rounded-md p-2"
                            href="#"
                        >
                            <TextIcon className="w-5 h-5" />
                            <span>Student Forum</span>
                        </Link>
                    </nav>
                </aside>
                <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
                    <Card className="max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                        <CardHeader className="flex items-center space-x-4">
                            <img
                                alt="Avatar"
                                className="rounded-full"
                                height="100"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "100/100",
                                    objectFit: "cover",
                                }}
                                width="100"
                            />
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">John Doe</CardTitle>
                                <CardDescription className="text-gray-500 dark:text-gray-400">
                                    Admission Status: Accepted
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Location:</span> New York, USA
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span> 123 Main St, New York,
                                NY 10001
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">Admission Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span> Accepted
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Course:</span> Computer Science
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Start Date:</span> September 1, 2024
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-300">Exam Schedule</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Next Exam:</span> Calculus I
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Date:</span> February 15, 2024
                            </p>
                            <p>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">Time:</span> 10:00 AM
                            </p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}

// function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//             <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//         </svg>
//     )
// }


// function BookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//         </svg>
//     )
// }


// function CalendarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//             <line x1="16" x2="16" y1="2" y2="6" />
//             <line x1="8" x2="8" y1="2" y2="6" />
//             <line x1="3" x2="21" y1="10" y2="10" />
//         </svg>
//     )
// }


// function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <polyline points="20 6 9 17 4 12" />
//         </svg>
//     )
// }


// function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
//             <polyline points="14 2 14 8 20 8" />
//         </svg>
//     )
// }


// function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//             <polyline points="9 22 9 12 15 12 15 22" />
//         </svg>
//     )
// }


// function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <rect width="20" height="16" x="2" y="4" rx="2" />
//             <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//         </svg>
//     )
// }


// function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <line x1="4" x2="20" y1="12" y2="12" />
//             <line x1="4" x2="20" y1="6" y2="6" />
//             <line x1="4" x2="20" y1="18" y2="18" />
//         </svg>
//     )
// }


// function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//             <circle cx="12" cy="12" r="3" />
//         </svg>
//     )
// }


// function TextIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M17 6.1H3" />
//             <path d="M21 12.1H3" />
//             <path d="M15.1 18H3" />
//         </svg>
//     )
// }
