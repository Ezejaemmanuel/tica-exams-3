/**
 * v0 by Vercel.
 */
"use client";
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX, SVGProps } from "react"

export default function AddNewExam({ additionalText }: { additionalText: string }) {
    const router = useRouter();
    const handleClick = () => {

        router.push("/admin-dashboard/setExamDetails")
    }
    return (
        <Card className="w-full max-w-sm bg-white dark:bg-black text-black dark:text-white shadow-lg rounded-lg border border-dashed border-gray-300">
            <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-sm font-bold ">Add New Exam</h2>
                    <p className="text-gray-600 dark:text-gray-400">{additionalText}</p>
                    <PlusIcon onClick={handleClick} className="h-20 w-20 " />


                </div>
            </CardContent>
        </Card>
    )
}

// function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
//             <path d="M5 12h14" />
//             <path d="M12 5v14" />
//         </svg>
//     )
// }
