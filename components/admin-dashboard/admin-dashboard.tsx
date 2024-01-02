/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DdPPXuknFU7
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SVGProps } from "react"


export default function Component() {
    return (
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800">
            <nav className="hidden md:flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-900">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Resend</h2>
                <div className="mt-8">
                    <ul className="space-y-2">
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <HomeIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Overview</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 bg-gray-100 rounded-lg dark:text-white dark:bg-gray-700"
                                href="#"
                            >
                                <MailboxIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Emails</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <GlobeIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Domains</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <FileTextIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Logs</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <KeyIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">API Keys</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <WebhookIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Webhooks</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <CogIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                <span className="ml-3">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <main className="flex-1">
                <div className="px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Emails</h1>
                        <div className="flex items-center mt-4 md:mt-0">
                            <Button className="mr-4" variant="ghost">
                                Feedback
                            </Button>
                            <Button variant="ghost">Help</Button>
                            <Button className="ml-4" variant="ghost">
                                Docs
                            </Button>
                            <Button className="ml-4" variant="ghost">
                                API
                            </Button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                            <Input className="w-full md:w-1/3" placeholder="Search..." />
                            <div className="mt-4 md:mt-0"><Select >
                                <SelectTrigger id="timeframe">
                                    <SelectValue placeholder="Last 7 days" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                                    <SelectItem value="last-year">Last year</SelectItem>
                                </SelectContent>
                            </Select></div>
                            <div className="mt-4 md:mt-0"><Select >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Select >
                                    <SelectTrigger id="apikey">
                                        <SelectValue placeholder="All API Keys" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">All API Keys</SelectItem>
                                        <SelectItem value="key-1">API Key 1</SelectItem>
                                        <SelectItem value="key-2">API Key 2</SelectItem>
                                    </SelectContent>
                                </Select></div>
                        </div>
                        <div className="mt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>To</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Sent</TableHead>
                                        <TableHead />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>lindajatique@gmail.com</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Delivered</Badge>
                                        </TableCell>
                                        <TableCell>Hello world!</TableCell>
                                        <TableCell>less than a minute ago</TableCell>
                                        <TableCell>
                                            <CircleEllipsisIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function CircleEllipsisIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M17 12h.01" />
            <path d="M12 12h.01" />
            <path d="M7 12h.01" />
        </svg>
    )
}


function CogIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
            <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M12 2v2" />
            <path d="M12 22v-2" />
            <path d="m17 20.66-1-1.73" />
            <path d="M11 10.27 7 3.34" />
            <path d="m20.66 17-1.73-1" />
            <path d="m3.34 7 1.73 1" />
            <path d="M14 12h8" />
            <path d="M2 12h2" />
            <path d="m20.66 7-1.73 1" />
            <path d="m3.34 17 1.73-1" />
            <path d="m17 3.34-1 1.73" />
            <path d="m11 13.73-4 6.93" />
        </svg>
    )
}


function FileTextIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
    )
}


function GlobeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    )
}


function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function KeyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
        </svg>
    )
}


function MailboxIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
            <polyline points="15,9 18,9 18,11" />
            <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0" />
            <line x1="6" x2="7" y1="10" y2="10" />
        </svg>
    )
}


function WebhookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
            <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
            <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
        </svg>
    )
}
